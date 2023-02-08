package org.generation.naomdb.service;

import org.generation.naomdb.exception.OrdenNotFound;
import org.generation.naomdb.model.Estado;
import org.generation.naomdb.model.Ordenes;
import org.generation.naomdb.model.Producto;
import org.generation.naomdb.model.Usuario;
import org.generation.naomdb.repository.OrdenesRepository;
import org.generation.naomdb.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.ServletException;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public class OrdenesService {

    private final OrdenesRepository ordenesRepository;

    private final UsuarioRepository usuarioRepository;

    @Autowired
    public OrdenesService(OrdenesRepository ordenesRepository, UsuarioRepository usuarioRepository) {
        this.ordenesRepository = ordenesRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public Ordenes deleteOrden(String correo, Long id) throws OrdenNotFound, ServletException {
        Optional<Usuario> usuario = usuarioRepository.findByCorreo(correo);
        if (usuario.isPresent()) {
            Usuario u = usuario.get();
            ordenesRepository.deleteById(id);
            List<Ordenes> ordenes = u.getOrdenes().stream().filter(orden -> orden.getId() != id).toList();
            u.setOrdenes(ordenes);
            usuarioRepository.save(u);
        }
        throw new OrdenNotFound("Orden con el id " + id + " no se encuentra");
    }
}
