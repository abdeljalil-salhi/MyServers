package abdel.codes.myservers.service;

import abdel.codes.myservers.model.Server;

import java.io.IOException;
import java.util.Collection;

/**
 * @author Abdeljalil Salhi
 * @version 1.0
 */

public interface ServerService {
    Server save(Server server);
    Server ping(String ipAddress) throws IOException;
    Collection<Server> list(int limit);
    Server get(Long id);
    Server update(Server server);
    Boolean delete(Long id);
}
