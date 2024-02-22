package io.cooktail.backend.domain.member.controller;

import io.cooktail.backend.domain.member.dto.JoinRq;
import io.cooktail.backend.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MemberController {

  private final MemberService memberService;

  @PostMapping("/members")
  public ResponseEntity<?> create(@RequestBody JoinRq joinRq) {
    try {
      memberService.create(joinRq);
      return ResponseEntity.ok("회원가입 성공");
    } catch (Exception e) {
      return ResponseEntity.status(500).body("회원가입 실패: " + e.getMessage());
    }
  }

}
