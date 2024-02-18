package by.belstu.spring.service;

import by.belstu.spring.dto.ReviewDto;
import by.belstu.spring.dto.TourDto;
import by.belstu.spring.entity.Review;
import by.belstu.spring.entity.Tour;
import by.belstu.spring.exception.NoMoreTicketsException;
import by.belstu.spring.exception.NoSuchTourException;
import by.belstu.spring.repository.ReviewsRepository;
import by.belstu.spring.repository.ToursRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ToursService {
    private final ToursRepository toursRepository;
    private final ReviewsRepository reviewRepository;
    private final ModelMapper modelMapper;
    @Autowired
    public ToursService(ToursRepository toursRepository, ReviewsRepository reviewRepository, ModelMapper modelMapper) {
        this.toursRepository = toursRepository;
        this.reviewRepository = reviewRepository;
        this.modelMapper = modelMapper;
    }

    @Transactional
    public List<TourDto> getAll() {
        List<TourDto> listTourDto = new ArrayList<>();
        List<Tour> listTours = toursRepository.findAll();
        for(int i =0; i<listTours.size(); i++ )
        {
            listTourDto.add(modelMapper.map( listTours.get(i), TourDto.class));
        }
        return listTourDto;
    }

    @Transactional
    public void addOrSaveTour(Tour tours) {
        toursRepository.save(tours);
    }

    @Transactional
    public Optional<Tour> getTourByName(String name) throws NoSuchTourException {
        if(toursRepository.findByName(name).isPresent())
            return toursRepository.findByName(name);
        throw new NoSuchTourException("Tour with this name doesn't exist");

    }


    @Transactional
    public Optional<Tour> getTourById(Long id) throws NoSuchTourException {
        if(toursRepository.findById(id).isPresent())
            return toursRepository.findById(id);
        throw new NoSuchTourException("Tour with this name doesn't exist");

    }

    @Transactional
    public void updateTour(Tour updatedTour) {
        toursRepository.save(updatedTour);
    }

    @Transactional
    public void deleteTourById(long id) {
        toursRepository.deleteById(id);
    }

    @Transactional
    public boolean isExist(long id) {
        return toursRepository.existsById(id);
    }
    @Transactional
    public void updateAmountOfTicketsOfTour(Tour updatedTour, int ticketsRemainder) throws NoMoreTicketsException {
        if(ticketsRemainder >= 0) {
            updatedTour.setAmountOfTickets(ticketsRemainder);
            toursRepository.save(updatedTour);
        }else
            throw new NoMoreTicketsException("Tour tickets have expired");
    }
}

