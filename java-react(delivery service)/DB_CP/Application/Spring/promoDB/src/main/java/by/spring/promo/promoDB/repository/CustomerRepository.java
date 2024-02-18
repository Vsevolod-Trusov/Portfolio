package by.spring.promo.promoDB.repository;

import by.spring.promo.promoDB.entity.*;
import by.spring.promo.promoDB.exception.DataNotFoundException;
import by.spring.promo.promoDB.exception.exceptions.SuchProfileLoginExistsException;
import by.spring.promo.promoDB.rowmapper.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.SqlReturnType;
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

@Repository
public class CustomerRepository {
    @Autowired
    @Qualifier("customerJdbcTemplate")
    private final JdbcTemplate customerJdbcTemplate;

    public CustomerRepository(JdbcTemplate customerJdbcTemplate) {
        this.customerJdbcTemplate = customerJdbcTemplate;
    }


    //in general
    @Transactional
    public List findAllReviews(){
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(customerJdbcTemplate)
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
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(customerJdbcTemplate)
                .withSchemaName("ADMIN")
                .withCatalogName("general_package")//поменять пакет
                .declareParameters(new SqlParameter("order_name", Types.NVARCHAR),
                        new SqlParameter("get_status", Types.NVARCHAR))
                .withProcedureName("change_order_status_by_name");
        SqlParameterSource in = new MapSqlParameterSource().addValue("order_name", orderName)
                .addValue("get_status", status);
        simpleJdbcCall.execute(in);
    }
    //in general
    @Transactional
    public void register(String getLogin, String getPassword, String getRole, String getEmail,
                         String getPointName) throws SuchProfileLoginExistsException {
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(customerJdbcTemplate)
                .withSchemaName("ADMIN")
                .withCatalogName("user_package")
                .declareParameters(new SqlParameter("get_login", Types.NVARCHAR),
                        new SqlParameter("get_userpoint_name", Types.NVARCHAR),
                        new SqlParameter("password", Types.NVARCHAR),
                        new SqlParameter("get_role", Types.NVARCHAR),
                        new SqlParameter("get_email", Types.NVARCHAR))
                .withProcedureName("register_user");

        SqlParameterSource in = new MapSqlParameterSource()
                .addValue("get_login", getLogin)
                .addValue("get_userpoint_name", getPointName)
                .addValue("password", getPassword)
                .addValue("get_role", getRole)
                .addValue("get_email", getEmail);

        simpleJdbcCall.execute(in);
    }

    //in general
    @Transactional
    public Authorization authorization(String getLogin, String getPassword) throws SQLException {
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(customerJdbcTemplate)
                .withSchemaName("ADMIN")
                .withCatalogName("user_package")
                .declareParameters(new SqlParameter("get_login", Types.NVARCHAR),
                        new SqlParameter("get_password", Types.NVARCHAR))
                .withFunctionName("authorization")
                .returningResultSet("result", new AuthorizationRowMapper());

        SqlParameterSource in = new MapSqlParameterSource()
                .addValue("get_login", getLogin)
                .addValue("get_password", getPassword);

        List userLogin = simpleJdbcCall.executeFunction(List.class, in);
        Authorization authorization = (Authorization) userLogin.get(0);
        return authorization;
    }

    //обработчик добавлен
    public void addReview(Review getReview) throws DataNotFoundException, SQLException {
        SimpleJdbcCall insertReview = new SimpleJdbcCall(customerJdbcTemplate)
                .withSchemaName("ADMIN")
                .withCatalogName("user_package")
                .declareParameters(new SqlParameter("get_content", Types.NVARCHAR),
                        new SqlParameter("get_estimation", Types.INTEGER),
                        new SqlParameter("get_login", Types.NVARCHAR))
                .withProcedureName("add_review");
        SqlParameterSource in = new MapSqlParameterSource()
                .addValue("get_content", getReview.getContent())
                .addValue("get_estimation", getReview.getEstimation())
                .addValue("get_login", getReview.getReviewerLogin());
        ;
        insertReview.execute(in);
    }

    //in general
    public List findAllGoods(int startValue, int endValue) {
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(customerJdbcTemplate)
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

    public Good findGoodByName(String getGoodName) throws DataNotFoundException {
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(customerJdbcTemplate)
                .withSchemaName("ADMIN")
                .withCatalogName("user_package")
                .withFunctionName("get_good_by_name")
                .declareParameters(new SqlParameter("good_name", Types.NVARCHAR))
                .returningResultSet("goods", new GoodRowMapper());
        SqlParameterSource in = new MapSqlParameterSource().addValue("good_name", getGoodName);
        List goods = simpleJdbcCall.executeFunction(List.class, in);

        return (Good) goods.get(0);
    }

    public void insertIntoGoodsToOrder(String orderName, List<String> itemsNamesList ) {
        SimpleJdbcCall insertGoodsToOrder = new SimpleJdbcCall(customerJdbcTemplate)
                .withSchemaName("ADMIN")
                .withCatalogName("user_package")
                .withProcedureName("add_good_to_order")
                .declareParameters(new SqlParameter("order_name", Types.NVARCHAR),
                        new SqlParameter("good_name", Types.NVARCHAR));
        for (int i = 1; i < itemsNamesList.size(); i++) {
            SqlParameterSource inParameters = new MapSqlParameterSource()
                    .addValue("order_name", orderName)
                    .addValue("good_name", itemsNamesList.get(i));
            insertGoodsToOrder.execute(inParameters);
        }
    }

    //обработчик добавлен
    public String addOrder(Order getOrder) throws SQLException {
        List<String> itemsList = List.of(getOrder.getGoodName().split(", ")).stream().toList();

        SimpleJdbcCall insertOrder = new SimpleJdbcCall(customerJdbcTemplate)
                .withSchemaName("ADMIN")
                .withCatalogName("user_package")
                .withFunctionName("add_order")
                .declareParameters(new SqlParameter("customer_login", Types.NVARCHAR),
                        new SqlParameter("good_name", Types.NVARCHAR),
                        new SqlParameter("get_data_order", Types.DATE),
                        new SqlParameter("get_delivery_date", Types.DATE),
                        new SqlParameter("get_delivery_type", Types.NVARCHAR),
                        new SqlParameter("get_order_price", Types.DECIMAL),
                        new SqlParameter("get_delivery_point_pickup", Types.NVARCHAR));
        SqlParameterSource in = new MapSqlParameterSource().addValue("customer_login", getOrder.getCustomerLogin())
                .addValue("good_name", itemsList.get(0))
                .addValue("get_data_order", getOrder.getOrderDate())
                .addValue("get_delivery_date", getOrder.getDeliveryDate())
                .addValue("get_delivery_type", getOrder.getDeliveryType())
                .addValue("get_order_price", getOrder.getPrice())
                .addValue("get_delivery_point_pickup", getOrder.getDeliveryAddress());
        String order = insertOrder.executeFunction(String.class, in);

        if(itemsList.size() > 1){
            insertIntoGoodsToOrder(order, itemsList);
        }

        return order;

    }

    public List getNotExecutedOrdersByLogin(String getLogin) {
        SimpleJdbcCall getOrders = new SimpleJdbcCall(customerJdbcTemplate)
                .withSchemaName("ADMIN")
                .withCatalogName("user_package")
                .withFunctionName("get_orders_not_executed_by_login")
                .declareParameters(new SqlParameter("user_login", Types.NVARCHAR))
                .returningResultSet("orders", new OrderRowMapper());
        SqlParameterSource in = new MapSqlParameterSource().addValue("user_login", getLogin);
        List ordersList = getOrders.executeFunction(List.class, in);
        return ordersList;
    }

    public List getHistoryByLogin(String getLogin) {
        SimpleJdbcCall getHistory = new SimpleJdbcCall(customerJdbcTemplate)
                .withSchemaName("ADMIN")
                .withCatalogName("user_package")
                .withFunctionName("get_history_by_login")
                .declareParameters(new SqlParameter("customer_login", Types.NVARCHAR))
                .returningResultSet("history", new HistoryRowMapper());
        SqlParameterSource in = new MapSqlParameterSource().addValue("customer_login", getLogin);
        List historyList = getHistory.executeFunction(List.class, in);
        return historyList;
    }

    public void deleteOrderByName(String orderName) {
        SimpleJdbcCall deleteOrder = new SimpleJdbcCall(customerJdbcTemplate)
                .withSchemaName("ADMIN")
                .withCatalogName("user_package")
                .declareParameters(new SqlParameter("order_name", Types.NVARCHAR))
                .withProcedureName("delete_order_by_name");
        SqlParameterSource in = new MapSqlParameterSource().addValue("order_name", orderName);
        deleteOrder.execute(in);
    }


    public List getRoutesByUserLogin(String userLogin) {
        SimpleJdbcCall getRoutes = new SimpleJdbcCall(customerJdbcTemplate)
                .withSchemaName("ADMIN")
                .withCatalogName("user_package")
                .withFunctionName("get_routes_by_user_login")
                .declareParameters(new SqlParameter("user_login", Types.NVARCHAR))
                .returningResultSet("routes", new RouteRowMapper());
        SqlParameterSource in = new MapSqlParameterSource().addValue("user_login", userLogin);
        List routesList = getRoutes.executeFunction(List.class, in);
        return routesList;
    }

    //in general
    public BigDecimal getGoodsRowsCount(){
        SimpleJdbcCall getRoutes = new SimpleJdbcCall(customerJdbcTemplate)
                .withSchemaName("ADMIN")
                .withCatalogName("general_package")
                .withFunctionName("count_rows_of_goods");
       BigDecimal count = getRoutes.executeFunction(BigDecimal.class);
        return count;
    }

    public CustomerInfo getCustomerInfo(String customerLogin){
        SimpleJdbcCall getCustomerInfo = new SimpleJdbcCall(customerJdbcTemplate)
                .withSchemaName("ADMIN")
                .withCatalogName("user_package")
                .declareParameters(new SqlParameter("user_login", Types.NVARCHAR))
                .withFunctionName("get_customer_info")
                .returningResultSet("customer_info", new CustomerInfoRowMapper());
        SqlParameterSource in = new MapSqlParameterSource().addValue("user_login", customerLogin);

        CustomerInfo customerInfo = (CustomerInfo) getCustomerInfo.executeFunction(List.class,in).get(0);

        return customerInfo;
    }
}
