package by.belstu.spring.entity;

import by.belstu.spring.service.UserLoginService;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@Table(name = "UserProfile")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    UserLogin userLogin;

    @Column(length = 50)
    private String email;

    @ColumnDefault("false")
    private boolean activate;

    @Column
    private String activationCode;
}
