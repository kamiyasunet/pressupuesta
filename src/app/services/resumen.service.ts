import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_SERVICES } from './url.db';

@Injectable({
  providedIn: 'root'
})
export class ResumenService {

  constructor(private http: HttpClient) { }

  public getPaquetesDashboard(date: string): Observable<any[]> {
    let params = new HttpParams();
    params = params.set('fecha', date);

    const url = `${URL_SERVICES}paquetes/dashboad_general`;
    // const url = `${URL_SERVICES}paquetes/paquetes/paquetes`;
    return this.http.post<any[]>(url, params);
  }

  public getUsuariosAvance(date: string): Observable<any[]> {
    let params = new HttpParams();
    params = params.set('fecha', date);

    const url = `${URL_SERVICES}paquetes/tabla_usuarios_avance`;
    // const url = `${URL_SERVICES}paquetes/paquetes/paquetes`;

    return this.http.post<any[]>(url, params);
  }
}
