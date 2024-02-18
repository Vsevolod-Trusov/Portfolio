package by.belstu.spring.repository;

import by.belstu.spring.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {

    Optional<UserProfile> findUserProfileByUserLogin_Login(@Param("login")String login);
    Optional<UserProfile> findUserProfileById(@Param("id")long id);

    UserProfile findByActivationCode(String code);
}
