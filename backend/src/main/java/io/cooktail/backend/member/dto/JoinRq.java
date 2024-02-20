package io.cooktail.backend.member.dto;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class JoinRq {

  private String email;
  private String password;
  private String name;
  private LocalDateTime birthDate;

  @Builder
  public JoinRq(String email, String password, String name, LocalDateTime birthDate) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.birthDate = birthDate;
  }
}
