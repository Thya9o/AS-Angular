import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { Produto } from '../entidade/produto.component';

@Injectable()
export class HttpProdutoService {
  constructor(private _http: Http) { }

  getProdutos(): Observable<Produto[]> {
    return this._http.
      get('http://java-as-thiago.jelasticlw.com.br/rest/produto').
      map(this.extractData);
  }

  private extractData(res: Response) {
    // verifica o tamanho da lista do rest e
    // realiza o retorno apropriado
    if(res.json() != null) {    
      if(res.json()['produto'].length > 1) {
        return res.json()['produto'];
      }else {
        return [res.json()['produto']];
      }
    }
  }

  addProduto(produto: Produto): Observable<string> {
    const json = JSON.stringify(produto);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http.post('http://java-as-thiago.jelasticlw.com.br/rest/produto/cadastrar', json, options).map(res => res.json());
  }
  
  editarProduto(produto: Produto): Observable<string> {
    const json = JSON.stringify(produto);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http.post('http://java-as-thiago.jelasticlw.com.br/rest/produto/alterar', json, options).map(res => res.json());
  }
  
  deletarProduto(id: string): Observable<string> {
    const json = id;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http.post('http://java-as-thiago.jelasticlw.com.br/rest/produto/deletar', json, options).map(res => res.json());
  }
}
