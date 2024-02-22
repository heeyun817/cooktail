package io.cooktail.backend.domain.cocktail.dto;

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
  public CocktailRq(String title, String content, double abv) {
    this.title = title;
    this.content = content;
    this.abv = abv;
  }
}
