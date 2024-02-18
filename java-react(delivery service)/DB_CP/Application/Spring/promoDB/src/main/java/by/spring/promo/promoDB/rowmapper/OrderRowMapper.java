package by.spring.promo.promoDB.rowmapper;

import by.spring.promo.promoDB.entity.Order;
import org.springframework.jdbc.core.RowMapper;

public class OrderRowMapper implements RowMapper<Order> {
    @Override
    public Order mapRow(java.sql.ResultSet rs, int rowNum) throws java.sql.SQLException {
        Order order = new Order();
        order.setOrderName(rs.getString("ORDER_NAME"));
        order.setGoodName(rs.getString("GOOD_NAME"));
        order.setExecutorLogin(rs.getString("executor_login"));
        order.setCustomerLogin(rs.getString("customer_login"));
        order.setOrderDate(rs.getDate("ORDER_DATE"));
        order.setDeliveryDate(rs.getDate("DELIVERY_DATE"));
        order.setUserAddress(rs.getString("user_point"));
        order.setDeliveryAddress(rs.getString("delivery_point"));
        order.setPrice(rs.getBigDecimal("order_price"));
        order.setStatus(rs.getString("order_status"));
        order.setDeliveryType(rs.getString("delivery_type"));
        return order;
    }
}
