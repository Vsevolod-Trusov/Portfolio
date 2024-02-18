package by.belstu.spring.service;

import by.belstu.spring.entity.UserLogin;
import by.belstu.spring.repository.UserLoginRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class UserLoginService {
    private final UserLoginRepository userLoginRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;

    @Autowired
    public UserLoginService(UserLoginRepository userLoginRepository, PasswordEncoder passwordEncoder, ModelMapper modelMapper){
        this.userLoginRepository = userLoginRepository;
        this.passwordEncoder = passwordEncoder;
        this.modelMapper = modelMapper;
    }

    @Transactional
    public List<UserLogin> findAll() {
        return userLoginRepository.findAll();
    }
    /*@Transactional
    public void addUserLogin(UserLogin userLogin){
        String password = userLogin.getPassword();
        userLogin.setPassword(passwordEncoder.encode(password));
        userLoginRepository.save(userLogin);
    }*/
    @Transactional
    public Optional<UserLogin> getUserLoginByLogin(String login) {
        return userLoginRepository.getUserLoginByLogin(login);
    }
    public List<UserLogin> getAll() {
        return userLoginRepository.findAll();
    }
}
