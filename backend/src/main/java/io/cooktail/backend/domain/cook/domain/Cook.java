package io.cooktail.backend.domain.cook.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cook")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Cook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cook_id", updatable = false)
    private long id;
    // 제목
    @Column(name = "title", nullable = false)
    private String title;
    // 본문
    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;
}
