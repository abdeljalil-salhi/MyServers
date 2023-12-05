package abdel.codes.myservers.service.implementation;

import abdel.codes.myservers.model.Server;
import abdel.codes.myservers.repository.ServerRepository;
import abdel.codes.myservers.service.ServerService;

import java.io.IOException;
import java.net.InetAddress;
import java.util.Collection;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import static abdel.codes.myservers.enumuration.Status.SERVER_DOWN;
import static abdel.codes.myservers.enumuration.Status.SERVER_UP;

/**
 * @author Abdeljalil Salhi
 * @version 1.0
 */

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j // See logs
public class ServerServiceImpl implements ServerService {

    private final ServerRepository serverRepository;

    @Override
    public Server save(@NotNull Server server) {
        log.info("[{}] Saving new server '{}'", server.getIpAddress(), server.getName());
        server.setImage(setServerImage());
        return serverRepository.save(server);
    }

    @Override
    public Server ping(String ipAddress) throws IOException {
        log.info("[{}] Pinging...", ipAddress);
        Server server = serverRepository.findByIpAdress(ipAddress);
        InetAddress address = InetAddress.getByName(ipAddress);
        server.setStatus(address.isReachable(10000) ? SERVER_UP : SERVER_DOWN);
        serverRepository.save(server);
        return server;
    }

    @Override
    public Collection<Server> list(int limit) {
        return null;
    }

    @Override
    public Server get(Long id) {
        return null;
    }

    @Override
    public Server update(Server server) {
        return null;
    }

    @Override
    public Boolean delete(Long id) {
        return null;
    }

    private String setServerImage() {
        return null;
    }
}
