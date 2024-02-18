package by.belstu.spring.dto;

import by.belstu.spring.entity.Review;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TourDto {
    @NotNull(message="Tour name cannot be null")
    private String name;

    private Long id;

    private String description;

    private double price;

    @NotNull(message="Start date cannot be null")
    private Calendar startDate;
    @NotNull(message="End date cannot be null")
    private Calendar endDate;

    private int amountOfTickets;

}
