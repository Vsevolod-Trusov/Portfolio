package by.belstu.spring.controller;

import by.belstu.spring.dto.TourDto;
import by.belstu.spring.entity.Tour;
import by.belstu.spring.exception.NoSuchTourException;
import by.belstu.spring.service.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AdminController {
    private final Logger log = Logger.getLogger(UserController.class.getName());
    private final UserLoginService userLoginService;

    private final ToursService toursService;
    private final UserProfileService userProfileService;

    private final ReviewsService reviewsService;
    private final OrdersService ordersService;
    private final ModelMapper modelMapper;
    @Autowired
    public AdminController(UserLoginService userLoginService, ToursService toursService, UserProfileService userProfileService, ReviewsService reviewsService, OrdersService ordersService, ModelMapper modelMapper) {
        this.userLoginService = userLoginService;
        this.toursService = toursService;
        this.userProfileService = userProfileService;
        this.reviewsService = reviewsService;
        this.ordersService = ordersService;
        this.modelMapper = modelMapper;
    }

    @DeleteMapping("/tour/{id}")
    ResponseEntity<String> deleteTour(@PathVariable Long id) throws NoSuchTourException {
        if(!toursService.isExist(id)){
            throw new NoSuchTourException("Tour doesn't exist");
        }
        toursService.deleteTourById(id);
        return ResponseEntity.ok("Tour with id "+id+" has been deleted success.");
    }
    @PostMapping("/tours")
    public ResponseEntity<String> addTour(@Valid @RequestBody TourDto receivedTourDto){
        Tour mappedTour = modelMapper.map(receivedTourDto, Tour.class);
        toursService.addOrSaveTour(mappedTour);
        return ResponseEntity.ok("Tour added successfully");
    }
}
