import { Usuario } from './../../models/usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubirArchivoService } from './../subir-archivo/subir-archivo.service';

import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    public subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  estaLogueado() {
    return !!this.token;
  }

  loginGoogle(token: string) {
    return this.http.post(`${environment.apiUrl}/login/google`, { token }).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);

        return true;
      })
    );
  }

  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    return this.http.post(`${environment.apiUrl}/login`, { email: usuario.email, password: usuario.password }).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);

        return true;
      })
    );
  }

  logout() {
    this.usuario = null;
    this.token = null;

    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.token = token;
    this.usuario = usuario;
  }

  cargarStorage() {
    this.token = localStorage.getItem('token');
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
  }

  crearUsuario(usuario: Usuario) {
    return this.http.post(`${environment.apiUrl}/usuario`, usuario).pipe(
      map((resp: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso'
        });

        return resp;
      })
    );
  }

  actualizarUsuario(usuario: Usuario) {
    return this.http.put(`${environment.apiUrl}/usuario/${usuario._id}?token=${this.token}`, usuario).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.usuario._id, this.token, resp.usuario);

        Swal.fire({ icon: 'success', title: 'Usuario actualizado'});

        return true;
      })
    );
  }

  cambiarImagen(archivo: File) {
    this.subirArchivoService.subirArchivo(archivo, 'usuarios', this.usuario._id)
      .then((resp: any) => {
        this.usuario.img = resp.usuario.img;
        this.guardarStorage(this.usuario._id, this.token, this.usuario);

        Swal.fire({ icon: 'success', title: 'Imagen actualizada' });
      })
      .catch(console.log);
  }
}