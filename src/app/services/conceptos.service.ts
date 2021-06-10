import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from './url.db';

@Injectable({
  providedIn: 'root'
})
export class ConceptosService {

  constructor(
    private http: HttpClient
  ) { }

  getConceptos() {
    const url = `${URL_SERVICES}conceptos/conceptos/`;
    return this.http.get<any[]>(url);
  }

  getConceptosFase(idFase) {
    const url = `${URL_SERVICES}conceptos/concepto_fase/${idFase}`;
    return this.http.get<any[]>(url);
  }
}