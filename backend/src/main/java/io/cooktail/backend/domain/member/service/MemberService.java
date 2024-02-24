package io.cooktail.backend.domain.member.service;

import io.cooktail.backend.domain.member.domain.Member;
import io.cooktail.backend.domain.member.dto.JoinRq;
import io.cooktail.backend.domain.member.dto.LoginRq;
import org.springframework.security.crypto.password.PasswordEncoder;

public interface MemberService {

  // 회원가입
  void create(JoinRq joinRq);

  // 로그인 확인
  Member login(String email, String password);
}
