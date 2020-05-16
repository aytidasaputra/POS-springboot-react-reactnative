package com.enigma.restservice.entities.converter_enum;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class TypeConverter implements AttributeConverter<TypeEnum, Integer> {

  @Override
  public Integer convertToDatabaseColumn(TypeEnum type) {
    if (type == null) return null;

    switch (type) {
      case PURCHASE:
        return 1;
      case SELL:
        return 2;
      default:
        throw new IllegalArgumentException(type + " not supported.");
    }
  }

  @Override
  public TypeEnum convertToEntityAttribute(Integer dbTransaction) {
    if (dbTransaction == null) return null;

    switch (dbTransaction) {
      case 1:
        return TypeEnum.PURCHASE;
      case 2:
        return TypeEnum.SELL;
      default:
        throw new IllegalArgumentException(dbTransaction + " not supported.");
    }
  }
}
