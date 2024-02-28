package io.cooktail.backend.domain.member.controller;

import io.cooktail.backend.domain.member.domain.Member;
import io.cooktail.backend.domain.member.dto.JoinRq;
import io.cooktail.backend.domain.member.dto.LoginRq;
import io.cooktail.backend.domain.member.dto.LoginRs;
import io.cooktail.backend.domain.member.dto.MyInfoRs;
import io.cooktail.backend.domain.member.service.MemberService;
import io.cooktail.backend.global.security.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MemberController {

  private final MemberService memberService;
  private final TokenProvider tokenProvider;

  @PostMapping("/members")
  public ResponseEntity<?> create(@RequestBody JoinRq joinRq) {
    try {
      memberService.create(joinRq);
      return ResponseEntity.ok("회원가입 성공");
    } catch (Exception e) {
      return ResponseEntity.status(500).body("회원가입 실패: " + e.getMessage());
    }
  }

  //로그인
  @PostMapping("/members/login")
  public ResponseEntity<?> login(@RequestBody LoginRq loginRq) {
    Member member = memberService.login(loginRq.getEmail(), loginRq.getPassword());

    if (member != null) {
      String token = tokenProvider.generateJwtToken(member);
      return ResponseEntity.ok(new LoginRs(token, member.getId()));
    } else {
      return ResponseEntity.status(400).body("로그인 실패 : 이메일이나 비밀번호가 일치하지 않음");
    }
  }

  // 내 정보 조회
  @GetMapping("/members/me")
  public ResponseEntity<MyInfoRs> getMyInfo(@AuthenticationPrincipal String memberId){
    MyInfoRs myInfoRs = memberService.getMyInfo(Long.parseLong(memberId));
    return ResponseEntity.ok(myInfoRs);
  }

}
