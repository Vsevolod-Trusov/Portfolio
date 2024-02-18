package by.belstu.spring.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import javax.annotation.Resource;
import java.util.Properties;

@Configuration
public class MailConfiguration {
    @Resource
    Environment enviroment;

    @Bean
    public JavaMailSender getMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();

        mailSender.setHost(enviroment.getRequiredProperty("spring.mail.host"));
        mailSender.setPort(Integer.parseInt(enviroment.getRequiredProperty("spring.mail.port")));
        mailSender.setUsername(enviroment.getRequiredProperty("spring.mail.username"));
        mailSender.setPassword(enviroment.getRequiredProperty("spring.mail.password"));

        Properties properties = mailSender.getJavaMailProperties();

        properties.setProperty("mail.transport.protocol", enviroment.getRequiredProperty("spring.mail.protocol"));
        properties.setProperty("mail.debug", enviroment.getRequiredProperty("mail.debug"));

        return mailSender;
    }
}
