package io.cooktail.backend.domain.cook.service;

import io.cooktail.backend.domain.cook.dto.CookRq;
import io.cooktail.backend.domain.cook.dto.CookRs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface CookService {

    // 전체 글 조회
    Page<CookRs> findAll(Pageable pageable);

    // 게시글 id별 조회
    CookRs findById(Long id);

    // 조회수 증가
    int updateView(Long id);

    // 글 작성
    Long createCook(long member, CookRq cookRq, List<String> imageUrls);

    // 글 수정
    Long updateCook(Long id, CookRq cookRq, List<MultipartFile> newImages);

    // 삭제
    void deleteCook(Long id);

    // 검색
    Page<CookRs> search(Pageable pageable, String keyword);
}
