import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';

@Component({
  selector: 'ngx-chartjs-line',
  template: `
    <chart type="line" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsLineComponent implements OnDestroy , OnInit{
  data: any;
  options: any;
  themeSubscription: any;
  labels:any[]=[];
  duracion:number;
  presupuesto:any[]=[];
  valor_ganado: any[] = [];
  costo_actual: any[] = [];

  constructor(private theme: NbThemeService) {}

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
  ngOnInit(): void {
    
    
    this.duracion=15 ;
    this.flabels(this.duracion)
    this.presupuesto=this.fll(this.duracion, 1, 5689)
    this.valor_ganado = this.fll(this.duracion, 1.3, 5689)
    this.costo_actual = this.fll(this.duracion, 0.8, 5689)
    //console.log("this.presupuesto", this.presupuesto, "Valor_ganado",this.valor_ganado, "Costo_actual", this.costo_actual);

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.data = {
        labels: this.labels,
        datasets: [{
          data: this.presupuesto,
          label: 'Presupuesto',
          backgroundColor: NbColorHelper.hexToRgbA(colors.primary, 0.3),
          borderColor: colors.primary,
        }, {
          data: this.valor_ganado,
          label: 'Valor ganado',
          backgroundColor: NbColorHelper.hexToRgbA(colors.danger, 0.3),
          borderColor: colors.danger,
        }, {
          data: this.costo_actual,
          label: 'Costo actual',
          backgroundColor: NbColorHelper.hexToRgbA(colors.info, 0.3),
          borderColor: colors.info,
        },
        ],
      };
      this.data.labels = this.labels

      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
        },
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
      };
    });

  }

  flabels(duracion){
    for (let index = 0; index < duracion; index++) {
      var val = this.labels.push(index)
     }
  }

  fll(duracion, rendimiento, presupuestado): any{
     var presupuesto1:any[]=[];
    for (let index = 0; index < duracion; index++) {
      var val1 =presupuesto1.push(this.fl(duracion, presupuestado, rendimiento, index))
    }  
    
    return presupuesto1
  }

  fl(dias, presupuesto, rendimiento, t) :number{
    var n0=1;
    var crecimiento = presupuesto * dias * rendimiento;
    var r = Math.pow(crecimiento, (1 / dias))-1
    var fl = (n0*presupuesto)/(n0+(presupuesto-n0)*Math.exp(-r*t)) 
    return fl
  }
}

