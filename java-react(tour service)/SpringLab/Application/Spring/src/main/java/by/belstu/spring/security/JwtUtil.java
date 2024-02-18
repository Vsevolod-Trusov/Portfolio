package by.belstu.spring.security;


import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;
import java.util.Date;
import java.util.logging.Logger;

@Component
@NoArgsConstructor
@AllArgsConstructor
public class JwtUtil {

    private static Logger log =Logger.getLogger(JwtUtil.class.getName());

    private String secret = "@sev4kz";

    public String generateToken(String name, String password, String email, String role){
        Date expirationDate = Date.from(ZonedDateTime.now().plusMinutes(60).toInstant());

        return JWT.create()
                .withSubject("User details")
                .withClaim("name", name)
                .withClaim("password", password)
                .withClaim("email", email)
                .withClaim("role", role)
                .withIssuedAt(new Date())
                .withIssuer("spring")
                .withExpiresAt(expirationDate)
                .sign(Algorithm.HMAC256(secret));
    }

    public DecodedJWT validateToken(String token) throws JWTVerificationException {
            JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC256(secret))
                    .withSubject("User details")
                    .withIssuer("spring")
                    .build();
            return jwtVerifier.verify(token);
    }

    public String getRetrieveClaim(String  token) throws JWTVerificationException  {
                DecodedJWT decodedJWT = validateToken(token);
        return  decodedJWT.getClaim("name").asString();
    }
}
