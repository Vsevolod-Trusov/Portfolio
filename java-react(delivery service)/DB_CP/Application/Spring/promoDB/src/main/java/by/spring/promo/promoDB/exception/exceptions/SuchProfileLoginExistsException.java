package by.spring.promo.promoDB.exception.exceptions;


import java.sql.SQLException;

public class SuchProfileLoginExistsException extends SQLException {
    public SuchProfileLoginExistsException(String message){
        super(message);
    }
}
