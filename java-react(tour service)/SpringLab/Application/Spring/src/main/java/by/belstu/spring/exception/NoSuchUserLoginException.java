package by.belstu.spring.exception;

public class NoSuchUserLoginException extends Exception{
    public NoSuchUserLoginException(String message) {
        super(message);
    }
}
