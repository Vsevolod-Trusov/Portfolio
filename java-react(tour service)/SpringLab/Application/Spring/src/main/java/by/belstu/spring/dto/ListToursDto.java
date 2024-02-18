package by.belstu.spring.dto;

import by.belstu.spring.entity.Tour;
import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString(exclude = {"tours"})
public class ListToursDto {
    private List<TourDto> tours;
}
