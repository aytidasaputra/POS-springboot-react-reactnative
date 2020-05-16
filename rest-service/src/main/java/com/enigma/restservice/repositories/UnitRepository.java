package com.enigma.restservice.repositories;

import com.enigma.restservice.entities.Unit;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UnitRepository
  extends JpaRepository<Unit, Integer>, UnitRepositoryCustom {
  public List<Unit> findByNameContainingOrDescriptionContaining(
    String Name,
    String Description
  );
}
