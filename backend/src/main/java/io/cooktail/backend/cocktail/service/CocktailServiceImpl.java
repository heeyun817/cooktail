package io.cooktail.backend.cocktail.service;

import io.cooktail.backend.cocktail.domain.Cocktail;
import io.cooktail.backend.cocktail.domain.CocktailImage;
import io.cooktail.backend.cocktail.dto.CocktailRq;
import io.cooktail.backend.cocktail.dto.CocktailRs;
import io.cooktail.backend.cocktail.repository.CocktailImageRepository;
import io.cooktail.backend.cocktail.repository.CocktailRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CocktailServiceImpl implements CocktailService{

  private final CocktailRepository cocktailRepository;
  private final CocktailImageRepository cocktailImageRepository;

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
  public Cocktail createCocktail(long member, CocktailRq cocktailRq, List<String> imageUrls) {
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
    return cocktail;
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
