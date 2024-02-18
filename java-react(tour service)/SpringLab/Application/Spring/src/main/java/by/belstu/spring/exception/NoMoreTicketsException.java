package by.belstu.spring.exception;

public class NoMoreTicketsException extends Exception{
    public NoMoreTicketsException(String message) {
        super(message);
    }

}
