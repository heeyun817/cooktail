package io.cooktail.backend.domain.cocktail.service;

import io.cooktail.backend.domain.cocktail.domain.Cocktail;
import io.cooktail.backend.domain.cocktail.domain.CocktailImage;
import io.cooktail.backend.domain.cocktail.dto.CocktailRq;
import io.cooktail.backend.domain.cocktail.dto.CocktailRs;
import io.cooktail.backend.domain.cocktail.repository.CocktailImageRepository;
import io.cooktail.backend.domain.cocktail.repository.CocktailRepository;
import io.cooktail.backend.domain.member.domain.Member;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class CocktailServiceImpl implements CocktailService{

  private final CocktailRepository cocktailRepository;
  private final CocktailImageRepository cocktailImageRepository;
  private final S3Uploader s3Uploader;

  // 전체 글 조회
  @Override
  public Page<CocktailRs> findAll(Pageable pageable) {
    Page<Cocktail> cocktailPage = cocktailRepository.findAll(pageable);

    Page<CocktailRs> cocktailRs = cocktailPage.map(cocktail -> CocktailRs.builder()
        .cocktail(cocktail)
        .images(cocktail.getCocktailImages().stream()
            .map(CocktailImage::getImageUrl)
            .collect(Collectors.toList()))
        .build());

    return cocktailRs;
  }

  // 게시글 id별 조회
  @Override
  public CocktailRs findById(Long id) {
    Cocktail cocktail = cocktailRepository.findById(id)
        .orElseThrow(() -> new NoSuchElementException("해당 ID에 매칭되는 글을 찾을 수 없습니다: " + id));

    CocktailRs cocktailRs = CocktailRs.builder()
        .cocktail(cocktail)
        .images(cocktail.getCocktailImages().stream()
            .map(CocktailImage::getImageUrl)
            .collect(Collectors.toList()))
        .build();

    return cocktailRs;
  }

  // 조회수 증가
  @Override
  @Transactional
  public int updateView(Long id){
    return cocktailRepository.updateView(id);
  }

  // 글 작성
  @Override
  @Transactional
  public Long createCocktail(Member member, CocktailRq cocktailRq, List<String> imageUrls) {
    Cocktail cocktail = cocktailRepository.save(Cocktail.builder()
        .title(cocktailRq.getTitle())
        .content(cocktailRq.getContent())
        .abv(cocktailRq.getAbv())
        .member(member)
        .build());

    for (String imageUrl : imageUrls) {
      cocktailImageRepository.save(CocktailImage.builder()
          .imageUrl(imageUrl)
          .cocktail(cocktail)
          .build());
    }
    return cocktail.getId();
  }

  // 글 수정
  @Override
  @Transactional
  public Long updateCocktail(Long id, CocktailRq cocktailRq, List<MultipartFile> newImages) {
    Cocktail cocktail = cocktailRepository.findById(id).orElseThrow(() -> new NoSuchElementException("해당 ID에 매칭되는 글을 찾을 수 없습니다: " + id));

    cocktail.update(cocktailRq.getTitle(), cocktailRq.getContent(), cocktailRq.getAbv());
    cocktailRepository.save(cocktail);

    // 기존 이미지 삭제
    List<CocktailImage> existingImages = cocktail.getCocktailImages();
    for (CocktailImage image : existingImages) {
      s3Uploader.deleteFile(image.getImageUrl());
      cocktailImageRepository.delete(image);
    }

    // 새 이미지 업로드 및 연결
    String dirName = "cocktail";
    List<String> newImageUrls = s3Uploader.uploadFiles(dirName, newImages);
    for (String imageUrl : newImageUrls) {
      cocktailImageRepository.save(CocktailImage.builder()
          .imageUrl(imageUrl)
          .cocktail(cocktail)
          .build());
    }
    return id;
  }

  // 삭제
  @Transactional
  @Override
  public void deleteCocktail(Long id) {
    Cocktail cocktail = cocktailRepository.findById(id).orElseThrow(() -> new NoSuchElementException("해당 ID에 매칭되는 글을 찾을 수 없습니다: " + id));

    // 연결된 이미지 삭제
    List<CocktailImage> cocktailImages = cocktail.getCocktailImages();
    for (CocktailImage image : cocktailImages) {
      s3Uploader.deleteFile(image.getImageUrl());
      cocktailImageRepository.delete(image);
    }

    // 글 삭제
    cocktailRepository.delete(cocktail);
  }

  // 검색
  @Override
  public Page<CocktailRs> search(Pageable pageable, String keyword) {
    Page<Cocktail> cocktailPage = cocktailRepository.findByTitleContaining(keyword,pageable);

    Page<CocktailRs> cocktailRs = cocktailPage.map(cocktail -> CocktailRs.builder()
        .cocktail(cocktail)
        .images(cocktail.getCocktailImages().stream()
            .map(CocktailImage::getImageUrl)
            .collect(Collectors.toList()))
        .build());

    return cocktailRs;
  }
}
