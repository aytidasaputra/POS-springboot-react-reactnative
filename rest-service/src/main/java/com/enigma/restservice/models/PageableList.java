package com.enigma.restservice.models;

import java.util.List;

public class PageableList<T> {
  private List<T> list;
  private int page;
  private int size;
  private Long total;

  public PageableList(List<T> list, int page, int size, Long total) {
    this.list = list;
    this.page = page;
    this.size = size;
    this.total = total;
  }

  public List<T> getList() {
    return this.list;
  }

  public void setList(List<T> list) {
    this.list = list;
  }

  public int getPage() {
    return this.page;
  }

  public void setPage(int page) {
    this.page = page;
  }

  public int getSize() {
    return this.size;
  }

  public void setSize(int size) {
    this.size = size;
  }

  public Long getTotal() {
    return this.total;
  }

  public void setTotal(Long total) {
    this.total = total;
  }
}
