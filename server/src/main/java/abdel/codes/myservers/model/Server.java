package abdel.codes.myservers.model;

import abdel.codes.myservers.enum.Status;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Column;
import javax.validation.constraints.NotEmpty;

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
    @NotEmpty(message = "IP Adress cannot be empty")
    private String ipAdress;
    
    private String name;
    
    private String memory;
    
    private String type;
    
    private String image;
    
    private Status status;
}