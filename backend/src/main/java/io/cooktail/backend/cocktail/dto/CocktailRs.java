package io.cooktail.backend.cocktail.dto;

import io.cooktail.backend.cocktail.domain.Cocktail;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CocktailRs {
  private long id;
  private String title;
  private String content;
  private double abv;
  private long member;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
  private int views;
  private int likes;
  private List<String> images;

  @Builder
  public CocktailRs(Cocktail cocktail, List<String> images) {
    this.id = cocktail.getId();
    this.title = cocktail.getTitle();
    this.content = cocktail.getContent();
    this.abv = cocktail.getAbv();
    this.member = cocktail.getMember();
    this.createdAt = cocktail.getCreatedAt();
    this.updatedAt = cocktail.getUpdatedAt();
    this.views = cocktail.getViews();
    this.likes = cocktail.getLikes();
    this.images = images;
  }
}
