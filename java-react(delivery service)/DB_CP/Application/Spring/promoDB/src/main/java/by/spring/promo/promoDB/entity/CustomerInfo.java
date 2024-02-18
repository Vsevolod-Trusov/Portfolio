package by.spring.promo.promoDB.entity;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class CustomerInfo {
    private BigDecimal unprocessedOrdersCount;
    private BigDecimal processedOrdersCount;
    private BigDecimal allOrdersCount;
}
