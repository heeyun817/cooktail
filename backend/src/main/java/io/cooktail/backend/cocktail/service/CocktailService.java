package io.cooktail.backend.cocktail.service;

import io.cooktail.backend.cocktail.domain.Cocktail;
import io.cooktail.backend.cocktail.dto.CocktailRq;
import io.cooktail.backend.cocktail.dto.CocktailRs;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CocktailService {

  Page<CocktailRs> findAll(Pageable pageable);
  Cocktail createCocktail(long member, CocktailRq cocktailRq, List<String> imageUrls);
}
