import { Injectable } from '@angular/core';
import { URL_SERVICES } from './url.db';
import { NgForm } from '@angular/forms';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string;
  idUsuario: string;
  tipoUsuario: string;
  usuario: any = {};


  constructor(private http: HttpClient, private navCtrl: Router) { }

  login(correo: string, contrasena: string) {
    this.cerrarSesion();

    const data = { correo, contrasena };

    const url = `${URL_SERVICES}usuario_paq`;

    return new Promise((resolve) => {
      this.http.post(url, data).subscribe((resp) => {
        if (!resp['error']) {
          this.guadarToken(resp['token'], resp['id_usuario'], resp['tipo']);
          localStorage.setItem('correoUsuario', correo);
          resolve(true);
        } else {
          console.log(resp['error']);
          this.token = null;
          this.idUsuario = null;
          this.tipoUsuario = null;
          localStorage.clear();
          resolve(false);
        }
      });
    });
  }

  loginM(correo: string, contrasena: string) {
    const data = { correo, contrasena };
    const url = `${URL_SERVICES}usuario_paq`;
    return this.http.post<any[]>(url, data);
  }

  cerrarSesion() {
    this.token = null;
    this.idUsuario = null;
    this.tipoUsuario = null;
    //this.guardar_storage(this.token, this.idUsuario, this.tipoUsuario );
  }

  getUsuarios() {
    const url = `${URL_SERVICES}usuario_paq/listar_usuarios`;
    return this.http.get<any[]>(url);
  }

  usuariosBetween(
    id_usuario: number,
    fecha_inicio: string,
    fecha_final?: string
  ) {
    const data = {
      id_usuario,
      fecha_inicio,
      fecha_final,
    };

    const url = `${URL_SERVICES}usuario_paq/listar_paquetes_usuario_between`;
  }

  async guadarToken(token: string, idUsuario: string, tipoUsuario: string) {
    this.token = token;
    this.idUsuario = idUsuario;
    this.tipoUsuario = tipoUsuario;

    //console.log(this.token, this.idUsuario, this.tipoUsuario);

    await localStorage.setItem('token', token);
    await localStorage.setItem('idUsuario', idUsuario);
    await localStorage.setItem('tipoUsuario', tipoUsuario);

    //console.log(this.token, this.idUsuario, this.tipoUsuario);
  }

  registro(
    correo: string,
    contrasena: string,
    nombres: string,
    a_paterno: string,
    a_materno: string,
    tipo: string
  ) {
    return new Promise((resolve) => {
      const url = `${URL_SERVICES}usuario_paq/insertar_usuario`;
      //'http://www.siscp.net/rest/index.php/usuario_paq/insertar_usuario';

      const data = { correo, contrasena, nombres, a_paterno, a_materno, tipo };

      this.http.post(url, data).subscribe((resp) => {
        console.log(resp);

        if (!resp['error']) {
          this.guadarToken(resp['token'], resp['id_usuario'], resp['tipo']);

          console.log(this.token, this.idUsuario, this.tipoUsuario);

          resolve(true);
        } else {
          console.log(resp['error']);
          this.token = null;
          localStorage.clear();
          resolve(false);
        }
      });
    });
  }

  async cargarToken() {
    this.token = (await localStorage.getItem('token')) || null;
  }

  async cargarStorage() {
    this.token = (await localStorage.getItem('token')) || null;
    this.idUsuario = (await localStorage.getItem('idUsuario')) || null;
    this.tipoUsuario = (await localStorage.getItem('tipoUsuario')) || null;
  }

  getUsuario(idUsuario) {
    const url = `${URL_SERVICES}usuario_paq/usuario/${idUsuario}`;
    return this.http.get<any[]>(url);
  }

  async validaToken(): Promise<boolean> {
    await this.cargarToken();

    if (!this.token) {
      this.navCtrl.navigate['/login'];
      return Promise.resolve(false);
    }

    return new Promise<boolean>((resolve) => {
      // usuario_paq/usuario_token
      const data = { token: this.token };
      // console.log(this.token );
      const url = `${URL_SERVICES}usuario_paq/usuario_token`;

      this.http.post(url, data).subscribe((resp) => {
        //   console.log(resp);

        if (!resp['error']) {
          this.navCtrl.navigate['/lista-paquetes'];
          this.usuario = resp['usuario'];
          //console.log(resp['usuario']);
          resolve(true);
        } else {
          this.navCtrl.navigate['/login'];
          resolve(false);
        }
      });
    });
  }

  actualizarUsuario(forma: NgForm, idUsuario, imagen: string) {
    //console.log('Paramas Actualizar', forma.value);

    let params = new HttpParams();

    params = params.set('id_usuario', idUsuario);
    params = params.set('nombres', forma.value['nombres']);
    params = params.set('a_paterno', forma.value['a_paterno']);
    params = params.set('a_materno', forma.value['a_materno']);
    params = params.set('clave_ine', forma.value['clave_ine']);
    params = params.set('correo', forma.value['correo']);
    params = params.set('contrasena', forma.value['contrasena']);
    params = params.set('rfc', forma.value['rfc']);
    params = params.set('telefono', forma.value['telefono']);
    params = params.set('tipo', forma.value['tipo']);
    params = params.set('imagen', imagen);

    const url = `${URL_SERVICES}paquetes/actualizar_usuario/`;

    return this.http.post(url, params);
  }

  insertarUsuario(forma: NgForm, imagen: string) {
    //console.log('Paramas Actualizar', forma.value);

    let params = new HttpParams();

    params = params.set('nombres', forma.value['nombres']);
    params = params.set('a_paterno', forma.value['a_paterno']);
    params = params.set('a_materno', forma.value['a_materno']);
    params = params.set('clave_ine', forma.value['clave_ine']);
    params = params.set('correo', forma.value['correo']);
    params = params.set('contrasena', forma.value['contrasena']);
    params = params.set('rfc', forma.value['rfc']);
    params = params.set('telefono', forma.value['telefono']);
    params = params.set('tipo', forma.value['tipo']);
    params = params.set('imagen', imagen);

    console.log(params);
    const url = `${URL_SERVICES}paquetes/insertar_usuario/`;

    return this.http.post(url, params);
  }
}
