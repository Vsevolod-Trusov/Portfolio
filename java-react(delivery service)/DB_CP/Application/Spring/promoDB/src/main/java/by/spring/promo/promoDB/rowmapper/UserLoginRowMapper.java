package by.spring.promo.promoDB.rowmapper;

import by.spring.promo.promoDB.entity.UserLogin;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserLoginRowMapper implements RowMapper<UserLogin>
{
    @Override
    public UserLogin mapRow(ResultSet resultSet, int rowNumber) throws SQLException
    {
        UserLogin user = new UserLogin();
        user.setLogin(resultSet.getString("LOGIN"));
        user.setPassword(resultSet.getString("PASSWORD"));
        user.setRole(resultSet.getString("ROLE"));
        return user;
    }
}