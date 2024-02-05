package io.cooktail.backend.cocktail.controller;

import io.cooktail.backend.cocktail.service.CocktailService;
import io.cooktail.backend.cocktail.service.S3Uploader;
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

  // S3 test
  @PostMapping("/upload")
  public ResponseEntity<List<String>> uploadFiles(
      @RequestParam("files") List<MultipartFile> files) {
      String folder = "test";
      List<String> uploadedFileUrls = s3Uploader.uploadFiles(folder, files);
      return ResponseEntity.ok(uploadedFileUrls);
  }
}
