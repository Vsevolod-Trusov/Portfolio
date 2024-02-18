package by.belstu.spring.configuration;

//import by.belstu.spring.service.PersonDetailsService;

import by.belstu.spring.security.JwtFilter;
import by.belstu.spring.security.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Configuration
public class WebSecurityConfig {

    private final JwtFilter jwtFilter;
    private final UserDetailsServiceImpl userDetailsService;

    @Autowired
    public WebSecurityConfig(JwtFilter jwtFilter, UserDetailsServiceImpl userDetailsService) {
        this.jwtFilter = jwtFilter;
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(getPasswordEncoder());
        AuthenticationManager authenticationManager = authenticationManagerBuilder.build();

        return
                http.
                        cors().and().
                        csrf().disable().
                        authorizeRequests().
                        antMatchers("/api/auth/**").permitAll().
                        antMatchers("/api/admin/**").hasRole("ADMIN").
                        antMatchers(HttpMethod.DELETE, "/api/admin/tour").hasRole("ADMIN").
                        antMatchers("/api/user/**").hasAnyRole("USER", "ADMIN").
                        antMatchers("/api-docs/**",
                                "/configuration/ui",
                                "/swagger-resources/**",
                                "/configuration/security",
                                "/swagger-ui/**",
                                "/webjars/**")
                        .permitAll().
                        anyRequest().hasAnyRole("USER", "ADMIN").
                        and().
                        addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class).
                        authenticationManager(authenticationManager).
                        sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).
                        and().
                        build();
    }
}
