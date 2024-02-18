package by.belstu.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.Calendar;

@Entity
@Table(name = "Orders")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne()
    private Tour tours ;

    @ColumnDefault("1")
    private int amountOfBoughtTickets;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Calendar orderDate;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Calendar tourDate;

    @OneToOne(fetch = FetchType.LAZY)
    private UserProfile customer ;
}
