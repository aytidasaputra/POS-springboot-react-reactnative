package com.enigma.restservice.controllers;

import com.enigma.restservice.entities.Item;
import com.enigma.restservice.entities.Stock;
import com.enigma.restservice.entities.Unit;
import com.enigma.restservice.models.PageableList;
import com.enigma.restservice.models.ResponseMessage;
import com.enigma.restservice.models.StockModel;
import com.enigma.restservice.repositories.StockRepository;
import com.enigma.restservice.services.StockService;
import com.enigma.restservice.summaries.StockSummary;
import java.lang.reflect.Type;
import java.util.List;
import javax.validation.Valid;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/stocks")
@RestController
@Validated
public class StockController {
  @Autowired
  private StockRepository repository;

  @Autowired
  private StockService stockService;

  @PostMapping
  public ResponseMessage<StockModel> add(@RequestBody @Valid Stock model) {
    Stock entity = stockService.save(
      new Stock(model.getQuantity(), model.getItem(), model.getUnit())
    );
    ModelMapper modelMapper = new ModelMapper();
    StockModel data = modelMapper.map(entity, StockModel.class);
    return ResponseMessage.success(data);
  }

  @PutMapping("/{id}")
  public ResponseMessage<StockModel> edit(
    @PathVariable Integer id,
    @RequestBody @Valid StockModel model
  ) {
    model.setId(id);
    ModelMapper modelMapper = new ModelMapper();
    Stock entity = stockService.findById(id);
    modelMapper.map(model, entity);

    entity = repository.save(entity);
    StockModel data = modelMapper.map(entity, StockModel.class);
    return ResponseMessage.success(data);
  }

  @DeleteMapping("/{id}")
  public ResponseMessage<StockModel> removeById(@PathVariable Integer id) {
    Stock entity = stockService.removeById(id);
    ModelMapper modelMapper = new ModelMapper();
    StockModel data = modelMapper.map(entity, StockModel.class);
    return ResponseMessage.success(data);
  }

  @GetMapping("/{id}")
  public ResponseMessage<StockModel> findById(@PathVariable Integer id) {
    Stock entity = stockService.findById(id);
    ModelMapper modelMapper = new ModelMapper();
    StockModel data = modelMapper.map(entity, StockModel.class);
    return ResponseMessage.success(data);
  }

  @GetMapping
  public ResponseMessage<PageableList<StockModel>> findAll(
    @RequestParam(required = false) Integer Id,
    @RequestParam(required = false) Item item,
    @RequestParam(required = false) Unit unit,
    @RequestParam(required = false) String descripton,
    @RequestParam(defaultValue = "asc") String sort,
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "10") int size
  ) {
    if (size > 100) {
      size = 100;
    }

    Stock entity = new Stock(Id, item, unit);
    // Sort.Direction direction = Sort.Direction.valueOf(sort.toUpperCase());
    Sort.Direction direction = Sort
      .Direction.fromOptionalString(sort.toUpperCase())
      .orElse(Sort.Direction.ASC);
    Page<Stock> pageUnits = stockService.findAll(entity, page, size, direction);
    List<Stock> Units = pageUnits.toList();

    ModelMapper modelMapper = new ModelMapper();
    Type type = new TypeToken<List<StockModel>>() {}.getType();
    List<StockModel> stockModels = modelMapper.map(Units, type);

    PageableList<StockModel> data = new PageableList<>(
      stockModels,
      pageUnits.getNumber(),
      pageUnits.getSize(),
      pageUnits.getTotalElements()
    );
    return ResponseMessage.success(data);
  }

  @GetMapping(path = "/summary", produces = "application/json")
  public ResponseMessage<List<StockSummary>> summary() {
    List<StockSummary> entity = stockService.summary();
    return ResponseMessage.success(entity);
  }
}
