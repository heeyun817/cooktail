package io.cooktail.backend.cocktail.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class S3Uploader {
  @Value("${cloud.aws.s3.bucketName}")
  private String bucket;

  private final AmazonS3Client amazonS3Client;

  public List<String> uploadFiles(String dirName, List<MultipartFile> multipartFiles) {
    List<String> s3files = new ArrayList<>();

    for (MultipartFile multipartFile : multipartFiles) {

      String uploadFileUrl = "";

      ObjectMetadata objectMetadata = new ObjectMetadata();
      objectMetadata.setContentLength(multipartFile.getSize());
      objectMetadata.setContentType(multipartFile.getContentType());

      try (InputStream inputStream = multipartFile.getInputStream()) {
        String key = dirName + "/" + UUID.randomUUID() + "." + multipartFile.getOriginalFilename();
        amazonS3Client.putObject(new PutObjectRequest(bucket, key, inputStream, objectMetadata).withCannedAcl(CannedAccessControlList.PublicRead));
        uploadFileUrl = amazonS3Client.getUrl(bucket, key).toString();
      } catch (IOException e) {
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다.");
      }

      s3files.add(uploadFileUrl);
    }
    return s3files;
  }
}
