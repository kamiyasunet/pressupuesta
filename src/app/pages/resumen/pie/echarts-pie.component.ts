import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ResumenService } from '../../../services/resumen.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'ngx-echarts-pie',
  template: `<div echarts [options]="options" class="echart"></div>`,
})
export class EchartsPieComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;
  
  avance: any;
  recibido_c: number = 0;
  salida_c: number = 0;
  entregado_c: number = 0;
  excepcionado_c: number = 0;
  entrada_c: number = 0;
  recolectado_c: number = 0;
  ruta_c: number = 0;
  faltantes: number = 0;

 // date = new FormControl(new Date());
  today: string = new Date().toISOString();
  
  constructor(
    private theme: NbThemeService,
    private resumenService: ResumenService,
    public datepipe: DatePipe) 
    {}
    
    ngAfterViewInit() {
      this.getDashboard(this.today)
       }
    
    getDashboard(date: any) {
      this.resumenService
      .getPaquetesDashboard(this.datepipe.transform(date, 'yyyy-MM-dd'))      
       .subscribe((resp: any) => {
        this.avance = resp.paquetes;
        //console.log(this.avance);

        this.avance.forEach((element) => {
          // console.log(element);
          switch (element.estatus) {
            case 'Entrada':
              this.entrada_c = element.cantidad;
              // console.log('Entrada', this.entrada_c);
              break;
            case 'Salida':
              this.salida_c = element.cantidad;
              //  console.log('Salida', this.salida_c);
              break;
            case 'Entregado':
              this.entregado_c = element.cantidad;
              //  console.log('Entregado', this.entregado_c);
              break;
            case 'Ruta':
              this.ruta_c = element.cantidad;
              // console.log('Ruta', this.ruta_c);
              break;
            case 'No entregado':
              this.excepcionado_c = element.cantidad;
              //console.log('Excepcionado', this.excepcionado_c);
              break;
            case 'Recolectado':
              this.recolectado_c = element.cantidad;
              //console.log('Excepcionado', this.excepcionado_c);
              break;
          }


        });
        this.recibido_c =
          +this.salida_c +
          +this.entregado_c +
          +this.excepcionado_c +
          +this.entrada_c +
          +this.recolectado_c;
     
        const timer = setTimeout(() => {

          this.faltantes = +this.entregado_c + +this.excepcionado_c;
                   
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
                    { value: this.salida_c, name: 'En ruta' },
                    { value: this.entregado_c, name: 'Entregado' },
                    { value: this.excepcionado_c, name: 'Excepcionado' },
                    { value: this.entrada_c, name: 'Alamacén' },
                    { value: this.recolectado_c, name: 'Recoletado' },
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
          
          
        }, 1000);
      });
  }




  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
