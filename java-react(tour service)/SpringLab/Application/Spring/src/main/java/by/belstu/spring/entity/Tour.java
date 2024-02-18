package by.belstu.spring.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "Tours")
@Data
@ToString(exclude={"reviews"})
@AllArgsConstructor
@NoArgsConstructor
public class Tour {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="tour_id")
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String name;

    @Column(length = 300)
    private String description;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "tours", orphanRemoval = true )
    private List<Review> reviews =  new ArrayList<>();

    @Column(nullable = false)
    private double price;

    @Column(nullable = false)
    private Calendar startDate;

    @Column(nullable = false)
    private Calendar endDate;

    @ColumnDefault("5")
    private int amountOfTickets;
}
