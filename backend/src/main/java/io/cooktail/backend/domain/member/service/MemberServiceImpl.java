package io.cooktail.backend.domain.member.service;

import io.cooktail.backend.domain.member.domain.Member;
import io.cooktail.backend.domain.member.dto.JoinRq;
import io.cooktail.backend.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

  private final MemberRepository memberRepository;
  private final PasswordEncoder passwordEncoder;

  //회원가입 TODO : 이미지 링크 바꾸기
  @Override
  public void create(JoinRq joinRq)  {

    if (memberRepository.existsByEmail(joinRq.getEmail())) {
      throw new RuntimeException("중복된 이메일입니다.");
    }
    Member member = Member.builder()
        .email(joinRq.getEmail())
        .password(passwordEncoder.encode(joinRq.getPassword()))
        .name(joinRq.getName())
        .birthDate(joinRq.getBirthDate())
        .image("https://avatar.iran.liara.run/public/") //https://baconmockup.com/250/250/
        .build();
    memberRepository.save(member);
  }

  // 로그인 확인
  public Member login(String email, String password) {
    return memberRepository.findByEmail(email)
        .filter(member -> passwordEncoder.matches(password, member.getPassword()))
        .orElse(null);
  }
}
