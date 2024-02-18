package by.belstu.spring.service;

import by.belstu.spring.dto.ReviewDto;
import by.belstu.spring.entity.Review;
import by.belstu.spring.exception.NoSuchTourException;
import by.belstu.spring.repository.ReviewsRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReviewsService {
    private final ReviewsRepository reviewsRepository;
    private final ToursService toursService;
    private final ModelMapper modelMapper;

    @Autowired
    public ReviewsService(ReviewsRepository reviewsRepository, ToursService toursService, ModelMapper modelMapper) {
        this.reviewsRepository = reviewsRepository;
        this.toursService = toursService;
        this.modelMapper = modelMapper;
    }

    @Transactional
    public List<Review> getAll() {
        return reviewsRepository.findAll();
    }

    @Transactional
    public List<ReviewDto> getReviewsByName(String name) throws NoSuchTourException {
        List<Review> listReview = toursService.getTourByName(name).get().getReviews();
        List<ReviewDto> listReviewDto = new ArrayList<>();
        for(Review review : listReview)
        {
            ReviewDto reviewDto =modelMapper.map(review, ReviewDto.class);
            reviewDto.setTour(review.getTours().getName());
            reviewDto.setUserProfile(review.getUserProfile().getUserLogin().getLogin());
            listReviewDto.add(reviewDto);

        }
        return listReviewDto;
    }
    @Transactional
    public void addReview(Review review) {
        reviewsRepository.save(review);
    }

    @Transactional
    public void updateReview(Review updatedReview) {
        reviewsRepository.save(updatedReview);
    }

    @Transactional
    public void deleteReviewById(long id){
        reviewsRepository.deleteById(id);
    }

}
