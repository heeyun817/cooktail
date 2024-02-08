package io.cooktail.backend.cocktail.dto;

import io.cooktail.backend.cocktail.domain.CocktailImage;
import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class CocktailRq {

  private String title;
  private String content;
  private double abv;

  @Builder
  public CocktailRq(String title, String content, double abv, long member) {
    this.title = title;
    this.content = content;
    this.abv = abv;
  }
}
