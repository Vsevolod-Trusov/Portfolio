package by.spring.promo.promoDB.service;

import by.spring.promo.promoDB.entity.*;
import by.spring.promo.promoDB.exception.DataNotFoundException;
import by.spring.promo.promoDB.exception.exceptions.SuchProfileLoginExistsException;
import by.spring.promo.promoDB.repository.CustomerRepository;
import by.spring.promo.promoDB.rowmapper.GoodRowMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Transactional
    public List<Review> findAllReviews() {
        return customerRepository.findAllReviews();
    }

    @Transactional
    public void updateOrderStatus(String getOrderName, String getStatus) throws SQLException {
        customerRepository.updateOrderStatus(getOrderName, getStatus);
    }
    @Transactional
    public void registerUserNote(String getLogin, String getPassword, String getRole, String getEmail,
                                 String getPointName) throws SuchProfileLoginExistsException {
        customerRepository.register(getLogin, getPassword, getRole, getEmail, getPointName);
    }

    @Transactional
    public Authorization authorizationUserNote(String getLogin, String getPassword) throws SQLException {
        return customerRepository.authorization(getLogin, getPassword);
    }
    @Transactional
    public void addReview(Review getReview) throws DataNotFoundException, SQLException {
        customerRepository.addReview(getReview);
    }

    @Transactional
    public Good findGoodByName(String getGoodId) throws DataNotFoundException {
        return customerRepository.findGoodByName(getGoodId);
    }

    @Transactional
    public List findAllGoods(int startValue, int endValue) {
        return customerRepository.findAllGoods(startValue, endValue);
    }

    @Transactional
    public String addOrder(Order getOrder) throws SQLException {
        return customerRepository.addOrder(getOrder);
    }
    @Transactional
    public List getHistoryByLogin(String login) {
        return customerRepository.getHistoryByLogin(login);
    }

    @Transactional
    public void deleteOrderByName(String orderName) {
        customerRepository.deleteOrderByName(orderName);
    }

    @Transactional
    public List getNotExecutedOrdersByLogin(String login) {
        return customerRepository.getNotExecutedOrdersByLogin(login);
    }

    public CustomerInfo getCustomerInfo(String login) {
        return customerRepository.getCustomerInfo(login);
    }

    public BigDecimal getGoodsRowsCount(){
        return customerRepository.getGoodsRowsCount();
    }

    public List getRoutesByUserLogin(String userLogin) {
        return customerRepository.getRoutesByUserLogin(userLogin);
    }
}
