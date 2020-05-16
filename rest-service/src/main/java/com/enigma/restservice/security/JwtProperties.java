package com.enigma.restservice.security;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "jwt")
public class JwtProperties {
  private String authoritiesKey = "scopes";
  private String signingKey = "secret";
  private long validityMillis = 360000;

  public String getAuthoritiesKey() {
    return this.authoritiesKey;
  }

  public void setAuthoritiesKey(String authoritiesKey) {
    this.authoritiesKey = authoritiesKey;
  }

  public String getSigningKey() {
    return this.signingKey;
  }

  public void setSigningKey(String signingKey) {
    this.signingKey = signingKey;
  }

  public long getValidityMillis() {
    return this.validityMillis;
  }

  public void setValidityMillis(long validityMillis) {
    this.validityMillis = validityMillis;
  }

  public int getValidityMilis() {
    return 0;
  }
}
