package by.spring.promo.promoDB.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class History {
    private String name;
    private String orderName;
    private String status;
    private Date deliveryDate;
    private Date orderDate;
}
