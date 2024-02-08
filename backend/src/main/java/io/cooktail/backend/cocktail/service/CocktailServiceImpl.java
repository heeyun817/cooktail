package io.cooktail.backend.cocktail.service;

import io.cooktail.backend.cocktail.domain.Cocktail;
import io.cooktail.backend.cocktail.domain.CocktailImage;
import io.cooktail.backend.cocktail.dto.CocktailRq;
import io.cooktail.backend.cocktail.repository.CocktailImageRepository;
import io.cooktail.backend.cocktail.repository.CocktailRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CocktailServiceImpl implements CocktailService{

  private final CocktailRepository cocktailRepository;
  private final CocktailImageRepository cocktailImageRepository;

  @Override
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
}
