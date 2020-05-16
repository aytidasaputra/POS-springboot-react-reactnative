package com.enigma.restservice.repositories;

import com.enigma.restservice.summaries.StockSummary;
import java.util.List;

public interface StockRepositoryCustom {
  public List<StockSummary> summary();
}
