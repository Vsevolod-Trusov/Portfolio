package by.spring.promo.promoDB.rowmapper;

import by.spring.promo.promoDB.entity.Point;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class PointRowMapper implements RowMapper<Point> {
    @Override
    public Point mapRow(ResultSet resultSet, int i) throws SQLException {
        Point point = new Point();
        point.setPointName(resultSet.getString("point_name"));
        point.setType(resultSet.getString("type"));
        return point;
    }
}
