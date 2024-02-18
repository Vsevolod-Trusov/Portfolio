package by.spring.promo.promoDB.repository;

import by.spring.promo.promoDB.entity.AdminInfo;
import by.spring.promo.promoDB.entity.Authorization;
import by.spring.promo.promoDB.entity.Order;
import by.spring.promo.promoDB.entity.UserLogin;
import by.spring.promo.promoDB.exception.DataNotFoundException;
import by.spring.promo.promoDB.exception.exceptions.SuchProfileLoginExistsException;
import by.spring.promo.promoDB.rowmapper.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
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
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Repository
public class AdminRepository {
    @Autowired
    @Qualifier("adminJdbcTemplate")
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public AdminRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    //in general
    @Transactional
    public List findAllReviews(){
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("ADMIN")
                .withCatalogName("general_package")
                .withFunctionName("get_reviews")
                .returningResultSet("reviews", new ReviewMapper());
        List reviews = simpleJdbcCall.executeFunction(List.class);
        return reviews;
    }

    //in general
    public List findAllGoods(int startValue, int endValue) {
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("ADMIN")
                .withCatalogName("general_package")
                .withFunctionName("get_pagination_goods")
                .declareParameters(
                        new SqlParameter("start_value", Types.INTEGER),
                        new SqlParameter("end_value", Types.INTEGER))
                .returningResultSet("goods", new GoodRowMapper());

        SqlParameterSource in = new MapSqlParameterSource()
                .addValue("start_value", startValue)
                .addValue("end_value", endValue);
        List goods = simpleJdbcCall.executeFunction(List.class, in);

        return goods;
    }

    //in general
    public BigDecimal getGoodsRowsCount(){
        SimpleJdbcCall getRoutes = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("ADMIN")
                .withCatalogName("general_package")
                .withFunctionName("count_rows_of_goods");
        BigDecimal count = getRoutes.executeFunction(BigDecimal.class);
        return count;
    }

    @Transactional
    public List findAllPersonsByRole(String role) {
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("ADMIN")
                .withCatalogName("admin_package")
                .withFunctionName("get_all_persons_by_role");

        List res = simpleJdbcCall.executeFunction(List.class, role);
        return res;
    }

    public List findUnprocessedOrders() {
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("ADMIN")
                .withCatalogName("admin_package")
                .withFunctionName("GET_UNPROCESSED_ORDERS")
                .returningResultSet("orders", new OrderRowMapper());

        List res = simpleJdbcCall.executeFunction(List.class);
        return res;
    }

    @Transactional
    public void updateOrderSetExecutorAndDeliveryPoint(Order order) throws SQLException {
            SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                    .withSchemaName("ADMIN")
                    .withCatalogName("admin_package").
                    declareParameters(new SqlParameter("order_name", Types.NVARCHAR),
                            new SqlParameter("order_executor_login", Types.NVARCHAR),
                            new SqlParameter("deliverypoint_name", Types.NVARCHAR),
                            new SqlParameter("get_order_price", Types.DECIMAL))
                    .withProcedureName("update_order_executor_deliverypoint");

            SqlParameterSource in = new MapSqlParameterSource()
                    .addValue("order_name", order.getOrderName())
                    .addValue("order_executor_login", order.getExecutorLogin())
                    .addValue("deliverypoint_name", order.getDeliveryAddress())
                    .addValue("get_order_price", order.getPrice());


            simpleJdbcCall.execute(in);
    }

    @Transactional
    public List getAnalysisBetweenTwoPointsInfo(String customerPointName) {
            SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                    .withSchemaName("ADMIN")
                    .withCatalogName("general_package").
                    declareParameters(new SqlParameter("customer_point_name", Types.NVARCHAR))
                    .withFunctionName("get_route_length_analysis")
                    .returningResultSet("route_length_analysis", new RouteRowMapper());

            SqlParameterSource in = new MapSqlParameterSource()
                    .addValue("customer_point_name", customerPointName);


            List route_analysis = simpleJdbcCall.executeFunction(List.class, in);
            return route_analysis;
    }

    public List getAllPointNames() {
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("ADMIN")
                .withCatalogName("admin_package")
                .withFunctionName("get_all_points_name")
                .returningResultSet("points", new PointRowMapper());


        List points = simpleJdbcCall.executeFunction(List.class);
        return points;
    }

    //обработчик добавлен
    public void addGood(String getName, String getDescription, BigDecimal getPrice) throws SQLException {
            SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                    .withSchemaName("ADMIN")
                    .withCatalogName("admin_package")
                    .declareParameters(new SqlParameter("good_name", Types.NVARCHAR),
                            new SqlParameter("good_description", Types.NVARCHAR),
                            new SqlParameter("good_price", Types.NUMERIC))
                    .withProcedureName("add_good");

            SqlParameterSource in = new MapSqlParameterSource()
                    .addValue("good_name", getName)
                    .addValue("good_description", getDescription)
                    .addValue("good_price", getPrice);

            simpleJdbcCall.execute(in);
    }

    @ExceptionHandler
    public void deleteGoodByName(String getName) {
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("ADMIN")
                .withCatalogName("admin_package")
                .declareParameters(new SqlParameter("good_name", Types.NVARCHAR))
                .withProcedureName("delete_good_by_name");

        SqlParameterSource in = new MapSqlParameterSource()
                .addValue("good_name", getName);

        simpleJdbcCall.execute(in);
    }

    public List getStaffByDeliveryPointName(String deliveryPointName) {
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("ADMIN")
                .withCatalogName("admin_package")
                .declareParameters(new SqlParameter("get_point_name", Types.NVARCHAR))
                .withFunctionName("get_executors_by_point_name")
                .returningResultSet("staff", new StaffRowMapper());

        SqlParameterSource in = new MapSqlParameterSource()
                .addValue("get_point_name", deliveryPointName);

        List staff = simpleJdbcCall.executeFunction(List.class, in);
        return staff;
    }

    public AdminInfo getAdminInfo(){
        SimpleJdbcCall getAdminInfo = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("ADMIN")
                .withCatalogName("admin_package")
                .withFunctionName("get_admin_info")
                .returningResultSet("admin_info", new AdminInfoRowMapper());
        AdminInfo adminInfo = (AdminInfo) getAdminInfo.executeFunction(List.class).get(0);

        return adminInfo;
    }

    public void deleteAllReviews(){
        SimpleJdbcCall delete = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("ADMIN")
                .withCatalogName("admin_package")
                .withProcedureName("delete_reviews");
        delete.execute();
    }

    public void deleteAllGoods() {
        SimpleJdbcCall delete = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("ADMIN")
                .withCatalogName("admin_package")
                .withProcedureName("delete_goods");
        delete.execute();
    }

    public void importGoods() {
        SimpleJdbcCall importGoods = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("ADMIN")
                .withCatalogName("admin_package")
                .withProcedureName("goods_import");
        importGoods.execute();
    }

    public void exportOrders() {
        SimpleJdbcCall importGoods = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("ADMIN")
                .withCatalogName("admin_package")
                .withProcedureName("orders_export");
        importGoods.execute();
    }

    public List getStaffInfo() {
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("ADMIN")
                .withCatalogName("admin_package")
                .withFunctionName("get_staff_info")
                .returningResultSet("staff", new StaffRowMapper());

        List staff = simpleJdbcCall.executeFunction(List.class);
        return staff;
    }

    public List findExecutedOrders() {
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("ADMIN")
                .withCatalogName("admin_package")
                .withFunctionName("get_executed_orders")
                .returningResultSet("orders", new OrderRowMapper());

        List res = simpleJdbcCall.executeFunction(List.class);
        return res;
    }

    public void loadRows() {
        SimpleJdbcCall importGoods = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("ADMIN")
                .withCatalogName("admin_package")
                .withProcedureName("load_rows");
        importGoods.execute();
    }
}
