package by.spring.promo.promoDB.configuration;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.annotation.Resource;
import javax.sql.DataSource;

@Configuration
/*@EnableTransactionManagement*/
public class DataSourceConfiguration {
    @Resource
    Environment enviroment;

    @Bean
    public DataSource adminDataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(
                enviroment.getRequiredProperty("spring.datasource.driver-class-name"));
        dataSource.setUrl(enviroment.getRequiredProperty("spring.datasource.admin.url"));
        dataSource.setUsername(enviroment.getRequiredProperty("spring.datasource.admin.username"));
        dataSource.setPassword(enviroment.getRequiredProperty("spring.datasource.admin.password"));
        return dataSource;
    }

    @Bean
    public JdbcTemplate adminJdbcTemplate(@Qualifier("adminDataSource") DataSource adminDataSource)
    {
        return new JdbcTemplate(adminDataSource);
    }

    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }

    @Bean
    public DataSource customerDataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(
                enviroment.getRequiredProperty("spring.datasource.driver-class-name"));
        dataSource.setUrl(enviroment.getRequiredProperty("spring.datasource.customer.url"));
        dataSource.setUsername(enviroment.getRequiredProperty("spring.datasource.customer.username"));
        dataSource.setPassword(enviroment.getRequiredProperty("spring.datasource.customer.password"));
        return dataSource;
    }

    @Bean
    @Primary
    public JdbcTemplate customerJdbcTemplate(@Qualifier("customerDataSource") DataSource customerDataSource)
    {
        return new JdbcTemplate(customerDataSource);
    }

    @Bean
    public DataSource staffDataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(
                enviroment.getRequiredProperty("spring.datasource.driver-class-name"));
        dataSource.setUrl(enviroment.getRequiredProperty("spring.datasource.staff.url"));
        dataSource.setUsername(enviroment.getRequiredProperty("spring.datasource.staff.username"));
        dataSource.setPassword(enviroment.getRequiredProperty("spring.datasource.staff.password"));
        return dataSource;
    }

    @Bean
    public JdbcTemplate staffJdbcTemplate(@Qualifier("staffDataSource") DataSource staffDataSource)
    {
        return new JdbcTemplate(staffDataSource);
    }
}
