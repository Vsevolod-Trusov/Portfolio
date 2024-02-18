package by.spring.promo.promoDB.rowmapper;

import by.spring.promo.promoDB.entity.AdminInfo;
import by.spring.promo.promoDB.entity.Authorization;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class AdminInfoRowMapper implements RowMapper<AdminInfo> {

    @Override
    public AdminInfo mapRow(ResultSet resultSet, int rowNum) throws SQLException {
        AdminInfo adminInfo = new AdminInfo();
        adminInfo.setUserCount(resultSet.getBigDecimal("user_count"));
        adminInfo.setStaffCount(resultSet.getBigDecimal("staff_count"));
        adminInfo.setUnprocessedOrdersCount(resultSet.getBigDecimal("unprocessed_orders_count"));
        return adminInfo;
    }
}
