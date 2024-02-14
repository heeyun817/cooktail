package io.cooktail.backend.member.repository;

import io.cooktail.backend.member.domain.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

  Optional<Member> findByEmail (String email);
  boolean existsByEmail(String email);

}
