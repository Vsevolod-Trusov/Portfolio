package com.example.spring;

import by.belstu.spring.entity.*;
import by.belstu.spring.exception.NoMoreTicketsException;
import by.belstu.spring.exception.NoSuchTourException;
import by.belstu.spring.exception.NoSuchUserLoginException;
import by.belstu.spring.exception.NoSuchUserProfileException;
import by.belstu.spring.service.*;
import org.junit.jupiter.api.Test;

import static org.junit.Assert.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;
import java.util.GregorianCalendar;
import java.util.Optional;

@SpringBootTest(classes = {by.belstu.spring.Application.class})
class ServiceTests {
    @Autowired
    private UserLoginService userLoginService;
    @Autowired
    private ToursService toursService;

    @Autowired
    private ReviewsService reviewsService;

    @Autowired
    private OrdersService ordersService;
    @Autowired
    private UserProfileService userProfileService;

   /* @Test
    @Transactional
    void whenAddUserLoginReturnListOfUserLogins() {
        int listSize = userLoginService.getAll().size();

        UserLogin userLogin = new UserLogin();
        userLogin.setLogin("Vsevolod");
        userLogin.setRole("admin");
        userLogin.setPassword("Seva2002");

        //userProfileService.addUserProfile().(userLogin);

        assertEquals(userLoginService.getAll().size(), ++listSize);
    }*/

    @Test
    @Transactional
    void whenAddNewUserProfileThenReturnListOfUserProfile() throws NoSuchUserLoginException {
        int listSize = userProfileService.getAll().size();
        String email = "sev4kz@gmail.com";

        UserProfile userProfile = new UserProfile();

        userProfile.setUserLogin(userLoginService.getUserLoginByLogin("testUser").get());
        userProfile.setEmail(email);
        userProfileService.addUserProfile(userProfile);
        assertEquals(userProfileService.getAll().size(), ++listSize);
    }

    @Test
    @Transactional
    void whenGetUserLoginByLoginThenCatchNoSuchUserLoginException() {
        assertThrows(NoSuchUserLoginException.class, () -> userLoginService.getUserLoginByLogin("blabla").get());
    }

    @Test
    @Transactional
    void whenAddTourThenReturnListOfTours() {
        int listSize = toursService.getAll().size();

        Tour tours = new Tour();
        tours.setName("TestName");
        tours.setPrice(15.25);
        tours.setDescription("Very interesting tour");
        tours.setAmountOfTickets(1000);

        tours.setEndDate(new GregorianCalendar(2022, 10, 10, 5, 30, 10));
        tours.setStartDate(new GregorianCalendar(2022, 10, 15));

        toursService.addOrSaveTour(tours);
        assertEquals(toursService.getAll().size(), ++listSize);
    }

    @Test
    @Transactional
    void whenAddNewReviewThenReturnListOfReviews() throws NoSuchUserProfileException, NoSuchTourException {
        int listSize = reviewsService.getAll().size();
        Review review = new Review();
        review.setContent("Very very interesting");

        Optional<UserProfile> getOptionalProfile = userProfileService.getProfileByLogin("Vsevolod");

        UserProfile gotUserProfile = getOptionalProfile.get();

        review.setUserProfile(gotUserProfile);

        Optional<Tour> getOptionalTour = toursService.getTourByName("Belovesha");

        Tour gotTour = getOptionalTour.get();

        review.setTours(gotTour);

        reviewsService.addReview(review);
        assertEquals(reviewsService.getAll().size(), ++listSize);
    }

    @Test
    @Transactional
    void whenAddOrderThenReturnListOfOrders() throws NoSuchUserProfileException, NoSuchTourException {
        int listSize = ordersService.getAll().size();
        Order order = new Order();

        order.setOrderDate(new GregorianCalendar());
        order.setTourDate(new GregorianCalendar());
        order.setAmountOfBoughtTickets(5);

        order.setCustomer(userProfileService.getProfileByLogin("testUser").get());
        order.setTours(toursService.getTourByName("TestName").get());

        ordersService.addOrder(order);
        assertEquals(ordersService.getAll().size(), ++listSize);
    }

    @Test
    @Transactional
    void whenUpdateTicketsOfTourThenCatchNoMoreTicketsException() throws NoMoreTicketsException, NoSuchTourException {
        int amountOfBoughtTickets = 2000;
        Tour getTour = toursService.getTourByName("Belovesha").get();
        int ticketsAmountRemainder = getTour.getAmountOfTickets() - amountOfBoughtTickets;
        assertThrows(NoMoreTicketsException.class, ()->toursService.updateAmountOfTicketsOfTour(getTour, ticketsAmountRemainder));
    }
}
