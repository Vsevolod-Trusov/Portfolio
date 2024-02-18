package by.spring.promo.promoDB.service;

import by.spring.promo.promoDB.entity.*;
import by.spring.promo.promoDB.exception.exceptions.SuchProfileLoginExistsException;
import by.spring.promo.promoDB.repository.AdminRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;

@Service
public class AdminService {
    private final AdminRepository adminRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public AdminService(AdminRepository adminRepository, ModelMapper modelMapper){
        this.adminRepository = adminRepository;
        this.modelMapper = modelMapper;
    }

    @Transactional
    public List<Review> findAllReviews() {
        return adminRepository.findAllReviews();
    }
    @Transactional
    public List findAllGoods(int startValue, int endValue) {
        return adminRepository.findAllGoods(startValue, endValue);
    }

    public BigDecimal getGoodsRowsCount(){
        return adminRepository.getGoodsRowsCount();
    }
    @Transactional
    public List<UserLogin> findAllPersonsByRole(String role) {
        return adminRepository.findAllPersonsByRole(role);
    }

    @Transactional
    public List findUnprocessedOrders(){
        return adminRepository.findUnprocessedOrders();
    }
    @Transactional
    public void updateOrderExecutorAndDeliveryPoint(Order order) throws SQLException { adminRepository.updateOrderSetExecutorAndDeliveryPoint(order);
    }

    @Transactional
    public List getRouteAnalysisBetweenTwoPoints(String getCustomerPointName){
        return adminRepository.getAnalysisBetweenTwoPointsInfo(getCustomerPointName);
    }

    @Transactional
    public List getAllPoitNames() {
        return adminRepository.getAllPointNames();
    }

    @Transactional
    public void addGood(String getName, String getDescription, BigDecimal getPrice ) throws SQLException {
        adminRepository.addGood(getName, getDescription, getPrice);
    }
    @Transactional
    public void deleteGoodByName(String getName) {
        adminRepository.deleteGoodByName(getName);
    }

    @Transactional
    public AdminInfo getAdminInfo() {
       return adminRepository.getAdminInfo();
    }

    @Transactional
    public void deleteAllReviews() {
        adminRepository.deleteAllReviews();
    }

    public List getStaffByDeliveryPointName(String deliveryPointName) {
        return adminRepository.getStaffByDeliveryPointName(deliveryPointName);
    }

    public void deleteAllGoods() {
        adminRepository.deleteAllGoods();
    }

    public void importGoods() {
        adminRepository.importGoods();
    }

    public void exportOrders() {
        adminRepository.exportOrders();
    }

    public List getStaffInfo() {
        return adminRepository.getStaffInfo();
    }
    @Transactional
    public List findExecutedOrders(){
        return adminRepository.findExecutedOrders();
    }

    public void loadRows() {
        adminRepository.loadRows();
    }
}