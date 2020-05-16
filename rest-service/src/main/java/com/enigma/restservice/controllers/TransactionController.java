package com.enigma.restservice.controllers;

import com.enigma.restservice.entities.Transaction;
import com.enigma.restservice.entities.converter_enum.TypeEnum;
import com.enigma.restservice.exception.EntityNotFoundException;
import com.enigma.restservice.models.PageableList;
import com.enigma.restservice.models.ResponseMessage;
import com.enigma.restservice.models.TransactionModel;
import com.enigma.restservice.services.TransactionService;
import com.enigma.restservice.summaries.TransactionSummary;
import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.Month;
import java.time.Year;
import java.util.List;
import javax.validation.Valid;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/transactions")
@RestController
public class TransactionController {
  @Autowired
  private TransactionService transactionService;

  @PostMapping
  public ResponseMessage<TransactionModel> add(
    @RequestBody TransactionModel model
  ) {
    Transaction entity = transactionService.save(
      new Transaction(
        model.getAmount(),
        model.getType(),
        model.getDescription()
      )
    );
    ModelMapper modelMapper = new ModelMapper();
    TransactionModel data = modelMapper.map(entity, TransactionModel.class);
    return ResponseMessage.success(data);
  }

  @PutMapping("/{id}")
  public ResponseMessage<TransactionModel> edit(
    @PathVariable Integer id,
    @RequestBody @Valid TransactionModel model
  ) {
    ModelMapper modelMapper = new ModelMapper();

    model.setId(id);
    Transaction entity = transactionService.findById(id);
    modelMapper.map(model, entity);

    entity = transactionService.save(entity);

    TransactionModel data = modelMapper.map(entity, TransactionModel.class);
    return ResponseMessage.success(data);
  }

  @DeleteMapping("/{id}")
  public ResponseMessage<TransactionModel> removeById(
    @PathVariable Integer id
  ) {
    Transaction entity = transactionService.removeById(id);
    ModelMapper modelMapper = new ModelMapper();
    TransactionModel model = modelMapper.map(entity, TransactionModel.class);
    return ResponseMessage.success(model);
  }

  @GetMapping("/{id}")
  public ResponseMessage<TransactionModel> findById(@PathVariable Integer id) {
    Transaction entity = transactionService.findById(id);
    if (entity != null) {
      ModelMapper modelMapper = new ModelMapper();
      TransactionModel model = modelMapper.map(entity, TransactionModel.class);
      return ResponseMessage.success(model);
    } else {
      throw new EntityNotFoundException();
    }
  }

  @GetMapping
  public ResponseMessage<PageableList<TransactionModel>> findAll(
    @RequestParam(required = false) BigDecimal amount,
    @RequestParam(required = false) TypeEnum type,
    @RequestParam(required = false) String description,
    @RequestParam(defaultValue = "ASC") String sort,
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "10") int size
  ) {
    if (size > 100) {
      size = 100;
    }
    Transaction entity = new Transaction(amount, type, description);
    Sort.Direction direction = Sort
      .Direction.fromOptionalString(sort.toUpperCase())
      .orElse(Sort.Direction.ASC);
    Page<Transaction> pageTransactions = transactionService.findAll(
      entity,
      page,
      size,
      direction
    );
    List<Transaction> Transactions = pageTransactions.toList();

    ModelMapper modelMapper = new ModelMapper();
    Type tipe = new TypeToken<List<TransactionModel>>() {}.getType();
    List<TransactionModel> TransactionModels = modelMapper.map(
      Transactions,
      tipe
    );
    PageableList<TransactionModel> data = new PageableList(
      TransactionModels,
      pageTransactions.getNumber(),
      pageTransactions.getSize(),
      pageTransactions.getTotalElements()
    );
    return ResponseMessage.success(data);
  }

  @GetMapping("/summary")
  public ResponseMessage<TransactionSummary> summary() {
    LocalDate now = LocalDate.now();
    return summary(now.getYear(), now.getMonthValue(), now.getDayOfMonth());
  }

  @GetMapping("/summary/{year}")
  public ResponseMessage<TransactionSummary> summary(
    @PathVariable Integer year
  ) {
    return summary(year, null, null);
  }

  @GetMapping("/summary/{year}/{month}")
  public ResponseMessage<TransactionSummary> summary(
    @PathVariable Integer year,
    @PathVariable Integer month
  ) {
    return summary(year, month, null);
  }

  @GetMapping("/summary/{year}/{month}/{date}")
  public ResponseMessage<TransactionSummary> summary(
    @PathVariable Integer year,
    @PathVariable Integer month,
    @PathVariable Integer date
  ) {
    return ResponseMessage.success(
      transactionService.summary(
        Year.of(year),
        month != null ? Month.of(month) : null,
        date
      )
    );
  }
}
