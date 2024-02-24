package io.cooktail.backend.domain.cook.service;

import io.cooktail.backend.domain.cook.domain.Cook;
import io.cooktail.backend.domain.cook.domain.CookImage;
import io.cooktail.backend.domain.cook.dto.CookRq;
import io.cooktail.backend.domain.cook.dto.CookRs;
import io.cooktail.backend.domain.cook.repository.CookImageRepository;
import io.cooktail.backend.domain.cook.repository.CookRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import io.cooktail.backend.domain.cocktail.service.S3Uploader;
@Service
@RequiredArgsConstructor
public class CookServiceImpl implements CookService {

    private final CookRepository cookRepository;
    private final CookImageRepository cookImageRepository;
    private final S3Uploader s3Uploader;

    @Override
    public Page<CookRs> findAll(Pageable pageable) {
        Page<Cook> cookPage = cookRepository.findAll(pageable);

        Page<CookRs> cookRs = cookPage.map(cook -> CookRs.builder()
                .cook(cook)
                .images(cook.getCookImages().stream()
                        .map(CookImage::getImageUrl)
                        .collect(Collectors.toList()))
                .build());

        return cookRs;
    }

    @Override
    public CookRs findById(Long id) {
        Cook cook = cookRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("해당 ID에 매칭되는 글을 찾을 수 없습니다: " + id));

        CookRs cookRs = CookRs.builder()
                .cook(cook)
                .images(cook.getCookImages().stream()
                        .map(CookImage::getImageUrl)
                        .collect(Collectors.toList()))
                .build();

        return cookRs;
    }

    @Override
    @Transactional
    public int updateView(Long id) {
        return cookRepository.updateView(id);
    }

    @Override
    @Transactional
    public Long createCook(long member, CookRq cookRq, List<String> imageUrls) {
        Cook cook = cookRepository.save(Cook.builder()
                .title(cookRq.getTitle())
                .recipe(cookRq.getRecipe())
                .difficulty(cookRq.getDifficulty())
                .member(member)
                .build());

        for (String imageUrl : imageUrls) {
            cookImageRepository.save(CookImage.builder()
                    .imageUrl(imageUrl)
                    .cook(cook)
                    .build());
        }
        return cook.getId();
    }

    @Override
    @Transactional
    public Long updateCook(Long id, CookRq cookRq, List<MultipartFile> newImages) {
        Cook cook = cookRepository.findById(id).orElseThrow(() -> new NoSuchElementException("해당 ID에 매칭되는 글을 찾을 수 없습니다: " + id));

        cook.update(cookRq.getTitle(), cookRq.getRecipe(), cookRq.getDifficulty());
        cookRepository.save(cook);

        // 기존 이미지 삭제
        List<CookImage> existingImages = cook.getCookImages();
        for (CookImage image : existingImages) {
            s3Uploader.deleteFile(image.getImageUrl());
            cookImageRepository.delete(image);
        }

        // 새 이미지 업로드 및 연결
        String dirName = "cook";
        List<String> newImageUrls = s3Uploader.uploadFiles(dirName, newImages);
        for (String imageUrl : newImageUrls) {
            cookImageRepository.save(CookImage.builder()
                    .imageUrl(imageUrl)
                    .cook(cook)
                    .build());
        }
        return id;
    }

    @Override
    @Transactional
    public void deleteCook(Long id) {
        Cook cook = cookRepository.findById(id).orElseThrow(() -> new NoSuchElementException("해당 ID에 매칭되는 글을 찾을 수 없습니다: " + id));

        // 연결된 이미지 삭제
        List<CookImage> cookImages = cook.getCookImages();
        for (CookImage image : cookImages) {
            s3Uploader.deleteFile(image.getImageUrl());
            cookImageRepository.delete(image);
        }

        // 글 삭제
        cookRepository.delete(cook);
    }

    @Override
    public Page<CookRs> search(Pageable pageable, String keyword) {
        Page<Cook> cookPage = cookRepository.findByTitleContaining(keyword, pageable);

        Page<CookRs> cookRs = cookPage.map(cook -> CookRs.builder()
                .cook(cook)
                .images(cook.getCookImages().stream()
                        .map(CookImage::getImageUrl)
                        .collect(Collectors.toList()))
                .build());

        return cookRs;
    }
}
