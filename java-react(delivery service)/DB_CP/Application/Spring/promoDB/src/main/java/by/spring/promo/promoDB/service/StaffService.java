package by.spring.promo.promoDB.service;

import by.spring.promo.promoDB.entity.Authorization;
import by.spring.promo.promoDB.entity.Review;
import by.spring.promo.promoDB.entity.StaffInfo;
import by.spring.promo.promoDB.exception.exceptions.SuchProfileLoginExistsException;
import by.spring.promo.promoDB.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.SQLException;
import java.util.List;

@Service
public class StaffService {
    private final StaffRepository staffRepository;

    @Autowired
    public StaffService(StaffRepository staffRepository) {
        this.staffRepository = staffRepository;
    }

    @Transactional
    public List<Review> findAllReviews() {
        return staffRepository.findAllReviews();
    }

    @Transactional
    public void updateOrderStatus(String getOrderName, String getStatus) throws SQLException {
        staffRepository.updateOrderStatus(getOrderName, getStatus);
    }

    public StaffInfo getSatffInfo(String staffLogin){
        return staffRepository.getStaffInfo(staffLogin);
    }

    @Transactional
    public List getOrdersByStaffLogin(String staffLogin) throws SQLException {
        return staffRepository.getOrdersByStaffLogin(staffLogin);
    }
}
