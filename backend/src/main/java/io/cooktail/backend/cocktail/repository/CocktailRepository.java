package io.cooktail.backend.cocktail.repository;

import io.cooktail.backend.cocktail.domain.Cocktail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CocktailRepository extends JpaRepository<Cocktail, Long> {

}
