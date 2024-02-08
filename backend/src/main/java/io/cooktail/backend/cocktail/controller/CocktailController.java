package io.cooktail.backend.cocktail.controller;

import io.cooktail.backend.cocktail.domain.Cocktail;
import io.cooktail.backend.cocktail.dto.CocktailRq;
import io.cooktail.backend.cocktail.dto.CocktailRs;
import io.cooktail.backend.cocktail.service.CocktailService;
import io.cooktail.backend.cocktail.service.S3Uploader;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
public class CocktailController {

  private final CocktailService service;
  private final S3Uploader s3Uploader;

  // 모든 글 조회, 검색
  @GetMapping("/cocktails")
  public Page<CocktailRs> getAllCocktail(
      @PageableDefault(page = 0, size = 8, sort = "createdAt", direction = Direction.DESC) Pageable pageable,
      @RequestParam(required = false) String keyword) {

    if (keyword == null) {
      return service.findAll(pageable);
    }
    else return service.search(pageable,keyword);
  }

  // id로 조회
  @GetMapping("/cocktails/{id}")
  public CocktailRs getCocktailById(@PathVariable Long id) {
    service.updateView(id);
    return service.findById(id);
  }

  // 작성
  @PostMapping("/cocktails")
  public Long createCocktail(
      @RequestParam long member,
      @ModelAttribute CocktailRq cocktailRq,
      @RequestPart(value = "images") List<MultipartFile> images) throws IOException {
    String dirName = "cocktail";
    List<String> imageUrls = s3Uploader.uploadFiles(dirName, images);
    return service.createCocktail(member,cocktailRq,imageUrls);
  }

}
