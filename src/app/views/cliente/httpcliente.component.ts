import { Component } from '@angular/core';
import { HttpClienteService } from '../../service/httpcliente.service';
import { Cliente } from '../../entidade/cliente.component';

@Component({
  selector: 'app-root',
  templateUrl: './cliente.component.html',
  providers: [HttpClienteService],
  styleUrls: ['./cliente.component.css'],
})
export class HttpClienteComponent {
  title: string;
  hidden: boolean;
  
  clientes: Cliente[];
  cliente: Cliente;
  
  constructor(private httpClienteS: HttpClienteService) {
    this.title = 'AS App | Clientes';
    this.cliente = new Cliente();
    this.getClientes();
  }

  getClientes() {
    this.httpClienteS.getClientes().subscribe(
      cliente => this.clientes = cliente,
      error => console.log(error)
    );
  }

  addCliente() {
    this.httpClienteS.addCliente(this.cliente).subscribe(
      data => data,
      error => alert(error),
      () => this.getClientes()
    );
    // reseta o form
    this.cliente.nome = null;
    this.cliente.cpf = null;
  }
  
  editarCliente(cliente) {
    this.hidden = true;
    this.cliente.id = cliente.id;
    this.cliente.nome = cliente.nome;
    this.cliente.cpf = cliente.cpf;
  }
  
  editarClienteSubmit(cliente) {
    this.httpClienteS.editarCliente(this.cliente).subscribe(
      data => data,
      error => alert(error),
      () => this.getClientes()
    );
    this.voltarCliente();
  }
  
  voltarCliente() {
    this.hidden = false;
    this.cliente = new Cliente();
  }
  
  deletarCliente(cliente) {
    this.httpClienteS.deletarCliente(cliente.id).subscribe(
      data => data,
      error => alert(error),
      () => this.getClientes()
    );
  }
}
