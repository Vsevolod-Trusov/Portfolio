package by.spring.promo.promoDB.rowmapper;

import by.spring.promo.promoDB.entity.Good;
import by.spring.promo.promoDB.entity.History;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class HistoryRowMapper implements RowMapper<History> {
    @Override
    public History mapRow(ResultSet rs, int rowNum) throws SQLException {
        History history = new History();
        history.setName(rs.getString("NAME"));
        history.setOrderName(rs.getString("ORDER_NAME"));
        history.setStatus(rs.getString("STATUS"));
        history.setDeliveryDate(rs.getDate("DELIVERY_DATE"));
        history.setOrderDate(rs.getDate("ORDER_DATE"));
        return history;
    }
}
