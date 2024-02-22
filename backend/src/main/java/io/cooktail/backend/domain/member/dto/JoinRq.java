package io.cooktail.backend.domain.member.dto;

import java.time.LocalDate;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class JoinRq {

  private String email;
  private String password;
  private String name;
  private LocalDate birthDate;

  @Builder
  public JoinRq(String email, String password, String name, LocalDate birthDate) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.birthDate = birthDate;
  }
}
