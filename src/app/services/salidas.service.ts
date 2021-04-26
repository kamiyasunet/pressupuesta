import { Injectable } from '@angular/core';
import { URL_SERVICES } from './url.db';
import { UsuarioService } from './usuario.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalidasService {

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService) { }

  getPaquetesUsuarioDate(idUsuario: string, fecha: string) {
    const url = `${URL_SERVICES}paquetes/paquetes_usuario_orden/${idUsuario}/${fecha}`;
    return this.http.get<any[]>(url);
  }

}
