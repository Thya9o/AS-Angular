import { Component } from '@angular/core';
import { HttpClienteService } from '../../service/httpcliente.service';
import { Cliente } from '../../entidade/cliente.component';

@Component({
  selector: 'app-root',
  templateUrl: './cliente.component.html',
  providers: [HttpClienteService]
})
export class HttpClienteComponent {
  clientes: Cliente[];
  cliente: Cliente;

  constructor(private httpClienteS: HttpClienteService) {
    this.cliente = new Cliente();
    this.getClientes();
  }

  getClientes() {
    this.httpClienteS.getClientes().subscribe(
      cliente => this.clientes = cliente,
      error => alert(error)
    );
  }

  addCliente() {
    this.httpClienteS.addCliente(this.cliente).subscribe(
      data => data,
      error => alert(error),
      () => this.getClientes()
    );
  }
}
