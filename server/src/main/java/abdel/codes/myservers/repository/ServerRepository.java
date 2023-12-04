package abdel.codes.myservers.repository;

import abdel.codes.myservers.model.Server;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Abdeljalil Salhi
 * @version 1.0
 */

public interface ServerRepository extends JpaRepository<Server, Long>{
    Server findByIpAdress(String ipAdress);
}
