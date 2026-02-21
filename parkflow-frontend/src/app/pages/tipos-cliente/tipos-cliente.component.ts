import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TipoClienteService, TipoCliente } from '../../core/services/tipo-cliente.service';
import { DataTableColumn } from '../../shared/data-table/data-table-column.interface';

@Component({
  selector: 'app-tipos-cliente',
  templateUrl: './tipos-cliente.component.html',
  styleUrls: ['./tipos-cliente.component.scss']
})
export class TiposClienteComponent implements OnInit {
  columns: DataTableColumn<TipoCliente>[] = [
    { key: 'id_tipo_cliente', label: 'ID', sortable: true },
    { key: 'descricao', label: 'Descrição' },
    { key: 'acoes', label: 'Ações' }
  ];
  dataSource = new MatTableDataSource<TipoCliente>([]);
  form = { descricao: '' };
  editando: number | null = null;
  erro = '';

  constructor(public service: TipoClienteService) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.service.listar().subscribe({
      next: (r) => (this.dataSource.data = r),
      error: (e) => (this.erro = e.error?.error || 'Erro ao carregar')
    });
  }
  
  salvar(): void {
    const d = this.form.descricao.trim();
    // if (!d) return;
    if (this.editando) {
      this.service.atualizar(this.editando, d).subscribe({
        next: () => {
          this.limparForm();
          this.carregar();
        },
        error: (e) => (this.erro = e.error?.error || 'Erro ao atualizar')
      });
    } else {
      this.service.criar(d).subscribe({
        next: () => {
          this.limparForm();
          this.carregar();
        },
        error: (e) => (this.erro = e.error?.error || 'Erro ao criar')
      });
    }
  }

  private limparForm(): void {
    this.editando = null;
    this.form = { descricao: '' };
  }

  iniciarEdicao(item: TipoCliente): void {
    this.editando = item.id_tipo_cliente;
    this.form = { descricao: item.descricao };
    this.erro = '';
  }

  onFormKeyUp(event: KeyboardEvent): void {
    if (event.key === 'Enter') this.salvar();
  }

  cancelarEdicao(): void {
    this.limparForm();
  }

  excluir(id: number): void {
    if (!confirm('Excluir este tipo?')) return;
    this.service.excluir(id).subscribe({
      next: () => this.carregar(),
      error: (e) => (this.erro = e.error?.error || 'Erro ao excluir')
    });
  }
}
