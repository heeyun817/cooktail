package io.cooktail.backend.domain.member.service;

import io.cooktail.backend.domain.member.domain.Member;
import io.cooktail.backend.domain.member.dto.JoinRq;
import io.cooktail.backend.domain.member.dto.LoginRq;
import io.cooktail.backend.domain.member.dto.MyInfoRs;
import org.springframework.security.crypto.password.PasswordEncoder;

public interface MemberService {

  // 회원가입
  void create(JoinRq joinRq);

  // 로그인 확인
  Member login(String email, String password);

  // 내 정보 조회
  MyInfoRs getMyInfo(long memberId);
}
