package by.spring.promo.promoDB.rowmapper;

import by.spring.promo.promoDB.entity.Review;
import by.spring.promo.promoDB.entity.Route;
import org.springframework.jdbc.core.RowMapper;

public class RouteRowMapper implements RowMapper<Route> {
    @Override
    public Route mapRow(java.sql.ResultSet rs, int rowNum) throws java.sql.SQLException {
        Route route = new Route();
        route.setDeliveryPointName(rs.getString("delivery_point"));
        route.setDistance(rs.getBigDecimal("distance"));
        route.setStaffCount(rs.getInt("staff_count"));
        return route;
    }
}
