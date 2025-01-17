package org.generation.naomdb.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "ordenes")
public class Ordenes {
	
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	@Column(unique=true)
	private Long id;

	@Column(nullable=false)
	private Integer cantidad;

	@Column(name="total_orden")
	private BigDecimal totalOrden;

	@Column(name = "estado")
	private Estado estado;

	@Column(name = "fecha")
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date fecha;

	@ManyToMany
	@JoinTable(
			name = "ordenes_has_productos",
			joinColumns = @JoinColumn(name = "productos_id"),
			inverseJoinColumns = @JoinColumn(name = "ordenes_id"))
	private List<Producto> productos;



	
	public Ordenes() {
	}

	public Ordenes(Integer cantidad, BigDecimal totalOrden, Estado estado, Date fecha, List<Producto> productos) {
		this.cantidad = cantidad;
		this.totalOrden = totalOrden;
		this.estado = estado;
		this.fecha = fecha;
		this.productos = productos;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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
		return "Ordenes{" +
				"id=" + id +
				", cantidad=" + cantidad +
				", totalOrden=" + totalOrden +
				", estado=" + estado +
				", fecha=" + fecha +
				", productos=" + productos +
				'}';
	}
}
