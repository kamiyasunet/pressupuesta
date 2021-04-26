import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { DatePipe } from '@angular/common';
import { SalidasService } from '../../services/salidas.service';

@Component({
  selector: 'ngx-salidas',
  templateUrl: './salidas.component.html',
  styleUrls: ['./salidas.component.scss']
})
export class SalidasComponent implements OnInit {

  array: any[];
  
  textoBuscar: string;
  pickerDate: Date = new Date();
  mostrar: boolean = false;
  argumento: string = null;
  fechaActual: string = new Date().toISOString();
  fechaActual1 = new FormControl(new Date());
  usuario: any = '';
  placas: string = '';
  modelo: string = '';
  ayudante: string = '';


  date = new FormControl(new Date());

  constructor(
    private salidasService: SalidasService,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    public datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.argumento = this.route.snapshot.params.id;
    this.getPaquetes(this.fechaActual);
    this.getUsuario(this.argumento);

    /*  this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; */
  }

 

  getPaquetes(fecha: any) {
    //console.log(this.datepipe.transform(fecha, 'yyyy-MM-dd'));
    this.salidasService
      .getPaquetesUsuarioDate(
        this.argumento,
        this.datepipe.transform(fecha, 'yyyy-MM-dd')
      )
      .subscribe((list) => {
        //console.log(this.datepipe.transform(this.pickerDate, 'yyyy-MM-dd'));
        //console.log(this.argumento);
        if (!list['error']) {
          this.array = list['paquetes'];
          console.log(this.array);
        } else {
          this.array = [];
        }
      });
  }
  getUsuario(idUsuario) {
    this.usuarioService.getUsuario(idUsuario).subscribe((resp) => {
      this.usuario = resp['usuario'][0];
      // console.log(this.usuario);
    });
  }

  buscar(event) {
    // Console.log(event);
    this.textoBuscar = event.detail.value;
  }

  imprimir(cmpName) {
    let printContents = document.getElementById(cmpName).innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();

  }
}
