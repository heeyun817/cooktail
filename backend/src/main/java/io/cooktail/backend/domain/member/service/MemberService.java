package io.cooktail.backend.domain.member.service;

import io.cooktail.backend.domain.member.dto.JoinRq;

public interface MemberService {

  // 회원가입
  void create(JoinRq joinRq);
}
