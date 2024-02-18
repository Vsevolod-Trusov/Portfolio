package by.belstu.spring.security;

import by.belstu.spring.dto.UserLoginDto;
import by.belstu.spring.entity.UserLogin;
import by.belstu.spring.repository.UserLoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserLoginRepository userLoginRepository;

    @Autowired
    public UserDetailsServiceImpl(UserLoginRepository userRepository) {
        this.userLoginRepository = userRepository;
    }

    @Override
    public PersonDetailsImpl loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserLogin> user = userLoginRepository.getUserLoginByLogin(username);
        //Todo: добавить получение почты
        if (user.isEmpty()) {
            throw new UsernameNotFoundException("User not found");
        }
        String name = user.get().getLogin();
        String password = user.get().getPassword();
        String role = user.get().getRole();
        return new PersonDetailsImpl(new UserLoginDto(name, password,"test@mail.ru", role));
    }
}
