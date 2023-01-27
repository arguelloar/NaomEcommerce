package org.generation.naomdb.model;


import org.aspectj.weaver.ast.Or;

import java.util.Collection;
import java.util.List;
import java.util.Set;

import javax.persistence.*;

@Entity
@Table(name = "usuario")
public class Usuario {
	
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	@Column(name="id", unique=true, nullable=false)
	private Long id;

	@Column(nullable=false)
	private String nombre;

	@Column(nullable=false)
	private String apellido;

	@Column(nullable=false)
	private String correo;

	@Column(nullable=false)
	private String contrasena;

	@Column(nullable=false)
	private String telefono;


	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
	@JoinColumn(name = "usuario_id")
	private Collection<Ordenes> ordenes;

	
	public Usuario() {
	}

	public Usuario(Long id, String nombre, String apellido, String correo, String contrasena, String telefono, Collection<Ordenes> ordenes) {
		this.id = id;
		this.nombre = nombre;
		this.apellido = apellido;
		this.correo = correo;
		this.contrasena = contrasena;
		this.telefono = telefono;
		this.ordenes = ordenes;
	}

	public Collection<Ordenes> getOrdenes() {
		return ordenes;
	}

	public void setOrdenes(Collection<Ordenes> ordenes) {
		this.ordenes = ordenes;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellido() {
		return apellido;
	}

	public void setApellido(String apellido) {
		this.apellido = apellido;
	}

	public String getCorreo() {
		return correo;
	}

	public void setCorreo(String correo) {
		this.correo = correo;
	}

	public String getContrasena() {
		return contrasena;
	}

	public void setContrasena(String contrasena) {
		this.contrasena = contrasena;
	}

	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}

	public Long getId() {
		return id;
	}

	@Override
	public String toString() {
		return "Usuario{" +
				"id=" + id +
				", nombre='" + nombre + '\'' +
				", apellido='" + apellido + '\'' +
				", correo='" + correo + '\'' +
				", contrasena='" + contrasena + '\'' +
				", telefono='" + telefono + '\'' +
				", ordenes=" + ordenes +
				'}';
	}
}
