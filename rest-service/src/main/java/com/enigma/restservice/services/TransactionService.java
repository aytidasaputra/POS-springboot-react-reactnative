package com.enigma.restservice.services;

import com.enigma.restservice.entities.Transaction;
import com.enigma.restservice.summaries.TransactionSummary;
import java.time.Month;
import java.time.Year;

public interface TransactionService
  extends CommonService<Transaction, Integer> {
  public TransactionSummary summary(Year year, Month month, Integer date);
}
