package by.spring.promo.promoDB.controller;

import by.spring.promo.promoDB.entity.Authorization;
import by.spring.promo.promoDB.entity.Review;
import by.spring.promo.promoDB.entity.StaffInfo;
import by.spring.promo.promoDB.entity.UserLogin;
import by.spring.promo.promoDB.exception.exceptions.SuchProfileLoginExistsException;
import by.spring.promo.promoDB.repository.StaffRepository;
import by.spring.promo.promoDB.service.AdminService;
import by.spring.promo.promoDB.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/staff")
@CrossOrigin(origins = "*", maxAge = 3600)
public class StaffController {

    private final StaffService staffService;

    @Autowired
    public StaffController(StaffService staffService, StaffRepository staffRepository) {
        this.staffService = staffService;
    }

    @GetMapping("/info/{staffLogin}")
    public ResponseEntity<StaffInfo> getStaffInfo(@PathVariable String staffLogin) throws SQLException {
        return ResponseEntity.ok(staffService.getSatffInfo(staffLogin));
    }

    @GetMapping("/reviews")
    public List<Review> getReviews(){
        return staffService.findAllReviews();
    }

    @GetMapping("/order/{orderName}")
    public ResponseEntity<String> updateOrderStatus(@PathVariable String orderName) throws SQLException {
        staffService.updateOrderStatus(orderName, "executed");
        return ResponseEntity.ok("Order "+orderName+" updated successfully");
    }

    @GetMapping("/orders/{staffLogin}")
    public ResponseEntity<List> getOrdersByStaffLogin(@PathVariable String staffLogin) throws SQLException {
        return ResponseEntity.ok(staffService.getOrdersByStaffLogin(staffLogin));
    }

}
