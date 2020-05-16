package com.enigma.restservice.services.impl;

import com.enigma.restservice.configs.ApplicationProperties;
import com.enigma.restservice.entities.Item;
import com.enigma.restservice.services.ItemImagesService;
import java.nio.file.*;
import java.nio.file.Files;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ItemImagesServiceImpl implements ItemImagesService {
  @Autowired
  private ApplicationProperties properties;

  private Path parentDir;

  @PostConstruct
  public void init() throws Exception {
    parentDir =
      Paths.get(properties.getDataDir(), "Item").toAbsolutePath().normalize();
    Files.createDirectories(parentDir);
  }

  @Override
  public Path save(Item entity, MultipartFile file) throws Exception {
    Path dir = parentDir.resolve(entity.getId().toString());
    Files.createDirectories(dir);
    Path targetFile = dir.resolve(file.getOriginalFilename());
    Files.copy(
      file.getInputStream(),
      targetFile,
      StandardCopyOption.REPLACE_EXISTING
    );
    return targetFile;
  }

  @Override
  public List<Path> list(Item entity) throws Exception {
    Path dir = parentDir.resolve(entity.getId().toString());
    return Files.isDirectory(dir)
      ? Files.list(dir).collect(Collectors.toList())
      : Collections.EMPTY_LIST;
  }

  @Override
  public Resource load(Item entity, String fileName) throws Exception {
    Path target = parentDir
      .resolve(entity.getId().toString())
      .resolve(fileName);
    Resource resource = new UrlResource(target.toUri());
    return resource;
  }

  @Override
  public boolean delete(Item entity, String fileName) throws Exception {
    Integer id = entity.getId();
    Path target = parentDir.resolve(id.toString()).resolve(fileName);

    return Files.deleteIfExists(target);
  }
}
