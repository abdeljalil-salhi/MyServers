package abdel.codes.myservers.enum;

/**
 * @author Abdeljalil Salhi
 * @version 1.0
 */

public enum Status {
    SERVER_UP("SERVER_UP"), SERVER_DOWN("SERVER_DOWN");
    private final String status;

    Status(String status) {
        this.status = status;
    }

    public String getStatus() {
        return this.status;
    }
}
