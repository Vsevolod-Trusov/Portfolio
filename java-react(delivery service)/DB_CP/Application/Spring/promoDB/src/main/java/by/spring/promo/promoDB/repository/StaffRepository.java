package by.spring.promo.promoDB.repository;

import by.spring.promo.promoDB.entity.Authorization;
import by.spring.promo.promoDB.entity.StaffInfo;
import by.spring.promo.promoDB.exception.DataNotFoundException;
import by.spring.promo.promoDB.exception.exceptions.SuchProfileLoginExistsException;
import by.spring.promo.promoDB.rowmapper.AuthorizationRowMapper;
import by.spring.promo.promoDB.rowmapper.OrderRowMapper;
import by.spring.promo.promoDB.rowmapper.ReviewMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;
import java.util.Map;

@Repository
public class StaffRepository {
    @Autowired
    @Qualifier("staffJdbcTemplate")
    private final JdbcTemplate staffJdbcTemplate;

    public StaffRepository(JdbcTemplate staffJdbcTemplate) {
        this.staffJdbcTemplate = staffJdbcTemplate;
    }

    //in general
    @Transactional
    public List findAllReviews(){
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(staffJdbcTemplate)
                .withSchemaName("ADMIN")
                .withCatalogName("general_package")
                .withFunctionName("get_reviews")
                .returningResultSet("reviews", new ReviewMapper());
        List reviews = simpleJdbcCall.executeFunction(List.class);
        return reviews;
    }


    //in general
    @Transactional
    @ExceptionHandler
    public void updateOrderStatus(String orderName, String status) throws SQLException {
            SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(staffJdbcTemplate)
                    .withSchemaName("ADMIN")
                    .withCatalogName("general_package")//поменять пакет
                    .declareParameters(new SqlParameter("order_name", Types.NVARCHAR),
                            new SqlParameter("get_status", Types.NVARCHAR))
                    .withProcedureName("change_order_status_by_name");
            SqlParameterSource in = new MapSqlParameterSource().addValue("order_name", orderName)
                    .addValue("get_status", status);
            simpleJdbcCall.execute(in);
    }

    public List getOrdersByStaffLogin(String staffLogin) throws SQLException {
            SimpleJdbcCall getOrdersByStaffLogin = new SimpleJdbcCall(staffJdbcTemplate)
                    .withSchemaName("ADMIN")
                    .withCatalogName("staff_package")
                    .declareParameters(new SqlParameter("staff_login", Types.NVARCHAR))
                    .withFunctionName("get_processed_order_to_staff_by_login")
                    .returningResultSet("orders", new OrderRowMapper());
            SqlParameterSource in = new MapSqlParameterSource().addValue("staff_login", staffLogin);
            List processedOrdersToStaff = getOrdersByStaffLogin.executeFunction(List.class, in);
            return processedOrdersToStaff;
    }

    //get_processed_orders_count_by_login
    public StaffInfo getStaffInfo(String staffLogin){
        SimpleJdbcCall getOrdersCount = new SimpleJdbcCall(staffJdbcTemplate)
                .withSchemaName("ADMIN")
                .withCatalogName("staff_package")
                .declareParameters(new SqlParameter("staff_login", Types.NVARCHAR))
                .withFunctionName("get_processed_orders_count_by_login");
        SqlParameterSource in = new MapSqlParameterSource().addValue("staff_login", staffLogin);

        StaffInfo staffInfo = new StaffInfo();
        staffInfo.setOrdersCount(getOrdersCount.executeFunction(BigDecimal.class, in));
        return staffInfo;
    }
}
