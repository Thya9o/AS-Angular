import { Component } from '@angular/core';
import { HttpProdutoService } from '../../service/httpproduto.service';
import { Produto } from '../../entidade/produto.component';

@Component({
  selector: 'app-root',
  templateUrl: './produto.component.html',
  providers: [HttpProdutoService],
  styleUrls: ['./produto.component.css'],
})
export class HttpProdutoComponent {
  title: string;
  produtos: Produto[];
  produto: Produto;
  produtoClone: Produto;

  hidden: boolean;
  
  constructor(private httpProdutoS: HttpProdutoService) {
    this.title = 'AS App | Produtos';
    this.produto = new Produto();
    this.getProdutos();
  }

  getProdutos() {
    this.httpProdutoS.getProdutos().subscribe(
      produto => this.produtos = produto,
      error => console.log(error),
    );
  }

  addProduto() {
    this.httpProdutoS.addProduto(this.produto).subscribe(
      data => data,
      error => alert(error),
      () => this.getProdutos()
    );
    // reseta o form
    this.produto.descricao = null;
    this.produto.valor = null;
  }
  
  editarProduto(produto) {
    this.hidden = true;
    this.produto.id = produto.id;
    this.produto.descricao = produto.descricao;
    this.produto.valor = produto.valor;
  }
  
  editarProdutoSubmit(produto) {
    this.httpProdutoS.editarProduto(this.produto).subscribe(
      data => data,
      error => alert(error),
      () => this.getProdutos()
    );
    this.voltarProduto();
  }
  
  voltarProduto() {
    this.hidden = false;
    this.produto = new Produto();
  }
  
  deletarProduto(produto) {
    this.httpProdutoS.deletarProduto(produto.id).subscribe(
      data => data,
      error => alert(error),
      () => this.getProdutos()
    );
  }
  
  clonarProduto(produto) {
      this.produtoClone = Object.assign({}, produto);
      this.produtoClone.id = null;
      this.produtoClone.descricao += ' Clone';
      this.httpProdutoS.addProduto(this.produtoClone).subscribe(
        data => data,
        error => alert(error),
        () => this.getProdutos()
      );
    }
}
