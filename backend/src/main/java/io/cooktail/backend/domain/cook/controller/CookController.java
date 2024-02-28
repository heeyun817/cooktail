package io.cooktail.backend.domain.cook.controller;
import io.cooktail.backend.domain.cook.dto.CookRq;
import io.cooktail.backend.domain.cook.dto.CookRs;
import io.cooktail.backend.domain.cook.service.CookService;
import io.cooktail.backend.domain.cocktail.service.S3Uploader;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

@RestController
@RequiredArgsConstructor
public class CookController {

    private final CookService service;
    private final S3Uploader s3Uploader;
    // 모든 글 조회, 검색
    @GetMapping("/cooks")
    public Page<CookRs> getAllCook(
            @PageableDefault(page = 0, size = 8, sort = "createdAt", direction = Direction.DESC) Pageable pageable,
            @RequestParam(required = false) String keyword) {

        if (keyword == null) {
            return service.findAll(pageable);
        } else {
            return service.search(pageable, keyword);
        }
    }

    // id로 조회
    @GetMapping("/cooks/{id}")
    public CookRs getCookById(@PathVariable Long id) {
        service.updateView(id);
        return service.findById(id);
    }

    // 작성
    @PostMapping("/cooks")
    public Long createCook(
            @RequestParam long member,
            @ModelAttribute CookRq cookRq,
            @RequestPart(value = "images") List<MultipartFile> images) throws IOException {
        String dirName = "cook";
        List<String> imageUrls = s3Uploader.uploadFiles(dirName, images);
        return service.createCook(member, cookRq, imageUrls);
    }

    // 수정
    @PutMapping("/cooks/{id}")
    public Long updateCook(
            @PathVariable Long id,
            @ModelAttribute CookRq cookRq,
            @RequestPart(value = "images") List<MultipartFile> images) throws IOException {
        return service.updateCook(id, cookRq, images);
    }

    // 삭제
    @DeleteMapping("/cooks/{id}")
    public String deleteCook(@PathVariable Long id) {
        service.deleteCook(id);
        return "성공적으로 삭제되었습니다";
    }


    // 좋아요
    @PostMapping("/cooks/like/{id}")
    public Long addLike(
            @PathVariable Long id,
            @AuthenticationPrincipal String memberId) {
        service.addLike(id, Long.valueOf(memberId));
        return id;
    }

    // 좋아요 해제
    @DeleteMapping("/cooks/like/{id}")
    public Long deleteLike(
            @PathVariable Long id,
            @AuthenticationPrincipal String memberId){
        service.deleteLike(id, Long.valueOf(memberId));
        return id;
    }


}
