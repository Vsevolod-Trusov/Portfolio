package by.spring.promo.promoDB.entity;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class Route {
    private String deliveryPointName;
    private String customerPointname;
    private BigDecimal distance;
    private int staffCount;
}
