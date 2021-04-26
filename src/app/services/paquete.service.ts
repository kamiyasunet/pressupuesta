import { Injectable } from '@angular/core';
import { URL_SERVICES } from './url.db';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaqueteService {

  constructor( private http: HttpClient) { }

  public getPaquete<Paquetes>(
    token: string,
    idUsuario: string,
    idPaquete: string
  ) {
    const url = `${URL_SERVICES}paquetes/paquete/${token}/${idUsuario}/${idPaquete}`;

    return this.http.get<any[]>(url);
  }

  getMovimientos(token: string, idUsuario: string, idPaquete: string) {
    const url = `${URL_SERVICES}paquetes/movimientos/${token}/${idUsuario}/${idPaquete}`;

    return this.http.get<any[]>(url);
  }

  getEvidencias(idPaquete: string) {
    const url = `${URL_SERVICES}paquetes/evidencias/${idPaquete}`;

    return this.http.get<any[]>(url);
  }
  public actualizarPaquete(
    token: string,
    idUsuario: string,
    idPaquete: string,
    direccion?: string,
    codigo_postal?: string,
    cliente?: string,
    telefono?: string,
    tipo?: string,
    cod?: string,
    tamano?: string,
    zona?: string
  ) {
    let params = new HttpParams();
    params = params.set('codigo_postal', codigo_postal);
    params = params.set('direccion', direccion);
    params = params.set('cliente', cliente);
    params = params.set('telefono', telefono);
    params = params.set('zona', zona);
    params = params.set('cod', cod);
    params = params.set('tamano', tamano);
    params = params.set('tipo', tipo);

    //console.log('Paramas', params );

    const url = `${URL_SERVICES}paquetes/actualizar_paquete_completo/${token}/${idUsuario}/${idPaquete}`;
    return this.http.post(url, params);
  }

}
