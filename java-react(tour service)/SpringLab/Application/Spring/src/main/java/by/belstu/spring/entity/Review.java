package by.belstu.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "Reviews")
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString(exclude={"tours"})
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 300, nullable = false)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="tour_id", nullable=false)
    private Tour tours;

    @OneToOne(fetch = FetchType.LAZY)
    private UserProfile userProfile ;

}
