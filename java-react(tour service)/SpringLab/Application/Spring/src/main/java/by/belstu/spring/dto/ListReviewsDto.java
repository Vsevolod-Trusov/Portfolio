package by.belstu.spring.dto;

import by.belstu.spring.entity.Review;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ListReviewsDto {
    private List<ReviewDto> reviews;
}
