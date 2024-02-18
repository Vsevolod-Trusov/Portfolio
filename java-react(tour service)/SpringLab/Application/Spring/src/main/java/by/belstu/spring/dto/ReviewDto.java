package by.belstu.spring.dto;

import by.belstu.spring.entity.Tour;
import by.belstu.spring.entity.UserProfile;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDto {
    @NotNull(message="Content don't be null")
    private String content;

    @NotNull(message="TourName don't be null")
    private String tour;

    private String userProfile;
}
