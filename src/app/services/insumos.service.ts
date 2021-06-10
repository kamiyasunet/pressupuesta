import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from './url.db';

@Injectable({
  providedIn: 'root'
})
export class InsumosService {

  constructor(
    private http: HttpClient
  ) { }

  getConcepto(idConcepto) {
    const url = `${URL_SERVICES}insumos/concepto/${idConcepto}`;
    return this.http.get<any[]>(url);
  }

  getInsumosConceptos(idConcepto) {
    const url = `${URL_SERVICES}insumos/insumos/${idConcepto}`;
    return this.http.get<any[]>(url);
  }
}