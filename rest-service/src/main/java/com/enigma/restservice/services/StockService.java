package com.enigma.restservice.services;

import com.enigma.restservice.entities.Stock;
import com.enigma.restservice.summaries.StockSummary;
import java.util.List;

public interface StockService extends CommonService<Stock, Integer> {
  public List<StockSummary> summary();
}
