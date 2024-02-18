package by.belstu.spring.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserLoginDto {
    @NotNull
    private String login;
    @NotNull
    private String password;
    @NotNull
    private String email;
    @NotNull
    private String role;

    public boolean isAdmin() {
        return role.equals("ROLE_ADMIN");
    }
}
