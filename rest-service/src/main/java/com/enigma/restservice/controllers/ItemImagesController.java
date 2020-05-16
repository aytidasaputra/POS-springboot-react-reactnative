package com.enigma.restservice.controllers;

import com.enigma.restservice.entities.Item;
import com.enigma.restservice.models.*;
import com.enigma.restservice.services.ItemImagesService;
import com.enigma.restservice.services.ItemService;
import java.net.URLConnection;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/items/{id}/images")
public class ItemImagesController {
  @Autowired
  private ItemImagesService service;

  @Autowired
  private ItemService itemService;

  @PostMapping
  public ResponseMessage<ItemImageModel> UploadImages(
    @PathVariable Integer id,
    @RequestParam MultipartFile file
  )
    throws Exception {
    Item entity = itemService.findById(id);
    Path path = service.save(entity, file);
    ItemImageModel model = ItemImageModel.from(id, path);
    return ResponseMessage.success(model);
  }

  @GetMapping("/{filename}")
  public ResponseEntity<Resource> download(
    @PathVariable Integer id,
    @PathVariable String filename
  )
    throws Exception {
    Item entity = itemService.findById(id);
    Resource resource = service.load(entity, filename);
    String mediaTypes = URLConnection.guessContentTypeFromName(
      resource.getFilename()
    );
    return ResponseEntity
      .ok()
      // .contentType(MediaType.parseMediaType(mediaTypes))
      .contentType(MediaType.APPLICATION_OCTET_STREAM)
      .header(
        HttpHeaders.CONTENT_DISPOSITION,
        "attachment: filename=\"" + resource.getFilename() + "\""
      )
      .body(resource);
  }

  @DeleteMapping("/{filename}")
  public ResponseMessage<Boolean> delete(
    @PathVariable Integer id,
    String fileName
  )
    throws Exception {
    Item entity = itemService.findById(id);
    service.delete(entity, fileName);

    return ResponseMessage.success(Boolean.TRUE);
  }

  @GetMapping
  public ResponseMessage<List<ItemImageModel>> list(@PathVariable Integer id)
    throws Exception {
    Item entity = itemService.findById(id);
    List<Path> paths = service.list(entity);
    List<ItemImageModel> models = new ArrayList<>();

    for (Path path : paths) {
      ItemImageModel model = ItemImageModel.from(id, path);
      models.add(model);
    }
    return ResponseMessage.success(models);
  }
}
