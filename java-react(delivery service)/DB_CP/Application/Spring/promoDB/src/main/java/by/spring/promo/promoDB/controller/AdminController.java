package by.spring.promo.promoDB.controller;

import by.spring.promo.promoDB.entity.*;
import by.spring.promo.promoDB.exception.DataNotFoundException;
import by.spring.promo.promoDB.exception.exceptions.SuchProfileLoginExistsException;
import by.spring.promo.promoDB.service.AdminService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AdminController {
    private final Logger log = Logger.getLogger(CustomerController.class.getName());
    private final AdminService adminService;
    private final ModelMapper modelMapper;

    public AdminController(AdminService adminService, ModelMapper modelMapper) {
        this.adminService = adminService;
        this.modelMapper = modelMapper;
    }


    @GetMapping("/load")
    public ResponseEntity<String> loadRows() {
        adminService.loadRows();
        return ResponseEntity.ok("Rows loaded successfully");
    }
    @GetMapping("/executed")
    public ResponseEntity<List> getExecutedOrders() {
        return ResponseEntity.ok(adminService.findExecutedOrders());
    }
    @GetMapping("/staff")
    public ResponseEntity<List> getStaffInfo() {
        return ResponseEntity.ok(adminService.getStaffInfo());
    }
    @GetMapping("/export")
    public ResponseEntity<String> exportOrders() {
        adminService.exportOrders();
        return ResponseEntity.ok("Orders exported successfully");
    }

    @GetMapping("/reviews")
    public List<Review> getReviews() {
        return adminService.findAllReviews();
    }

    @PostMapping("/import")
    public ResponseEntity<String> importGoods() {
        adminService.importGoods();
        return ResponseEntity.ok("Goods imported successfully");
    }

    @DeleteMapping("/goods")
    public ResponseEntity<String> deleteAllGoods() {
        adminService.deleteAllGoods();
        return ResponseEntity.ok("All goods deleted");
    }


    @GetMapping("/good/count")
    public ResponseEntity<BigDecimal> getGood() throws DataNotFoundException {
        return ResponseEntity.ok(adminService.getGoodsRowsCount());
    }

    @GetMapping("/goods/{startValue}/{interval}")
    public ResponseEntity<List> getGoods(@PathVariable int startValue, @PathVariable int interval) {
        return ResponseEntity.ok(adminService.findAllGoods(startValue, startValue + interval));
    }



    @GetMapping("/info")
    public ResponseEntity<AdminInfo> getAdminInfo() {
        return ResponseEntity.ok(adminService.getAdminInfo());
    }

    @DeleteMapping("/reviews")
    public ResponseEntity<?> deleteAllReviews() {
        adminService.deleteAllReviews();
        return ResponseEntity.ok("All reviews deleted");
    }

    @GetMapping("/staff/{deliveryPointName}")
    public ResponseEntity<List> getStaffByDeliveryPointName(@PathVariable String deliveryPointName) {
        return ResponseEntity.ok(adminService.getStaffByDeliveryPointName(deliveryPointName));
    }

    @PostMapping("/good")
    public ResponseEntity<String> addGood(@RequestBody Good getGood) throws SQLException {
        adminService.addGood(getGood.getName(), getGood.getDescription(), getGood.getPrice());
        return ResponseEntity.ok("Good " + getGood.getName() + " added successfully");
    }

    @DeleteMapping("/good/{goodName}")
    public ResponseEntity<String> deleteGood(@PathVariable String goodName) {
        try {
            adminService.deleteGoodByName(goodName);
            return ResponseEntity.ok("Good " + goodName + " deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/points")
    public ResponseEntity<List> getAllPointNames() {
        return ResponseEntity.ok(adminService.getAllPoitNames());
    }

    @GetMapping("/users")
    public List<UserLogin> getUsers() {
        return adminService.findAllPersonsByRole("user");
    }


    @GetMapping("/orders")
    public ResponseEntity<List> getUnprocessedOrders() {
        return ResponseEntity.ok(adminService.findUnprocessedOrders());
    }

    @PostMapping("/order")
    public ResponseEntity<String> updateOrderExecutorAndDeliveryPoint(@RequestBody Order getOrder) throws SQLException {
        adminService.updateOrderExecutorAndDeliveryPoint(getOrder);
        return ResponseEntity.ok("Order " + getOrder.getOrderName() + " updated successfully");
    }

    @GetMapping("/route/{customerPointName}")
    public ResponseEntity<List> getRouteAnalysisBetweenTwoPoints(@PathVariable String customerPointName) {
        return ResponseEntity.ok(adminService.getRouteAnalysisBetweenTwoPoints(customerPointName));
    }


}
