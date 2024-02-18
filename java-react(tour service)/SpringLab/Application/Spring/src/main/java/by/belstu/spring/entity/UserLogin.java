package by.belstu.spring.entity;


import lombok.*;
import org.hibernate.annotations.Check;

import javax.persistence.*;

@Entity
@Table(name = "UserLogin")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Check(constraints = "role IN ('ROLE_ADMIN', 'ROLE_USER')")
public class UserLogin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50, nullable = false, unique = true)
    private String login;

    @Column(nullable = false, length = 300)
    private String password;

    @Column(nullable = false)
    private String role;
}
