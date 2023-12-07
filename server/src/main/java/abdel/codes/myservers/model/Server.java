package abdel.codes.myservers.model;

import abdel.codes.myservers.enumuration.Status;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


/**
 * @author Abdeljalil Salhi
 * @version 1.0
 */

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Server {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true)
    private String ipAddress;
    
    private String name;
    
    private String memory;
    
    private String type;

    private String image;
    
    private Status status;
}