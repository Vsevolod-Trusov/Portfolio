package by.spring.promo.promoDB.exception.advice;

import by.spring.promo.promoDB.exception.DataNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@ControllerAdvice
public class SqlExceptionAdvice{
    @ResponseBody
    @ExceptionHandler(SQLException.class)
    public ResponseEntity<Map<String,String>> exceptionHandler(SQLException exception) {
        Pattern pattern = Pattern.compile("ORA-\\d+:\\s(\\w|\\s)+\n");
        Matcher matcher = pattern.matcher(exception.getMessage());
        String errorMessage;
        if(matcher.find())
            errorMessage = matcher.group(0).split(":")[1].split("\n")[0];//.split(":")[1];
        else {
            errorMessage = exception.getMessage();
        }
        Map<String,String> errorMap = new HashMap<>();
        errorMap.put("message", errorMessage);
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorMap);
    }
}
