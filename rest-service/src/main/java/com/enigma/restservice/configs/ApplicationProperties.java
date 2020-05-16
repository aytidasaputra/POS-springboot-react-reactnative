package com.enigma.restservice.configs;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@ConfigurationProperties(prefix = "application")
@Configuration
public class ApplicationProperties {
  private String dataDir;

  public String getDataDir() {
    return this.dataDir;
  }

  public void setDataDir(String dataDir) {
    this.dataDir = dataDir;
  }
}
