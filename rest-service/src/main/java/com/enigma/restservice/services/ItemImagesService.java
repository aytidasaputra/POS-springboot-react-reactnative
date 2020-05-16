package com.enigma.restservice.services;

import com.enigma.restservice.entities.Item;
import java.nio.file.Path;
import java.util.List;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface ItemImagesService {
  public Path save(Item entity, MultipartFile file) throws Exception;

  public Resource load(Item entity, String fileName) throws Exception;

  public boolean delete(Item entity, String fileName) throws Exception;

  public List<Path> list(Item entity) throws Exception;
}
