package io.cooktail.backend.global.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.util.StringUtils;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Component
@RequiredArgsConstructor
public class JwtTokenFilter extends OncePerRequestFilter {

  private final TokenProvider tokenProvider;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    try {
      String token = parseBearerToken(request);

      if (token != null && !token.equalsIgnoreCase("null")) {
        String memberId = tokenProvider.validateAndGetMemberId(token);

        AbstractAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
            memberId,
            null,
            AuthorityUtils.NO_AUTHORITIES
        );
        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(authentication);
        SecurityContextHolder.setContext(securityContext);
      }
    } catch (Exception ex) {
      response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
      response.getWriter().write("토큰이 유효하지 않습니다");
      return;
    }

    filterChain.doFilter(request, response);
  }

  private String parseBearerToken(HttpServletRequest request) {
    String bearerToken = request.getHeader("Authorization");

    if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
      return decodeBase64(bearerToken.substring(7));
    }
    return null;
  }

  private String decodeBase64(String encodedString) {
    byte[] decodedBytes = Base64.getDecoder().decode(encodedString.getBytes(StandardCharsets.UTF_8));
    return new String(decodedBytes, StandardCharsets.UTF_8);
  }
}
