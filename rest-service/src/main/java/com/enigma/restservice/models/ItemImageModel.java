package com.enigma.restservice.models;

import java.nio.file.Files;
import java.nio.file.Path;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

public class ItemImageModel {
  private String fileName;
  private String url;
  private String type;
  private Long size;

  public String getFileName() {
    return this.fileName;
  }

  public void setFileName(String fileName) {
    this.fileName = fileName;
  }

  public String getUrl() {
    return this.url;
  }

  public void setUrl(String url) {
    this.url = url;
  }

  public String getType() {
    return this.type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public Long getSize() {
    return this.size;
  }

  public void setSize(Long size) {
    this.size = size;
  }

  public static ItemImageModel from(Integer id, Path path) throws Exception {
    String name = path.getFileName().toString();
    String uri = ServletUriComponentsBuilder
      .fromCurrentContextPath()
      .path("/items/" + id + "/images/")
      .path(path.getFileName().toString())
      .toUriString();

    ItemImageModel model = new ItemImageModel();
    model.setFileName(name);
    model.setUrl(uri);
    model.setType(Files.probeContentType(path));
    model.setSize(Files.size(path));

    return model;
  }
}
