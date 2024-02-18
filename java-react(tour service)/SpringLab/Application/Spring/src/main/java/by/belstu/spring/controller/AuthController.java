package by.belstu.spring.controller;

import by.belstu.spring.dto.AuthDto;
import by.belstu.spring.dto.UserLoginDto;
import by.belstu.spring.entity.UserLogin;
import by.belstu.spring.entity.UserProfile;
import by.belstu.spring.exception.NoSuchUserProfileException;
import by.belstu.spring.security.JwtUtil;
import by.belstu.spring.service.UserLoginService;
//import by.belstu.spring.validation.PersonValidator;
import by.belstu.spring.service.UserProfileService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Controller
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {
    //private final PersonValidator personValidator;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;
    private final UserLoginService userLoginService;
    private final UserProfileService userProfileService;
    private final JwtUtil jwtUtil;
    @Autowired
    public AuthController(/*PersonValidator personValidator,*/ ModelMapper modelMapper, PasswordEncoder passwordEncoder, UserLoginService userLoginService, UserProfileService userProfileService, JwtUtil jwtUtil) {
        /*this.personValidator = personValidator;*/
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
        this.userLoginService = userLoginService;
        this.userProfileService = userProfileService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/activate/{code}")
    public ResponseEntity<HashMap<String,String>> activate(@PathVariable String code) {

        boolean isActivated = userProfileService.activateUser(code);
        if (isActivated) {
            return new ResponseEntity<>(new HashMap<String,String>(){{put("message","User successfully activated");}}, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new HashMap<String,String>(){{put("message","Activation code is not found");}}, HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/registration")
    public ResponseEntity<Map<String,String>> performRegistration(@RequestBody UserLoginDto userLoginDto)   {

        userLoginDto.setPassword(passwordEncoder.encode(userLoginDto.getPassword()));
        Optional<UserProfile> getUserProfile = userProfileService.getProfileByLogin(userLoginDto.getLogin());
        if(getUserProfile.isPresent())
        {    Map<String,String> errorMap = new HashMap<>();
        errorMap.put("message","User with this login already exists");
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(errorMap);}

            userProfileService.addUserProfile(modelMapper.map(userLoginDto, UserProfile.class));
        Map<String,String> answerMap = new HashMap<>();
        answerMap.put("answer","User registrated successfully");
    return ResponseEntity.status(HttpStatus.OK)
                    .body(answerMap);
    }

    @PostMapping("/authorisation")
    public ResponseEntity<?> performAuthorisation(@RequestBody UserLoginDto userLoginDto/*, BindingResult bindingResult*/){

        Optional<UserLogin> getUserLogin = userLoginService.getUserLoginByLogin(userLoginDto.getLogin());
        Optional<UserProfile> getUserProfile = userProfileService.getProfileByLogin(userLoginDto.getLogin());
        Map<String,String> errorMap = new HashMap<>();
        if(getUserLogin.isPresent())
        {
            if(!getUserProfile.get().isActivate()){
                errorMap.put("message","Profile not activated. Check your email");
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(errorMap);
            }
            if(!passwordEncoder.matches(userLoginDto.getPassword(), getUserLogin.get().getPassword())){
                errorMap.put("message","Invalid login or password");
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(errorMap);
            }

            String token = jwtUtil.generateToken(userLoginDto.getLogin(), userLoginDto.getPassword(), userLoginDto.getEmail(), userLoginDto.getRole());

            return ResponseEntity.status(HttpStatus.OK)
                    .body(new AuthDto(token, getUserLogin.get().getRole()));
        }

        errorMap.put("message","User with this username doesn't exist");
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(errorMap);
    }
}
