package io.cooktail.backend.cocktail.repository;

import io.cooktail.backend.cocktail.domain.CocktailImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CocktailImageRepository extends JpaRepository<CocktailImage, Long> {

}
