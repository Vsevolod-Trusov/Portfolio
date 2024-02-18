package by.spring.promo.promoDB.json.classes;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Road {
    private String roadName;
    private List<Node> nodesCooordinates;
}
