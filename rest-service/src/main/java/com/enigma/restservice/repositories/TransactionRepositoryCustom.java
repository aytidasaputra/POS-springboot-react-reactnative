package com.enigma.restservice.repositories;

import com.enigma.restservice.summaries.TransactionSummaryChoice;
import java.time.LocalDate;
import java.util.List;

public interface TransactionRepositoryCustom {
  public List<TransactionSummaryChoice> findTransactionOn(
    LocalDate from,
    LocalDate to
  );
}
