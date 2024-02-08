package io.cooktail.backend.cocktail.controller;

import io.cooktail.backend.cocktail.domain.Cocktail;
import io.cooktail.backend.cocktail.dto.CocktailRq;
import io.cooktail.backend.cocktail.service.CocktailService;
import io.cooktail.backend.cocktail.service.S3Uploader;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
public class CocktailController {

  private final CocktailService service;
  private final S3Uploader s3Uploader;

  @PostMapping("/cocktails")
  public Cocktail createCocktail(
      @RequestParam long member,
      @ModelAttribute CocktailRq cocktailRq,
      @RequestPart(value = "images", required = false) List<MultipartFile> images) throws IOException {
    String dirName = "cocktail";
    List<String> imageUrls = s3Uploader.uploadFiles(dirName, images);
    return service.createCocktail(member,cocktailRq,imageUrls);
  }

  // S3 test
  @PostMapping("/upload")
  public ResponseEntity<List<String>> uploadFiles(
      @RequestParam("files") List<MultipartFile> files) {
      String folder = "test";
      List<String> uploadedFileUrls = s3Uploader.uploadFiles(folder, files);
      return ResponseEntity.ok(uploadedFileUrls);
  }

}
