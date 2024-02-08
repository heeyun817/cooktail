package io.cooktail.backend.cocktail.service;

import io.cooktail.backend.cocktail.domain.Cocktail;
import io.cooktail.backend.cocktail.dto.CocktailRq;
import java.util.List;

public interface CocktailService {

  Cocktail createCocktail(long member, CocktailRq cocktailRq, List<String> imageUrls);
}
