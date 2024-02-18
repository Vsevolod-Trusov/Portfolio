package by.spring.promo.promoDB.rowmapper;

import by.spring.promo.promoDB.entity.Authorization;
import by.spring.promo.promoDB.entity.UserLogin;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class AuthorizationRowMapper implements RowMapper<Authorization>
{
    @Override
    public Authorization mapRow(ResultSet resultSet, int rowNumber) throws SQLException
    {
        Authorization authorization = new Authorization();
        authorization.setLogin(resultSet.getString("LOGIN"));
        authorization.setRole(resultSet.getString("ROLE"));
        return authorization;
    }
}