package by.belstu.spring.service;

import by.belstu.spring.entity.UserProfile;
import by.belstu.spring.exception.NoSuchUserProfileException;
import by.belstu.spring.repository.UserLoginRepository;
import by.belstu.spring.repository.UserProfileRepository;
import by.belstu.spring.service.mail.MailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserProfileService {
    private final UserLoginRepository userLoginRepository;
    private final UserProfileRepository userProfileRepository;

    private final MailSender mailSender;

    @Autowired
    public UserProfileService(UserLoginRepository userLoginRepository, UserProfileRepository userProfileRepository, MailSender mailSender) {
        this.userLoginRepository = userLoginRepository;
        this.userProfileRepository = userProfileRepository;
        this.mailSender = mailSender;
    }
    @Transactional
    public void addUserProfile(UserProfile userProfile) {
        userProfile.setActivate(false);
        userProfile.setActivationCode(UUID.randomUUID().toString());
        userProfileRepository.save(userProfile);

        String message = String.format(
                "Hello, %s! \n" +
                        "Welcome to Tour Service. Please, your profile will be activate after" +
                        " visit next link: http://localhost:3000/activate/%s",
                userProfile.getUserLogin().getLogin(),
                userProfile.getActivationCode());
        mailSender.send(userProfile.getEmail(), "Activation code", message);
    }
    @Transactional
    public List<UserProfile> getAll(){
        return userProfileRepository.findAll();
    }
    @Transactional
    public Optional<UserProfile> getProfileByLogin(String username) {
            return userProfileRepository.findUserProfileByUserLogin_Login(username);
    }
    @Transactional
    public Optional<UserProfile> getProfileById(long id) throws NoSuchUserProfileException {
        if(userProfileRepository.findUserProfileById(id).isPresent())
            return userProfileRepository.findUserProfileById(id);
        throw new NoSuchUserProfileException("Profile with this id doesn't exist");
    }
    @Transactional
    public void updateUserProfile(UserProfile updatedUserProfile) {
        userProfileRepository.save(updatedUserProfile);
    }
    @Transactional
    public void deleteUserProfileById(long id) {
        userProfileRepository.deleteById(id);
    }

    public boolean activateUser(String code) {
        UserProfile user = userProfileRepository.findByActivationCode(code);

        if (user == null) {
            return false;
        }

        user.setActivationCode(null);
        user.setActivate(true);

        userProfileRepository.save(user);

        return true;
    }
}
