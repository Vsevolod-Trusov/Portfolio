package by.belstu.spring.security;

import by.belstu.spring.dto.UserLoginDto;
import by.belstu.spring.entity.UserLogin;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class PersonDetailsImpl implements UserDetails {
    private final UserLoginDto userLogin;

    public PersonDetailsImpl(UserLoginDto userLogin) {
        this.userLogin = userLogin;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(userLogin.getRole()));
    }

    @Override
    public String getPassword() {
        return userLogin.getPassword();
    }

    @Override
    public String getUsername() {
        return userLogin.getLogin();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public UserLoginDto getUser() {
        return userLogin;
    }
}
