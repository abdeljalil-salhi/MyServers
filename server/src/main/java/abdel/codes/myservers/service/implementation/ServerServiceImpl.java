package abdel.codes.myservers.service.implementation;

import abdel.codes.myservers.model.Server;
import abdel.codes.myservers.repository.ServerRepository;
import abdel.codes.myservers.service.ServerService;

import java.io.IOException;
import java.net.InetAddress;
import java.util.Collection;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Random;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import static abdel.codes.myservers.enumuration.Status.SERVER_DOWN;
import static abdel.codes.myservers.enumuration.Status.SERVER_UP;

import static java.lang.Boolean.TRUE;
import static org.springframework.data.domain.PageRequest.of;

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
        Server server = serverRepository.findByIpAddress(ipAddress);
        InetAddress address = InetAddress.getByName(ipAddress);
        server.setStatus(address.isReachable(10000) ? SERVER_UP : SERVER_DOWN);
        serverRepository.save(server);
        return server;
    }

    @Override
    public Collection<Server> list(int limit) {
        log.info("[!] Fetching all servers...");
        return serverRepository.findAll(of(0, limit)).toList();
    }

    @Override
    public Server get(Long id) {
        log.info("[#{}] Fetching...", id);
        Optional<Server> optionalServer = serverRepository.findById(id);

        if (optionalServer.isPresent())
            return optionalServer.get();
        throw new NoSuchElementException("[!] Server not found #" + id);
    }

    @Override
    public Server update(@NotNull Server server) {
        log.info("[{}] Updating server '{}'", server.getIpAddress(), server.getName());
        return serverRepository.save(server);
    }

    @Override
    public Boolean delete(Long id) {
        log.info("[#{}] Deleting...", id);
        serverRepository.deleteById(id);
        return TRUE;
    }

    private String setServerImage() {
        String[] images = { "server1.png", "server2.png", "server3.png", "server4.png" };
        return "/assets/" + images[new Random().nextInt(4)];
    }
}
