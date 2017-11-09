import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { Cliente } from '../entidade/cliente.component';

@Injectable()
export class HttpClienteService {
  constructor(private _http: Http) { }

  getClientes(): Observable<Cliente[]> {
    return this._http.
      get('http://localhost:8080/AS/rest/detalhe-cliente').
      map(this.extractData);
  }

  private extractData(res: Response) {
    // verifica o tamanho da lista do rest e 
    // realiza o retorno apropriado
    if(res.json()['cliente'].length > 1) {
      return res.json()['cliente'];    
    }else {
      return [res.json().cliente];    
    }
  }

  addCliente(cliente: Cliente): Observable<string> {
    const json = JSON.stringify(cliente);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http.
      post('http://localhost:8080/AS/rest/detalhe-cliente/cadastrar',
      json, options).map(res => res.json());
  }
}
