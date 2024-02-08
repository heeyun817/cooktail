package io.cooktail.backend.cocktail.domain;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "cocktail")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Cocktail {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "cocktail_id", updatable = false)
  private long id;
  // 제목
  @Column(name = "title", nullable = false)
  private String title;
  // 본문
  @Column(name = "content", nullable = false, columnDefinition = "TEXT")
  private String content;
  //이미지
  @OneToMany(mappedBy = "cocktail", cascade = CascadeType.REMOVE,fetch = FetchType.LAZY)
  private final List<CocktailImage> cocktailImages = new ArrayList<>();
  // 도수
  @Column(name = "abv")
  private double abv;
  // 작성자
  //  @JoinColumn(name = "member_id")
  //  @ManyToOne(fetch = FetchType.EAGER)
  private long member;
  // 작성일
  @CreationTimestamp
  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt;
  // 수정일
  @UpdateTimestamp
  @Column(name = "updated_at", nullable = false)
  private LocalDateTime updatedAt;
  // 조회수
  @Column(name = "views",columnDefinition = "integer default 0", nullable = false)
  private int views;
  // 좋아요수
  @Column(name = "likes",columnDefinition = "integer default 0", nullable = false)
  private int likes;

  @Builder
  public Cocktail(String title, String content, double abv, long member) {
    this.title = title;
    this.content = content;
    this.abv = abv;
    this.member = member;
  }

}
