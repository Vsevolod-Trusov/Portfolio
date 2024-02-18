package by.belstu.spring.service;

import by.belstu.spring.entity.Order;
import by.belstu.spring.repository.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class OrdersService {
    private final OrdersRepository ordersRepository;

    @Autowired
    public OrdersService(OrdersRepository ordersRepository) {
        this.ordersRepository = ordersRepository;
    }

    @Transactional
    public List<Order> getAll() {
        return ordersRepository.findAll();
    }

    @Transactional
    public void addOrder(Order order) {
        ordersRepository.save(order);
    } //adding order

    @Transactional
    public void updateOrder(Order updatedOrder) {
        ordersRepository.save(updatedOrder);
    }

    @Transactional
    public void daleteOrderById(long id){
        ordersRepository.deleteById(id);
    }
}
