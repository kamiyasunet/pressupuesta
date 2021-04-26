import { Injectable } from '@angular/core';
import { URL_SERVICES } from './url.db';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AvanceUsuarioService {

  constructor(
   
     private http: HttpClient) { }

  getUsuario(idUsuario) {
    const url = `${URL_SERVICES}usuario_paq/usuario/${idUsuario}`;
    return this.http.get<any[]>(url);
  }

  public getPaquetesUsuarioBetween(
    fecha_inicial: string,
    id_usuario: string,
    fecha_final: string
  ): Observable<any[]> {
    // console.log('PS=', fecha_inicial, fecha_final,"id_susuario", id_usuario);

    let params = new HttpParams();
    params = params.set('fecha_inicial', fecha_inicial);
    params = params.set('fecha_final', fecha_final);
    params = params.set('id_usuario', id_usuario);
    const url = `${URL_SERVICES}paquetes/listar_paquetes_usuario_between`;
    return this.http.post<any[]>(url, params);
  }

  getPaqueteAvance(idUsuario: string, fecha: string) {
    let params = new HttpParams();
    const url = `${URL_SERVICES}paquetes/paquetes_usuario_avance/${idUsuario}/${fecha}`;
    return this.http.get(url);
  }
}
