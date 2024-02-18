package by.spring.promo.promoDB.rowmapper;

import by.spring.promo.promoDB.entity.Good;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class GoodRowMapper implements RowMapper<Good> {
    @Override
    public Good mapRow(ResultSet rs, int rowNum) throws SQLException {
        Good good= new Good();
        good.setName(rs.getString("NAME"));
        good.setPrice(rs.getBigDecimal("PRICE"));
        good.setDescription(rs.getString("DESCRIPTION"));
        return good;
    }
}