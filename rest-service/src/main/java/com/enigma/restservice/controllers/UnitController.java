package com.enigma.restservice.controllers;

import com.enigma.restservice.entities.Unit;
import com.enigma.restservice.models.PageableList;
import com.enigma.restservice.models.ResponseMessage;
import com.enigma.restservice.models.UnitModel;
import com.enigma.restservice.repositories.UnitRepository;
import com.enigma.restservice.services.UnitService;
import java.lang.reflect.Type;
import java.util.List;
import javax.validation.Valid;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/units")
@RestController
@Validated
public class UnitController {
  @Autowired
  private UnitRepository repository;

  @Autowired
  private UnitService UnitService;

  @PostMapping
  public ResponseMessage<UnitModel> add(@RequestBody @Valid UnitModel model) {
    Unit entity = UnitService.save(
      new Unit(model.getName(), model.getDescription())
    );
    ModelMapper modelMapper = new ModelMapper();
    UnitModel data = modelMapper.map(entity, UnitModel.class);
    return ResponseMessage.success(data);
  }

  @PutMapping("/{id}")
  public ResponseMessage<UnitModel> edit(
    @PathVariable Integer id,
    @RequestBody @Valid UnitModel model
  ) {
    model.setId(id);
    ModelMapper modelMapper = new ModelMapper();
    Unit entity = UnitService.findById(id);
    modelMapper.map(model, entity);

    entity = repository.save(entity);
    UnitModel data = modelMapper.map(entity, UnitModel.class);
    return ResponseMessage.success(data);
  }

  @DeleteMapping("/{id}")
  public ResponseMessage<UnitModel> removeById(@PathVariable Integer id) {
    Unit entity = UnitService.removeById(id);
    ModelMapper modelMapper = new ModelMapper();
    UnitModel data = modelMapper.map(entity, UnitModel.class);
    return ResponseMessage.success(data);
  }

  @GetMapping("/{id}")
  public ResponseMessage<UnitModel> findById(@PathVariable Integer id) {
    Unit entity = UnitService.findById(id);
    ModelMapper modelMapper = new ModelMapper();
    UnitModel data = modelMapper.map(entity, UnitModel.class);
    return ResponseMessage.success(data);
  }

  @GetMapping
  public ResponseMessage<PageableList<UnitModel>> findAll(
    @RequestParam(required = false) String name,
    @RequestParam(required = false) String descripton,
    @RequestParam(defaultValue = "asc") String sort,
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "10") int size
  ) {
    if (size > 100) {
      size = 100;
    }

    Unit entity = new Unit(name, descripton);
    // Sort.Direction direction = Sort.Direction.valueOf(sort.toUpperCase());
    Sort.Direction direction = Sort
      .Direction.fromOptionalString(sort.toUpperCase())
      .orElse(Sort.Direction.ASC);
    Page<Unit> pageUnits = UnitService.findAll(entity, page, size, direction);
    List<Unit> Units = pageUnits.toList();

    ModelMapper modelMapper = new ModelMapper();
    Type type = new TypeToken<List<UnitModel>>() {}.getType();
    List<UnitModel> UnitModels = modelMapper.map(Units, type);

    PageableList<UnitModel> data = new PageableList<>(
      UnitModels,
      pageUnits.getNumber(),
      pageUnits.getSize(),
      pageUnits.getTotalElements()
    );
    return ResponseMessage.success(data);
  }
}
