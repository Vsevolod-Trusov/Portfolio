package by.spring.promo.promoDB.entity;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class AdminInfo {
    private BigDecimal userCount;
    private BigDecimal staffCount;
    private BigDecimal unprocessedOrdersCount;
}
