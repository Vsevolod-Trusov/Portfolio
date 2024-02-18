package by.spring.promo.promoDB.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Review {
    private String content;
    private Long estimation;
    private String reviewerLogin;
}
