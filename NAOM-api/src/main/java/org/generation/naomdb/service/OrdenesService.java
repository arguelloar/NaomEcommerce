package org.generation.naomdb.service;

import org.aspectj.weaver.ast.Or;
import org.generation.naomdb.exception.OrdenNotFound;
import org.generation.naomdb.model.Ordenes;
import org.generation.naomdb.model.Producto;
import org.generation.naomdb.repository.OrdenesRepository;
import org.generation.naomdb.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class OrdenesService {

    private final OrdenesRepository ordenesRepository;

    private final UsuarioRepository usuarioRepository;

    @Autowired
    public OrdenesService(OrdenesRepository ordenesRepository, UsuarioRepository usuarioRepository) {
        this.ordenesRepository = ordenesRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public List<Ordenes> getOrdenesFromUsuario(Long id) throws OrdenNotFound {
        Optional<List<Ordenes>> ordenesByUser = ordenesRepository.findOrdenesByUser(id);
        if(ordenesByUser.isPresent()){
            return ordenesByUser.get();
        }
        throw new OrdenNotFound("El usuario con id "+id+" no tiene ordenes");
    }

    public Ordenes deleteOrden(Long id) throws OrdenNotFound {
        Optional<Ordenes> ordenesOpt = ordenesRepository.findById(id);
        if(ordenesOpt.isPresent()){
            Ordenes ordenes = ordenesOpt.get();
            ordenesRepository.deleteById(id);
            return ordenes;
        }
        throw new OrdenNotFound("Orden con el id "+id+" no se encuentra");
    }

    public Ordenes updateOrden(Long id, int cantidad, BigDecimal totalOrden, List<Producto> productos) throws OrdenNotFound {
        Optional<Ordenes> ordenes = ordenesRepository.findById(id);
        if(ordenes.isPresent()){
            Ordenes ord = ordenes.get();
            if (cantidad  != 0) ord.setCantidad(cantidad);
            if (totalOrden != null) ord.setTotalOrden(totalOrden);
            if (productos != null) ord.setProductos(productos);
            ordenesRepository.save(ord);
            return ord;
        }
        throw new OrdenNotFound("Orden con el id "+id+" no se encuentra");

    }




}
