package by.belstu.spring.controller;

import by.belstu.spring.dto.*;
import by.belstu.spring.entity.*;
import by.belstu.spring.exception.NoMoreTicketsException;
import by.belstu.spring.exception.NoSuchTourException;
import by.belstu.spring.exception.NoSuchUserProfileException;
import by.belstu.spring.security.JwtUtil;
import by.belstu.spring.security.PersonDetailsImpl;
import by.belstu.spring.service.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserController {
    private final Logger log = Logger.getLogger(UserController.class.getName());
    private final JwtUtil jwtUtil;
    private final UserLoginService userLoginService;

    private final ToursService toursService;
    private final UserProfileService userProfileService;

    private final ReviewsService reviewsService;
    private final OrdersService ordersService;
    private final ModelMapper modelMapper;
    @Autowired
    public UserController(JwtUtil jwtUtil, UserLoginService userLoginService, UserProfileService userProfileService, ToursService toursService, ReviewsService reviewService, OrdersService ordersService, ModelMapper modelMapper) {
        this.jwtUtil = jwtUtil;
        this.userLoginService = userLoginService;
        this.userProfileService = userProfileService;
        this.toursService = toursService;
        this.reviewsService = reviewService;
        this.ordersService = ordersService;
        this.modelMapper = modelMapper;
    }

    @Operation(summary = "Gets all users", tags = "user")
    @ApiResponse(
            responseCode = "200",
            description = "Found the users",
            content = {
                    @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = ArrayList.class)))
            })
    @GetMapping("/users")
    public List<UserLogin> getUsers(){
        return userLoginService.findAll();
    }
    @GetMapping("/tour/{tourName}")
    public ResponseEntity<TourDto> getTour(@PathVariable String tourName) throws NoSuchTourException {
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(modelMapper.map(toursService.getTourByName(tourName), TourDto.class));
    }

    @GetMapping("/tours")
    public ResponseEntity<ListToursDto> getTours(){
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(new ListToursDto(toursService.getAll()));}

    @GetMapping("/profiles")
    public List<UserProfile> getUserProfiles(){
        return userProfileService.getAll();
    }

    @GetMapping("/orders")
    public List<Order> getOrders(){return ordersService.getAll();}

    @GetMapping("/reviews/{name}")
    public ResponseEntity<ListReviewsDto> getReviews(@PathVariable String name) throws NoSuchTourException {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ListReviewsDto(reviewsService.getReviewsByName(name)));}

    //user url requests
    //TODO: возврат читаемого exception пользователю
    @PostMapping("/reviews")
    public ResponseEntity<String> addReview(@RequestHeader("Authorization") String requestHeader,
                                            @Valid @RequestBody ReviewDto reviewDto) throws NoSuchUserProfileException, NoSuchTourException {

        String token = requestHeader.substring(7);
        String username = jwtUtil.getRetrieveClaim(token);

        Review gotReview = modelMapper.map(reviewDto, Review.class);
        UserProfile getUserProfile = userProfileService.getProfileByLogin(username).get();
        gotReview.setUserProfile(getUserProfile);
        Optional<Tour> tour = toursService.getTourByName(reviewDto.getTour());
        if(tour.get().getReviews() == null)
            tour.get().setReviews(new ArrayList<>());
        tour.get().getReviews().add(gotReview);
        gotReview.setTours(tour.get());

        reviewsService.addReview(gotReview);
        return ResponseEntity.ok("Review added successfully");
    }

    //с фронта добавление происходит
    @PostMapping("/orders")
    @ExceptionHandler
    public ResponseEntity<String>   addOrder(@RequestHeader("Authorization") String requestHeader,
                                           @Valid @RequestBody OrderDto receivedOrderDto) throws NoSuchUserProfileException, NoSuchTourException, NoMoreTicketsException {

        String token = requestHeader.substring(7);
        String username = jwtUtil.getRetrieveClaim(token);
        Order mappedOrder = modelMapper.map(receivedOrderDto, Order.class);
        UserProfile getUserProfile = userProfileService.getProfileByLogin(username).get();
        Tour getTour = toursService.getTourByName(receivedOrderDto.getTourName()).get();

        int ticketsAmountRemainder = getTour.getAmountOfTickets() - receivedOrderDto.getAmountOfBoughtTickets();
            toursService.updateAmountOfTicketsOfTour(getTour,ticketsAmountRemainder);

        mappedOrder.setCustomer(getUserProfile);
        mappedOrder.setTours(getTour);

        ordersService.addOrder(mappedOrder);
        return ResponseEntity.ok("Order added successfully");
    }


}
