package io.cooktail.backend.member.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Past;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "member")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "member_id")
  private Long id;

  @Column(name = "email", nullable = false, unique = true, length = 50)
  private String email;

  @Column(name = "password", nullable = false, length = 50)
  private String password;

  @Column(name = "name", nullable = false, length = 50)
  private String name;

  @Column(name = "image", nullable=false)
  private String image;

  @Past
  @Column(name = "birth_date", nullable=false)
  private LocalDateTime birthDate;

  @Builder
  public Member(String email, String password, String name, String image, LocalDateTime birthDate) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.image = image;
    this.birthDate = birthDate;
  }

}
