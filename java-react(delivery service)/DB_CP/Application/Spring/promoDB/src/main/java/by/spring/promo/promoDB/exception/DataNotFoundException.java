package by.spring.promo.promoDB.exception;

import org.springframework.dao.DataIntegrityViolationException;

import java.sql.SQLException;

public class DataNotFoundException extends DataIntegrityViolationException {
    public DataNotFoundException(String message){
        super(message);
    }
}
