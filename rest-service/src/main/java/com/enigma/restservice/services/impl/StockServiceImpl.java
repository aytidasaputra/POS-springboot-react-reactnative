package com.enigma.restservice.services.impl;

import com.enigma.restservice.entities.Stock;
import com.enigma.restservice.repositories.StockRepository;
import com.enigma.restservice.services.StockService;
import com.enigma.restservice.summaries.StockSummary;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Transactional
@Service
public class StockServiceImpl
  extends CommonServiceImpl<Stock, Integer>
  implements StockService {
  @Autowired
  private StockRepository repository;

  @Override
  protected JpaRepository<Stock, Integer> getRepository() {
    return repository;
  }

  @Override
  public List<StockSummary> summary() {
    return repository.summary();
  }
}
