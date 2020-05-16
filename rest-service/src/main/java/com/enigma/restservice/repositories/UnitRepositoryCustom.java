package com.enigma.restservice.repositories;

import com.enigma.restservice.entities.Unit;
import java.util.List;

public interface UnitRepositoryCustom {
  public List<Unit> findByNameLike(String name, String Description);
}
