package abdel.codes.myservers.model;

import abdel.codes.myservers.enumuration.Status;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;

import jakarta.validation.constraints.NotEmpty;
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
    @NotEmpty(message = "IP Address cannot be empty")
    private String ipAddress;
    
    @NotEmpty(message = "Name cannot be empty")
    private String name;
    
    @NotEmpty(message = "Memory cannot be empty")
    private String memory;
    
    @NotEmpty(message = "CPU cannot be empty")
    private String type;
    
    @Column(unique = true)
    @NotEmpty(message = "Image cannot be empty")
    private String image;
    
    @NotEmpty(message = "Status cannot be empty")
    private Status status;
}