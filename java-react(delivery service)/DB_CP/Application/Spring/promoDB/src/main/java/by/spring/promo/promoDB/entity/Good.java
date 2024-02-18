package by.spring.promo.promoDB.entity;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class Good {
    private String name;
    private String description;
    private BigDecimal price;
}
