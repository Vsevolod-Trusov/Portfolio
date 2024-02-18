package by.belstu.spring.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.Calendar;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDto {
    @NotNull(message="Tour name cannot be null")
    private String tourName;

    private int amountOfBoughtTickets;
    @NotNull(message="Order date cannot be null")
    private Calendar orderDate;

    @NotNull(message="Tour date cannot be null")
    private Calendar tourDate;
}
