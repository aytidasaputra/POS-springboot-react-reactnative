package com.enigma.restservice.services.impl;

import com.enigma.restservice.entities.Transaction;
import com.enigma.restservice.repositories.TransactionRepository;
import com.enigma.restservice.services.TransactionService;
import com.enigma.restservice.summaries.TransactionSummary;
import java.time.Month;
import java.time.Year;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class TransactionServiceImpl
  extends CommonServiceImpl<Transaction, Integer>
  implements TransactionService {
  @Autowired
  private TransactionRepository repository;

  @Override
  protected JpaRepository<Transaction, Integer> getRepository() {
    return repository;
  }

  @Override
  public TransactionSummary summary(Year year, Month month, Integer date) {
    return null;
  }
}
