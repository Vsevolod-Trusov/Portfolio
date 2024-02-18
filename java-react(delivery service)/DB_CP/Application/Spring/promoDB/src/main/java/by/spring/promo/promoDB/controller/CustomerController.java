package by.spring.promo.promoDB.controller;

import by.spring.promo.promoDB.entity.*;
import by.spring.promo.promoDB.exception.DataNotFoundException;
import by.spring.promo.promoDB.exception.exceptions.SuchProfileLoginExistsException;
import by.spring.promo.promoDB.service.AdminService;
import by.spring.promo.promoDB.service.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*", maxAge = 3600)
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/reviews")
    public List<Review> getReviews(){
        return customerService.findAllReviews();
    }

    @GetMapping("/order/{orderName}")
    public ResponseEntity<String> updateOrderStatus(@PathVariable String orderName) throws SQLException {
        customerService.updateOrderStatus(orderName, "executed");
        return ResponseEntity.ok("Order "+orderName+" updated successfully");
    }

    @GetMapping("/info/{userLogin}")
    public ResponseEntity<CustomerInfo> getCustomerInfo(@PathVariable String userLogin){
        return ResponseEntity.ok(customerService.getCustomerInfo(userLogin));
    }

    @GetMapping("/routes/{userLogin}")
    public ResponseEntity<List> getRoutesByUserLogin(@PathVariable String userLogin){
        return ResponseEntity.ok(customerService.getRoutesByUserLogin(userLogin));
    }
    @PostMapping("/registration")
    public ResponseEntity<String> registration(@RequestBody UserLogin userLogin) throws SuchProfileLoginExistsException {
        customerService.registerUserNote(userLogin.getLogin(), userLogin.getPassword(),
                userLogin.getRole(), userLogin.getEmail(), userLogin.getPointName());
        return ResponseEntity.ok("User "+ userLogin.getLogin()+" registered");
    }

    @PostMapping("/authorization")
    public ResponseEntity<Authorization> authorization(@RequestBody UserLogin getAuthorization) throws SQLException {
        return ResponseEntity.ok(customerService.authorizationUserNote(getAuthorization.getLogin(),
                getAuthorization.getPassword()));
    }
    @PostMapping("/review")
    public ResponseEntity<String> addReview(@RequestBody Review getReview) throws DataNotFoundException, SQLException {
        customerService.addReview(getReview);
        return ResponseEntity.ok("Review added successfully");
    }

    @GetMapping("/goods/{startValue}/{interval}")
    public ResponseEntity<List> getGoods(@PathVariable int startValue, @PathVariable int interval) {
        return ResponseEntity.ok(customerService.findAllGoods(startValue, startValue+interval));
    }

    @GetMapping("/good/{goodName}")
    public ResponseEntity<Good> getGood(@PathVariable String goodName) throws DataNotFoundException {
        return ResponseEntity.ok(customerService.findGoodByName(goodName));
    }

    @GetMapping("/good/count")
    public ResponseEntity<BigDecimal> getGood() throws DataNotFoundException {
        return ResponseEntity.ok(customerService.getGoodsRowsCount());
    }

    @PostMapping("/order")
    public ResponseEntity<String> addOrder(@RequestBody Order getOrder) throws SQLException {
        String orderName = customerService.addOrder(getOrder);
        return ResponseEntity.ok("Order "+orderName+" added successfully");
    }

    @GetMapping("/history/{login}")
    public ResponseEntity<List> getHistory(@PathVariable String login) {
        return ResponseEntity.ok(customerService.getHistoryByLogin(login));
    }

    @DeleteMapping("/order/{orderName}")
    public ResponseEntity<String> deleteOrder(@PathVariable String orderName) {
        customerService.deleteOrderByName(orderName);
        return ResponseEntity.ok("Order with name: " + orderName + " deleted successfully");
    }

    @PostMapping("/orders/{customerLogin}")
    public ResponseEntity<List> getOrders(@PathVariable String customerLogin) {
        return ResponseEntity.ok(customerService.getNotExecutedOrdersByLogin(customerLogin));
    }

}
