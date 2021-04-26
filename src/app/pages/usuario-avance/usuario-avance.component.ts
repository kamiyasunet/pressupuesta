import { Component, OnInit } from '@angular/core';
import { AvanceUsuarioService } from '../../services/avance-usuario.service';
import { NbThemeService, NbCalendarRange } from '@nebular/theme';

import { Router,ActivatedRoute } from '@angular/router';
import { NbDateService } from '@nebular/theme';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx';

@Component({
  selector: 'ngx-usuario-avance',
  templateUrl: './usuario-avance.component.html',
  styleUrls: ['./usuario-avance.component.scss']
})
export class UsuarioAvanceComponent implements OnInit {

  constructor( 
    private avanceService : AvanceUsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private theme: NbThemeService,
    public datepipe: DatePipe,) { 
    }

  fileName = 'Avanceusuario.xlsx';
  
  range: NbCalendarRange<Date>;
  Brecibido: any = 0;
  Bentrada: any = 0;
  Bentregado: any = 0;
  Bruta: any = 0;
  Bsalida: any = 0;
  Bexcepcionado: any = 0;
  Bfaltantes:any =0;
  Brecolectado: any = 0;
  sinDatos = false;
  usuario = {}
  paquetes: any;
  idUsuario: any;
  options: any = {};
  themeSubscription: any;
  today: string = new Date().toISOString();
  fechaI: string = '';
  fechaF: string = '';

  ngOnInit(): void {

    this.idUsuario = this.route.snapshot.params.id;
    var fecha_inicial = this.datepipe.transform(this.today, 'yyyy-MM-dd');
    var fecha_iniciales = this.datepipe.transform(this.today, 'dd-M-YY');
    this.fechaF = fecha_iniciales;
    this.fechaI = fecha_iniciales;
    this.getPaquetesUsuarioDate(fecha_inicial, fecha_inicial, this.idUsuario);
    this.getPaqueteAvance(this.idUsuario, fecha_inicial);
    this.getUsuario(this.idUsuario);

    setTimeout(() => {
      this.pie()
    
    }, 1000);
    
   
  }

  async getPaquetesUsuarioDate(
    fecha_inicial: string,
    fecha_final: string,
    id_usuario: string
  ) {
    this.Bruta = 0;
    this.Bentregado = 0;
    this.Bexcepcionado = 0;
    this.Brecibido = 0;
    this.sinDatos = true;
    this.avanceService
      .getPaquetesUsuarioBetween(fecha_inicial, id_usuario, fecha_final)
      .subscribe((resp) => {
        var misPaquetes = resp['paquetes'];
        console.log(resp);
        misPaquetes.forEach((element) => {
          switch (element.estatus) {
            case 'Entrada':
              //  console.log('Push_Entrada', this.entrada);
              break;
            case 'Salida':
              this.Bruta = element['cantidad'];
              // console.log('Bruta', this.Bruta);
              break;
            case 'Entregado':
              this.Bentregado = element['cantidad'];
              //  console.log('Push_Salida',  this.Bentregado);
              break;
            case 'Ruta':
              //  console.log('Push_Salida', this.entrada);
              break;
            case 'No entregado':
              this.Bexcepcionado = element['cantidad'];
              //console.log('Excepcionado', this.Bexcepcionado);
              break;
            case 'Recolectado':
              this.Brecolectado = element['cantidad'];
              //console.log('Excepcionado', this.Bexcepcionado);
              break;
          }
        });

        this.Brecibido =
          Number(this.Bruta) +
          Number(this.Bexcepcionado) +
          Number(this.Bentregado) +
          Number(this.Brecolectado);; 

        if (this.Brecibido > 0) {
          this.sinDatos = false;
          console.log('Sindatos', this.sinDatos, 'Recibidos', this.Brecibido);
        }
        
      });
  }
  getUsuario(idUsuario) {
    this.avanceService.getUsuario(idUsuario).subscribe((resp) => {
      this.usuario = resp['usuario'][0];
       console.log(this.usuario);
    });
  }

  getPaqueteAvance(idUsuario, date) {
    this.avanceService.getPaqueteAvance(idUsuario, date).subscribe((resp) => {
      this.paquetes = resp['paquetes'];
      console.log(this.paquetes);
    });
  }

  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  pie(){
    this.Bfaltantes = +this.Bentregado + +this.Bexcepcionado;

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {

          left: 'center',
          data: ['Recoletado', 'En ruta', 'Entregado', 'Excepcionado', 'Alamacén'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: 'Paquetes',
            type: 'pie',
            radius: ['40%', '80%'],
            center: ['50%', '60%'],
            data: [
              { value: this.Bsalida, name: 'En ruta' },
              { value: this.Bentregado, name: 'Entregado' },
              { value: this.Bexcepcionado, name: 'Excepcionado' },
              { value: this.Bentrada, name: 'Alamacén' },
              { value: this.Brecolectado, name: 'Recoletado' },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
            },
          },
        ],
      };
    });
  }

  handleRangeChange(event){ 

    console.log(event.start, event.end);

    if (event.start, event.end){

      var fecha_inicial = this.datepipe.transform(event.start, 'yyyy-MM-dd');
      var fecha_final = this.datepipe.transform(event.end, 'yyyy-MM-dd');

      this.getPaquetesUsuarioDate(fecha_inicial, fecha_final, this.idUsuario);
      this.getPaqueteAvance(this.idUsuario, fecha_inicial)
      setTimeout(() => {
        this.pie()
      }, 1000);
    }

  }

  gotoPaquete(id: any) {

    //pages/usuario-avance/1

    this.router.navigateByUrl('/pages/paquete/' + id)


  }


  

}
