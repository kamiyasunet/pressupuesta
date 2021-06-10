import { Injectable } from '@angular/core';
import { URL_SERVICES } from './url.db';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FasesService {


  constructor(
    private http: HttpClient 
      ){ }

  getFase1() {
    const url = `${URL_SERVICES}fases/fase1`;
    return this.http.get<any[]>(url);
  }
  getFase2(idFase) {
    const url = `${URL_SERVICES}fases/fase2/${idFase}`;
    return this.http.get<any[]>(url);
  }
  getFase3(idFase) {
    const url = `${URL_SERVICES}fases/fase1/${idFase}`;
    return this.http.get<any[]>(url);
  }

  
}
