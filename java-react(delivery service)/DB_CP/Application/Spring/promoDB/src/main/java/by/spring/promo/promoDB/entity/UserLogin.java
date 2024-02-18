package by.spring.promo.promoDB.entity;


import lombok.*;
import org.hibernate.annotations.Check;

import javax.persistence.*;

@Getter
@Setter
public class UserLogin {
    private String login;
    private String password;
    private String role;
    private String email;
    private String pointName;
}
