package io.cooktail.backend.domain.member.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import java.time.LocalDate;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class JoinRq {

  @NotBlank(message = "이메일이 비어있습니다.")
  @Email(message = "올바른 이메일 주소를 입력해주세요.")
  private String email;

  @NotBlank(message = "비밀번호가 비어있습니다.")
  private String password;

  @NotBlank(message = "이름이 비어있습니다.")
  private String name;

  @Past(message = "생년월일은 과거 날짜만 허용됩니다.")
  @NotBlank(message = "생년월일이 비어있습니다.")
  private LocalDate birthDate;

  @Builder
  public JoinRq(String email, String password, String name, LocalDate birthDate) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.birthDate = birthDate;
  }
}
