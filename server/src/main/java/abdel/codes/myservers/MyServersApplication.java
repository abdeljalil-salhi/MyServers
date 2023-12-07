package abdel.codes.myservers;

import abdel.codes.myservers.model.Server;
import abdel.codes.myservers.repository.ServerRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import static abdel.codes.myservers.enumuration.Status.SERVER_UP;

@SpringBootApplication
public class MyServersApplication {

    public static void main(String[] args) {
        SpringApplication.run(MyServersApplication.class, args);
    }

///*
//    @Bean
//    CommandLineRunner run(ServerRepository serverRepository) {
//        return args -> {
//            serverRepository.save(
//                    new Server(null,
//                            "192.168.1.168",
//                            "Windows 11",
//                            "16 GB",
//                            "Work laptop",
//                            "/assets/image3.png",
//                            SERVER_UP)
//            );
//        };
//    }
//*/

}
