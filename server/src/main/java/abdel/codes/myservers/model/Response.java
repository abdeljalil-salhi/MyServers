package abdel.codes.myservers.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.experimental.SuperBuilder;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.Map;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

/**
 * @author Abdeljalil Salhi
 * @version 1.0
 */

@Data
@SuperBuilder
@JsonInclude(NON_NULL) // Show only NON_NULL fields
public class Response {
    protected LocalDateTime timestamp;

    protected int statusCode;

    protected HttpStatus httpStatus;

    protected String reason;

    protected String message;

    protected String detailedMessage;

    protected Map<?, ?> data;
}
