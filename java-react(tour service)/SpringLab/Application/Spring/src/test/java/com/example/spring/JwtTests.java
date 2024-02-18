package com.example.spring;

import by.belstu.spring.Application;
import by.belstu.spring.security.JwtUtil;
import io.jsonwebtoken.lang.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.logging.Logger;

public class JwtTests {

    private Logger log = Logger.getLogger(JwtTests.class.getName());
    @Test
    public void testGenerateJwtToken(){
        JwtUtil jwtUtil = new JwtUtil();
        log.info(jwtUtil.generateToken("asd","asd","asda", "ROLE_USER"));

    }

    @Test
    public void testValidateJwtToken(){
        String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJVc2VyIGRldGFpbHMiLCJzdXJuYW1lIjoiYXNkIiwibmFtZSI6ImFzZCIsImlzcyI6InNwcmluZyIsImV4cCI6MTY2NzU2MjQ5MCwiaWF0IjoxNjY3NTU4ODkwLCJlbWFpbCI6ImFzZGEifQ.WKtM8y2ltiZ_FG1HCD3YNopHrqGY7Kzz6m85vqCLjl8";

        JwtUtil jwtUtil = new JwtUtil();
        log.info(jwtUtil.getRetrieveClaim(token).toString());

    }
}
