package io.cooktail.backend.cocktail.service;

import io.cooktail.backend.cocktail.repository.CocktailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CocktailServiceImpl implements CocktailService{

  private final CocktailRepository cocktailRepository;
}
