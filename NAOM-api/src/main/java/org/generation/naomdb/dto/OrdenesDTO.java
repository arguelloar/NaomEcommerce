package org.generation.naomdb.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.generation.naomdb.model.Estado;
import org.generation.naomdb.model.Producto;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.List;

public class OrdenesDTO {

    private Integer cantidad;
    private BigDecimal totalOrden;
    private Estado estado;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date fecha;
    private List<Producto> productos;

    public OrdenesDTO() {
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public BigDecimal getTotalOrden() {
        return totalOrden;
    }

    public void setTotalOrden(BigDecimal totalOrden) {
        this.totalOrden = totalOrden;
    }

    public Estado getEstado() {
        return estado;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public List<Producto> getProductos() {
        return productos;
    }

    public void setProductos(List<Producto> productos) {
        this.productos = productos;
    }

    @Override
    public String toString() {
        return "OrdenesDTO{" +
                "cantidad=" + cantidad +
                ", totalOrden=" + totalOrden +
                ", estado=" + estado +
                ", fecha=" + fecha +
                ", productos=" + productos +
                '}';
    }
}
