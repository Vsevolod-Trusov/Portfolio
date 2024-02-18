package by.spring.promo.promoDB.rowmapper;

import by.spring.promo.promoDB.entity.Review;
import by.spring.promo.promoDB.entity.UserLogin;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ReviewMapper  implements RowMapper<Review> {
    @Override
    public Review mapRow(ResultSet rs, int rowNum) throws SQLException {
        Review review = new Review();
        review.setContent(rs.getString("CONTENT"));
        review.setEstimation(rs.getLong("ESTIMATION"));
        review.setReviewerLogin(rs.getString("LOGIN"));
        return review;
    }
}
