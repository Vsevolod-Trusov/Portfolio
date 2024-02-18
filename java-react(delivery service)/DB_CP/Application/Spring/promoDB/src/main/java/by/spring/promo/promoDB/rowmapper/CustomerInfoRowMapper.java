package by.spring.promo.promoDB.rowmapper;

import by.spring.promo.promoDB.entity.AdminInfo;
import by.spring.promo.promoDB.entity.CustomerInfo;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class CustomerInfoRowMapper implements RowMapper<CustomerInfo> {

    @Override
    public CustomerInfo mapRow(ResultSet resultSet, int rowNum) throws SQLException {
        CustomerInfo customerInfo = new CustomerInfo();
        customerInfo.setUnprocessedOrdersCount(resultSet.getBigDecimal("unprocessed_orders"));
        customerInfo.setProcessedOrdersCount(resultSet.getBigDecimal("processed_orders"));
        customerInfo.setAllOrdersCount(resultSet.getBigDecimal("all_orders"));
        return customerInfo;
    }
}
