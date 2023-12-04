package abdel.codes.myservers.enumuration;

import lombok.Getter;

/**
 * @author Abdeljalil Salhi
 * @version 1.0
 */

@Getter
public enum Status {
    SERVER_UP("SERVER_UP"), SERVER_DOWN("SERVER_DOWN");
    private final String status;

    Status(String status) {
        this.status = status;
    }

}
