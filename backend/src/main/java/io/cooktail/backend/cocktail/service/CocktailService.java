package io.cooktail.backend.cocktail.service;

import io.cooktail.backend.cocktail.domain.Cocktail;
import io.cooktail.backend.cocktail.dto.CocktailRq;
import io.cooktail.backend.cocktail.dto.CocktailRs;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CocktailService {

  // 전체 글 조회
  Page<CocktailRs> findAll(Pageable pageable);
  // 게시글 id별 조회
  CocktailRs findById(Long id);
  // 조회수 증가
  int updateView(Long id);
  // 글 작성
  Long createCocktail(long member, CocktailRq cocktailRq, List<String> imageUrls);
  // 검색
  Page<CocktailRs> search(Pageable pageable, String keyword);
}
