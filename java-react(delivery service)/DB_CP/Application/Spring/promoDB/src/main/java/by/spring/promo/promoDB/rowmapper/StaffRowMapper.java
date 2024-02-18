package by.spring.promo.promoDB.rowmapper;

import by.spring.promo.promoDB.entity.Staff;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class StaffRowMapper implements RowMapper<Staff> {
    @Override
    public Staff mapRow(ResultSet resultSet, int rowNumber) throws SQLException {
        Staff staff = new Staff();
        staff.setName(resultSet.getString("LOGIN"));
        staff.setOrdersCount(resultSet.getInt("orders_count"));
        return staff;
    }
}
