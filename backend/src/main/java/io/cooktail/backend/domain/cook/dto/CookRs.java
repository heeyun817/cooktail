package io.cooktail.backend.domain.cook.dto;

import io.cooktail.backend.domain.cook.domain.Cook;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CookRs {
    private long id;
    private String title;
    private String recipe;
    private String difficulty;
    private long member;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private int views;
    private int likes;
    private List<String> images;

    @Builder
    public CookRs(Cook cook, List<String> images) {
        this.id = cook.getId();
        this.title = cook.getTitle();
        this.recipe = cook.getRecipe();
        this.difficulty = cook.getDifficulty();
        this.member = cook.getMember();
        this.createdAt = cook.getCreatedAt();
        this.updatedAt = cook.getUpdatedAt();
        this.views = cook.getViews();
        this.likes = cook.getLikes();
        this.images = images;
    }
}
