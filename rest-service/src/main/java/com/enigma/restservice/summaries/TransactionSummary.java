package com.enigma.restservice.summaries;

import java.time.LocalDate;
import java.util.List;

public class TransactionSummary {
  private List<TransactionSummaryChoice> entries;
  private LocalDate from;
  private LocalDate to;

  public TransactionSummary() {}

  public TransactionSummary(LocalDate from, LocalDate to) {
    this.from = from;
    this.to = to;
  }

  public TransactionSummary(List<TransactionSummaryChoice> entries) {
    this.entries = entries;
  }

  public List<TransactionSummaryChoice> getEntries() {
    return entries;
  }

  public void setEntries(List<TransactionSummaryChoice> entries) {
    this.entries = entries;
  }

  public LocalDate getFrom() {
    return from;
  }

  public void setFrom(LocalDate from) {
    this.from = from;
  }

  public LocalDate getTo() {
    return to;
  }

  public void setTo(LocalDate to) {
    this.to = to;
  }
}
