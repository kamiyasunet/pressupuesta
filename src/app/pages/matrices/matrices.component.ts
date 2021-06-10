import { Component, OnInit, TemplateRef } from '@angular/core';
import { InsumosService } from '../../services/insumos.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import { expressionType } from '@angular/compiler/src/output/output_ast';
import { TreeMapModule } from '@swimlane/ngx-charts';
import { NbDialogService } from '@nebular/theme';


//https://github.com/ngdevelop-tech/angular-6-export-an-excel-file

@Component({
  selector: 'ngx-matrices',
  templateUrl: './matrices.component.html',
  styleUrls: ['./matrices.component.scss']
})
export class MatricesComponent implements OnInit {
  /*   [x: string]: any; */
  idConcepto: any;
  idfase: any;
  idfases: any;
  concepto: any = "";
  insumos: any[] = [];
  manoObra: any[] = [];
  herramienta: any[] = [];
  equipos: any[] = [];
  materiales: any[] = [];
  rendimiento: any
  totalmanoObra: any = 0;
  totalmateriales: any = 0;
  totalherramienta: any = 0;
  totalequipos: any = 0;
  costoDirecto: any;

  burry:boolean=false;
 
  


  title = 'angular-export-to-excel';

  dataForExcel = [];
  dataMO = [];

  empPerformance = [
    { ID: 10011, NAME: "A", DEPARTMENT: "Sales", MONTH: "Jan", YEAR: 2020, SALES: 132412, CHANGE: 12, LEADS: 35 },
    { ID: 10012, NAME: "A", DEPARTMENT: "Sales", MONTH: "Feb", YEAR: 2020, SALES: 232324, CHANGE: 2, LEADS: 443 },
    { ID: 10013, NAME: "A", DEPARTMENT: "Sales", MONTH: "Mar", YEAR: 2020, SALES: 542234, CHANGE: 45, LEADS: 345 },
    { ID: 10014, NAME: "A", DEPARTMENT: "Sales", MONTH: "Apr", YEAR: 2020, SALES: 223335, CHANGE: 32, LEADS: 234 },
    { ID: 10015, NAME: "A", DEPARTMENT: "Sales", MONTH: "May", YEAR: 2020, SALES: 455535, CHANGE: 21, LEADS: 12 },
  ];


  workbook = new Workbook();

  name = 'ngx-sharebuttons';
  compartido: boolean =false;
  esperar: boolean=false
  contador: any;


  constructor(
    private insumosService: InsumosService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: NbDialogService) {

  
     }

  ngOnInit(): void {
    this.idfase = this.route.snapshot.params.fase;
    this.idfases = this.route.snapshot.params.fases;
    this.idConcepto = this.route.snapshot.params.concepto;
    this.getConcepto(this.idConcepto);
    this.getInsumos(this.idConcepto);
  

   this.cambiarClase();

    
  }

  cambiarClase(){
    //console.log(this.burry);

    setTimeout(() => {
     // this.burry = true
    
    }, 1000);
    
     

  }

  closeModal(){

    if (this.compartido) {
      this.burry = false;
      setTimeout(() => {
        this.exportToExcel();
      }, 1000);
    }


  }
   

  isOpen(event){
    var n =0

    console.log(event, "Compartido1", this.compartido);
      
    if(event){

      this.esperar=true;

      var interval = setInterval(() => {
        this.contador = n
        if(n==6){
          clearInterval(interval);
          this.compartido = true;
          this.esperar = false;
        }
        n++
      }, 1000);
   
        

   
    }
   
   
  }

  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      { context: 'this is some additional data passed to dialog' });


  }


  getConcepto(idConcepto) {
    this.insumosService.getConcepto(idConcepto).subscribe(resp => {
      this.concepto = resp['concepto'][0];

    })
  }

  async getInsumos(idConcepto) {
    var renMo: any[] = [];

    this.insumosService.getInsumosConceptos(idConcepto).subscribe((resp: any) => {
      this.insumos = resp.insumos;
      if (resp) {

        this.insumos.forEach(item => {

          switch (item.unidad_insumo) {
            case "jor":
              this.manoObra.push((item))

              break;

            case "(%)mo":
              this.herramienta.push(item)

              break;

            case "hora":
              this.equipos.push(item)

              break;

            default:
              this.materiales.push((item))

              break;
          }

        });
        this.manoObra.forEach(element => {
          renMo.push(element.rendimiento_insumo)
        });
        this.rendimiento = renMo.sort().reverse()[0]
      }

      this.totalmanoObra = this.totales(this.manoObra);
      this.totalmateriales = this.totales(this.materiales);
      this.totalherramienta = this.totales(this.herramienta);
      this.totalequipos = this.totales(this.equipos);
      this.costoDirecto = this.totalmanoObra + this.totalmateriales + this.totalherramienta + this.totalequipos

    })

  }

  totales(array: any): number {

    var importeTotal = 0;
    array.forEach(element => {
      importeTotal = importeTotal + +element.total_insumo
    })

    return importeTotal;
  }

  gotoBack() {
    this.router.navigateByUrl(`/pages/conceptos/${this.idfase}/${this.idfases}`)
  }

  exportToExcel() {

    this.empPerformance.forEach((row: any) => {
      this.dataForExcel.push(Object.values(row))
    })

    let reportData = {
      title: 'Pressupuesta.com',
      data: this.dataForExcel,
      headers: Object.keys(this.dataForExcel[0])
    }

    this.exportExcel(reportData);


  }

  exportExcel(excelData) {

    //Title, Header & Data
    const title = "matriz_" + this.concepto.clave;
    const header = excelData.headers
    const data = excelData.data;

    let totalMateriales = 0;
    let totalMO = 0;
    let totalHerramieta = 0;
    let totalEquipo = 0;

    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet(this.concepto.clave);

    worksheet.getColumn(3).width = 30;
    worksheet.getColumn(8).width = 15;

    // titulo
    worksheet.mergeCells('A2', 'H2');
    let titleRowM = worksheet.getCell('A2');
    titleRowM.value = "Análisis de precio unitario"
    titleRowM.font = {
      name: 'Calibri',
      size: 16,

      bold: true,
      color: { argb: '' }
    }
    titleRowM.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'AAB7B8' },
      bgColor: { argb: '' }
    }
    titleRowM.alignment = { vertical: 'middle', horizontal: 'center' }

    let in1 = worksheet.getCell('A3');
    in1.value = "Clave"
    in1.font = {
      name: 'Calibri',
      size: 10,
      bold: true
    }
    in1.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '85929E' },
      bgColor: { argb: '' }
    }
    in1.alignment = { vertical: 'middle', horizontal: 'center' }

    worksheet.mergeCells('B3', 'F3');
    let in2 = worksheet.getCell('B3');
    in2.value = "Descripción"
    in2.font = {
      name: 'Calibri',
      size: 10,
      bold: true
    }
    in2.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '85929E' },
      bgColor: { argb: '' }
    }
    in2.alignment = { vertical: 'middle', horizontal: 'center' }

    let in3 = worksheet.getCell('G3');
    in3.value = "Unidad"
    in3.font = {
      name: 'Calibri',
      size: 10,
      bold: true
    }
    in3.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '85929E' },
      bgColor: { argb: '' }
    }
    in3.alignment = { vertical: 'middle', horizontal: 'center' }

    let in5 = worksheet.getCell('H3');
    in5.value = "Rendimiento"
    in5.font = {
      name: 'Calibri',
      size: 10,
      bold: true
    }
    in5.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '85929E' },
      bgColor: { argb: '' }
    }
    in5.alignment = { vertical: 'middle', horizontal: 'center' }

    let m1 = worksheet.getCell('A4');
    m1.value = this.concepto.clave
    m1.font = {
      name: 'Calibri',
      size: 10,
      bold: true
    }
    m1.alignment = { vertical: 'middle', horizontal: 'center' }

    worksheet.mergeCells('B4', 'F4');
    let m2 = worksheet.getCell('B4');
    m2.value = this.concepto.descripcion
    m2.font = {
      name: 'Calibri',
      size: 10,
      bold: true
    }
    worksheet.getRow(4).height = 70;
    m2.alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }

    let m3 = worksheet.getCell('G4');
    m3.value = this.concepto.unidad
    m3.font = {
      name: 'Calibri',
      size: 10,
      bold: true
    }
    m3.alignment = { vertical: 'middle', horizontal: 'center' }

    let m4 = worksheet.getCell('H4');
    m4.value = this.rendimiento
    m4.font = {
      name: 'Calibri',
      size: 10,
      bold: true
    }
    m4.alignment = { vertical: 'middle', horizontal: 'center' }



    // Insumos
    // Materiales


    //Headers
    let e1 = worksheet.getCell('A5');
    e1.value = "Clave"
    e1.font = {
      name: 'Calibri',
      size: 10,
      bold: true

    }
    e1.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '85929E' },
      bgColor: { argb: '' }
    }
    e1.alignment = { vertical: 'middle', horizontal: 'center' }

    worksheet.mergeCells('B5', 'D5');
    let e2 = worksheet.getCell('B5');
    e2.value = "Descripción"
    e2.font = {
      name: 'Calibri',
      size: 10,
      bold: true
    }
    e2.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '85929E' },
      bgColor: { argb: '' }
    }
    e2.alignment = { vertical: 'middle', horizontal: 'center' }

    let e3 = worksheet.getCell('E5');
    e3.value = "Unidad"
    e3.font = {
      name: 'Calibri',
      size: 10,
      bold: true
    }
    e3.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '85929E' },
      bgColor: { argb: '' }
    }
    e3.alignment = { vertical: 'middle', horizontal: 'center' }

    let e4 = worksheet.getCell('F5');
    e4.value = "Cantidad"
    e4.font = {
      name: 'Calibri',
      size: 10,
      bold: true
    }
    e4.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '85929E' },
      bgColor: { argb: '' }
    }
    e4.alignment = { vertical: 'middle', horizontal: 'center' }

    let e41 = worksheet.getCell('G5');
    e41.value = "Costo"
    e41.font = {
      name: 'Calibri',
      size: 10,
      bold: true
    }
    e41.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '85929E' },
      bgColor: { argb: '' }
    }
    e41.alignment = { vertical: 'middle', horizontal: 'center' }

    let e5 = worksheet.getCell('H5');
    e5.value = "Importe"
    e5.font = {
      name: 'Calibri',
      size: 10,
      bold: true
    }
    e5.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '85929E' },
      bgColor: { argb: '' }
    }
    e5.alignment = { vertical: 'middle', horizontal: 'center' }

    //Materiales


    worksheet.mergeCells('A6', 'H6');
    let titleMat = worksheet.getCell('A6');
    titleMat.value = "Materiales"
    titleMat.font = {
      name: 'Calibri',
      size: 12,
      bold: true,
      color: { argb: '' }
    }
    titleMat.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'AAB7B8' },
      bgColor: { argb: '' }
    }
    titleMat.alignment = { vertical: 'middle', horizontal: 'center' }

    //Llenado de mano de obra

    let rowIndexM = 7;

    this.materiales.forEach(ma => {

      let em1 = worksheet.getCell(`A${rowIndexM}`);
      em1.value = ma.clave_insumo
      em1.font = {
        name: 'Calibri',
        size: 9

      }
      em1.alignment = { vertical: 'middle', horizontal: 'center' }


      worksheet.mergeCells(`B${rowIndexM}`, `D${rowIndexM}`);
      let em2 = worksheet.getCell(`B${rowIndexM}`);
      em2.value = ma.descripcion_insumo
      em2.font = {
        name: 'Calibri',
        size: 9
      }
      em2.alignment = { vertical: 'middle', horizontal: 'center' }

      let em3 = worksheet.getCell(`E${rowIndexM}`);
      em3.value = ma.unidad_insumo
      em3.font = {
        name: 'Calibri',
        size: 9
      }
      em3.alignment = { vertical: 'middle', horizontal: 'center' }

      let em4 = worksheet.getCell(`F${rowIndexM}`);
      em4.value = +ma.cantidad_insumo
      em4.font = {
        name: 'Calibri',
        size: 9
      }
      em4.alignment = { vertical: 'middle', horizontal: 'center' }

      let em5 = worksheet.getCell(`G${rowIndexM}`);
      em5.numFmt = '$ 0.00'
      em5.value = +ma.costo_unitario_insumo
      em5.font = {
        name: 'Calibri',
        size: 9
      }
      em5.alignment = { vertical: 'middle', horizontal: 'center' }

      let resultado = +ma.cantidad_insumo * +ma.costo_unitario_insumo;
      // console.log(resultado);


      let em6 = worksheet.getCell(`H${rowIndexM}`);
      //em6.value = resultado

      em6.value = { formula: `F${rowIndexM}*G${rowIndexM}`, date1904: false };
      em6.numFmt = '$ 0.00'

      em6.font = {
        name: 'Calibri',
        size: 9
      }
      em6.alignment = { vertical: 'middle', horizontal: 'center' }


      rowIndexM = rowIndexM + 1;
      totalMateriales = totalMateriales + resultado;


    });


    //Total materieales

    worksheet.mergeCells(`A${rowIndexM}`, `G${rowIndexM}`);

    let totMat2 = worksheet.getCell(`H${rowIndexM}`);
    totMat2.value = { formula: `SUM(H7:H${rowIndexM - 1})`, date1904: false };
    totMat2.numFmt = '$ 0.00'
    //totMat2.value = "Total Materiales: " + totalMateriales.toFixed(2);
    totMat2.font = {
      name: 'Calibri',
      size: 12,
      bold: true,
      color: { argb: '' }
    }

    totMat2.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '85929E' },
      bgColor: { argb: '' }
    }
    totMat2.alignment = { vertical: 'middle', horizontal: 'center' }

    let totMat1 = worksheet.getCell(`A${rowIndexM}`);
    totMat1.value = "Total materiales: ";
    totMat1.font = {
      name: 'Calibri',
      size: 12,
      bold: true,
      color: { argb: '' }
    }

    totMat1.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '85929E' },
      bgColor: { argb: '' }
    }
    totMat1.alignment = { vertical: 'middle', horizontal: 'right' }


    //// Mano Obra Titulo

    worksheet.mergeCells(`A${rowIndexM + 1}`, `H${rowIndexM + 1}`);
    let titleIns = worksheet.getCell(`A${rowIndexM + 1}`);
    titleIns.value = "Mano de Obra"
    titleIns.font = {
      name: 'Calibri',
      size: 12,
      bold: true,
      color: { argb: '' }
    }

    titleIns.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'AAB7B8' },
      bgColor: { argb: '' }
    }
    titleIns.alignment = { vertical: 'middle', horizontal: 'center' }

    //Llenado de mano de obra

    let rowIndex = rowIndexM + 2
    this.manoObra.forEach(mo => {

      let e1 = worksheet.getCell(`A${rowIndex} `);
      e1.value = mo.clave_insumo
      e1.font = {
        name: 'Calibri',
        size: 9

      }
      e1.alignment = { vertical: 'middle', horizontal: 'center' }

      worksheet.mergeCells(`B${rowIndex}`, `D${rowIndex}`);
      let e2 = worksheet.getCell(`B${rowIndex}`);
      e2.value = mo.descripcion_insumo
      e2.font = {
        name: 'Calibri',
        size: 9
      }
      e2.alignment = { vertical: 'middle', horizontal: 'center' }

      let e3 = worksheet.getCell(`E${rowIndex}`);
      e3.value = mo.unidad_insumo
      e3.font = {
        name: 'Calibri',
        size: 9
      }
      e3.alignment = { vertical: 'middle', horizontal: 'center' }

      let e4 = worksheet.getCell(`F${rowIndex}`);
      e4.value = +mo.cantidad_insumo
      
      e4.font = {
        name: 'Calibri',
        size: 9
      }
      e4.alignment = { vertical: 'middle', horizontal: 'center' }

      let e5 = worksheet.getCell(`G${rowIndex}`);
      e5.value = +mo.costo_unitario_insumo
      e5.numFmt = '$ 0.00'
      e5.font = {
        name: 'Calibri',
        size: 9
      }
      e5.alignment = { vertical: 'middle', horizontal: 'center' }

      let resultadoMO = +mo.cantidad_insumo * +mo.costo_unitario_insumo
      // console.log(resultado);


      let e6 = worksheet.getCell(`H${rowIndex}`);
      e6.value = { formula: `F${rowIndex}*G${rowIndex}`, date1904: false };

      //e6.value = Math.round(resultadoMO);

      e6.font = {
        name: 'Calibri',
        size: 9
      }
      e6.alignment = { vertical: 'middle', horizontal: 'center' }


      rowIndex = rowIndex + 1;
    //  totalMO = totalMO + resultadoMO


    });

    //Total mano de obra

    worksheet.mergeCells(`A${rowIndex}`, `G${rowIndex}`);

    let totMo2 = worksheet.getCell(`H${rowIndex}`);
    totMo2.value = { formula: `SUM(H${rowIndexM + 1}:H${rowIndex -1})`, date1904: false   };
    totMo2.numFmt = '$ 0.00'

    totMo2.font = {
      name: 'Calibri',
      size: 12,
      bold: true,
      color: { argb: '' }
    }

    totMo2.fill = {

      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '85929E' },
      bgColor: { argb: '' }
    }
    totMo2.alignment = { vertical: 'middle', horizontal: 'center' }

    let totMo1 = worksheet.getCell(`A${rowIndex}`);
    totMo1.value = "Total Mano obra: ";
    totMo1.font = {
      name: 'Calibri',
      size: 12,
      bold: true,
      color: { argb: '' }
    }

    totMo1.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '85929E' },
      bgColor: { argb: '' }
    }
    totMo1.alignment = { vertical: 'middle', horizontal: 'right' }


    //  Herramienta..



    //// Herramienta Titulo

    worksheet.mergeCells(`A${rowIndex + 1}`, `H${rowIndex + 1}`);
    let titleHerr = worksheet.getCell(`A${rowIndex + 1}`);
    titleHerr.value = "Herramienta"
    titleHerr.font = {
      name: 'Calibri',
      size: 12,
      bold: true,
      color: { argb: '' }
    }

    titleHerr.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'AAB7B8' },
      bgColor: { argb: '' }
    }
    titleHerr.alignment = { vertical: 'middle', horizontal: 'center' }

    //Llenado de herramienta

    let rowIndexH = rowIndex + 2
    this.herramienta.forEach(he => {

      let e1 = worksheet.getCell(`A${rowIndexH} `);
      e1.value = he.clave_insumo
      e1.font = {
        name: 'Calibri',
        size: 9

      }
      e1.alignment = { vertical: 'middle', horizontal: 'center' }

      worksheet.mergeCells(`B${rowIndexH}`, `D${rowIndexH}`);
      let e2 = worksheet.getCell(`B${rowIndexH}`);
      e2.value = he.descripcion_insumo
      e2.font = {
        name: 'Calibri',
        size: 9
      }
      e2.alignment = { vertical: 'middle', horizontal: 'center' }

      let e3 = worksheet.getCell(`E${rowIndexH}`);
      e3.value = he.unidad_insumo
      e3.font = {
        name: 'Calibri',
        size: 9
      }
      e3.alignment = { vertical: 'middle', horizontal: 'center' }

      let e4 = worksheet.getCell(`F${rowIndexH}`);
      e4.value = +he.cantidad_insumo
      e4.font = {
        name: 'Calibri',
        size: 9
      }
      e4.alignment = { vertical: 'middle', horizontal: 'center' }

      let e5 = worksheet.getCell(`G${rowIndexH}`);
      e5.value = +he.costo_unitario_insumo
      e5.numFmt = '$ 0.00'
      e5.font = {
        name: 'Calibri',
        size: 9
      }
      e5.alignment = { vertical: 'middle', horizontal: 'center' }

      let resultadoMO = +he.cantidad_insumo * +he.costo_unitario_insumo
      // console.log(resultado);


      let e6 = worksheet.getCell(`H${rowIndexH}`);
      e6.value =   { formula: `F${rowIndexH}*G${rowIndexH}`, date1904: false };
      //e6.value = Math.round(resultadoMO);

      e6.font = {
        name: 'Calibri',
        size: 9
      }
      e6.alignment = { vertical: 'middle', horizontal: 'center' }


      rowIndexH = rowIndexH + 1;
      totalMO = totalMO + resultadoMO


    });

    //Total Herra

    worksheet.mergeCells(`A${rowIndexH}`, `G${rowIndexH}`);

    let totHe = worksheet.getCell(`H${rowIndexH}`);
    totHe.value = { formula: `SUM(H${rowIndex + 1}:H${rowIndexH - 1})`, date1904: false  };
    totHe.numFmt = '$ 0.00'
    //totHe.value = { formula: 'A1+C1', date1904: false };

    totHe.font = {
      name: 'Calibri',
      size: 12,
      bold: true,
      color: { argb: '' }
    }

    totHe.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '85929E' },
      bgColor: { argb: '' }
    }
    totHe.alignment = { vertical: 'middle', horizontal: 'center' }

    let totHe1 = worksheet.getCell(`A${rowIndexH}`);
    totHe1.value = "Total Herramieta: ";
    totHe1.font = {
      name: 'Calibri',
      size: 12,
      bold: true,
      color: { argb: '' }
    }

    totHe1.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '85929E' },
      bgColor: { argb: '' }
    }
    totHe1.alignment = { vertical: 'middle', horizontal: 'right' }



    // equipos..


    //// equipos Titulo

    worksheet.mergeCells(`A${rowIndexH + 1}`, `H${rowIndexH + 1}`);
    let titleEq = worksheet.getCell(`A${rowIndexH + 1}`);
    titleEq.value = "Equipos"
    titleEq.font = {
      name: 'Calibri',
      size: 12,
      bold: true,
      color: { argb: '' }
    }

    titleEq.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'AAB7B8' },
      bgColor: { argb: '' }
    }
    titleEq.alignment = { vertical: 'middle', horizontal: 'center' }

    //Llenado de equipos

    let rowIndexE = rowIndexH + 2
    this.equipos.forEach(eq => {

      let e1 = worksheet.getCell(`A${rowIndexE} `);
      e1.value = eq.clave_insumo
      e1.font = {
        name: 'Calibri',
        size: 9

      }
      e1.alignment = { vertical: 'middle', horizontal: 'center' }

      worksheet.mergeCells(`B${rowIndexE}`, `D${rowIndexE}`);
      let e2 = worksheet.getCell(`B${rowIndexE}`);
      e2.value = eq.descripcion_insumo
      e2.font = {
        name: 'Calibri',
        size: 9
      }
      e2.alignment = { vertical: 'middle', horizontal: 'center' }

      let e3 = worksheet.getCell(`E${rowIndexE}`);
      e3.value = eq.unidad_insumo
      e3.font = {
        name: 'Calibri',
        size: 9
      }
      e3.alignment = { vertical: 'middle', horizontal: 'center' }

      let e4 = worksheet.getCell(`F${rowIndexE}`);
      e4.value = +eq.cantidad_insumo
      e4.font = {
        name: 'Calibri',
        size: 9
      }
      e4.alignment = { vertical: 'middle', horizontal: 'center' }

      let e5 = worksheet.getCell(`G${rowIndexE}`);
      e5.value = +eq.costo_unitario_insumo
      e5.numFmt = '$ 0.00'
      e5.font = {
        name: 'Calibri',
        size: 9
      }
      e5.alignment = { vertical: 'middle', horizontal: 'center' }

      let resultadoE = +eq.cantidad_insumo * +eq.costo_unitario_insumo
      // console.log(resultado);


      let e6 = worksheet.getCell(`H${rowIndexE}`);

      e6.value =  { formula: `F${rowIndexE}*G${rowIndexE}`, date1904: false };

   

      e6.font = {
        name: 'Calibri',
        size: 9
      }
      e6.alignment = { vertical: 'middle', horizontal: 'center' }


      rowIndexE = rowIndexE + 1;
     // totalEQ = totalEQ + resultadoE


    });

    //Total Equipos

    let totEq = worksheet.getCell(`H${rowIndexE}`);
    worksheet.mergeCells(`A${rowIndexE}`, `G${rowIndexE}`);

  
  
      totEq.value = { formula: `SUM(H${rowIndexH + 1}:H${rowIndexE - 1})`, date1904: false };
    totEq.numFmt = '$ 0.00'

  

    totEq.font = {
      name: 'Calibri',
      size: 12,
      bold: true,
      color: { argb: '' }
    }

    totEq.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '85929E' },
      bgColor: { argb: '' }
    }
    totEq.alignment = { vertical: 'middle', horizontal: 'center' }

    let totEq1 = worksheet.getCell(`A${rowIndexE}`);
    totEq1.value = "Total Equipos: ";
    totEq1.font = {
      name: 'Calibri',
      size: 12,
      bold: true,
      color: { argb: '' }
    }

    totEq1.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '85929E' },
      bgColor: { argb: '' }
    }
    totEq1.alignment = { vertical: 'middle', horizontal: 'right' }
    


    // Total costo directo
   
    let rowIndexCd = rowIndexE+2
    let totCDT = worksheet.getCell(`H${rowIndexCd}`);
    
    totCDT.value = { formula: `H${rowIndexM}+H${rowIndex}+H${rowIndexH}+H${rowIndexE}`, date1904: false };
    totCDT.numFmt = '$ 0.00'

   totCDT.font = {
      name: 'Calibri',
      size: 12,
      bold: true,
      color: { argb: '' }
    }

   totCDT.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '85929E' },
      bgColor: { argb: '' }
    }
   totCDT.alignment = { vertical: 'middle', horizontal: 'center' }

    
    let totCD = worksheet.getCell(`A${rowIndexCd}`);
    worksheet.mergeCells(`A${rowIndexCd}`, `G${rowIndexCd}`);
    totCD.value = "Total Costo Directo: ";
    totCD.font = {
      name: 'Calibri',
      size: 12,
      bold: true,
      color: { argb: '' }
    }

    totCD.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '85929E' },
      bgColor: { argb: '' }
    }
    totCD.alignment = { vertical: 'middle', horizontal: 'right' }
//////////////////////////////////////////////////////////////////////////////////
    //INDIRECTOS DE OFICINA
    //Indirectos oficina titulo

    let rowIndexIndOf = rowIndexCd + 2
    let indirectosOf = worksheet.getCell(`A${rowIndexIndOf}`);
    worksheet.mergeCells(`A${rowIndexIndOf}`, `C${rowIndexIndOf}`);
    indirectosOf.value = "Indirectos de oficina ";
    indirectosOf.font = {
      name: 'Calibri',
      size: 12,
     
    }
   
    indirectosOf.alignment = { vertical: 'middle', horizontal: 'right' }

    //Indirectos oficina pocentaje
  
    let indirectosOfP = worksheet.getCell(`G${rowIndexIndOf}`);
    indirectosOfP.numFmt = '0.00%';
    indirectosOfP.value = 0 //.numFmt = '0.00%';
       indirectosOfP.font = {
      name: 'Calibri',
      size: 12,
      }

    indirectosOfP.alignment = { vertical: 'middle', horizontal: 'center' }

    //Indirectos oficina importe

    let indirectosOfImp = worksheet.getCell(`H${rowIndexIndOf}`);
    indirectosOfImp.value = { formula: `G${rowIndexIndOf}*H${rowIndexCd}`, date1904: false };
    indirectosOfImp.numFmt = '$ 0.00';
    indirectosOfImp.font = {
      name: 'Calibri',
      size: 12,
    }
    indirectosOfImp.alignment = { vertical: 'middle', horizontal: 'center' }


    //INDIRECTOS DE Campo
    //Indirectoscampo titulo

    let rowIndexIndCam = rowIndexIndOf + 1
    let indirectosCamp = worksheet.getCell(`A${rowIndexIndCam}`);
    worksheet.mergeCells(`A${rowIndexIndCam}`, `C${rowIndexIndCam}`);
    indirectosCamp.value = "Indirectos de campo ";
    indirectosCamp.font = {
      name: 'Calibri',
      size: 12,
     

    }
   
    indirectosCamp.alignment = { vertical: 'middle', horizontal: 'right' }

    //Indirectos oficina pocentaje
  
    let indirectosCampP = worksheet.getCell(`G${rowIndexIndCam}`);
    indirectosCampP.numFmt = '0.00%';
    indirectosCampP.value = 0 //.numFmt = '0.00%';
       indirectosCampP.font = {
      name: 'Calibri',
      size: 12,
      }

    indirectosCampP.alignment = { vertical: 'middle', horizontal: 'center' }

    //Indirectos oficina importe

    let indirectosCampImp = worksheet.getCell(`H${rowIndexIndCam}`);
    indirectosCampImp.value = { formula: `G${rowIndexIndCam}*H${rowIndexCd}`, date1904: false };
    indirectosCampImp.numFmt = '$ 0.00';
    indirectosCampImp.font = {
      name: 'Calibri',
      size: 12,
    }
    indirectosCampImp.alignment = { vertical: 'middle', horizontal: 'center' }



    //INDIRECTOS subtotal indirectos
    //Indirectoscampo titulo

    let rowIndexSubind = rowIndexIndCam + 1
    let indirectosSub = worksheet.getCell(`A${rowIndexSubind    }`);
    worksheet.mergeCells(`A${rowIndexSubind    }`, `C${rowIndexSubind    }`);
     indirectosSub.value = "Subtotal Indirectos ";
     indirectosSub.font = {
      name: 'Calibri',
      size: 12,
      bold: true,

    }

     indirectosSub.alignment = { vertical: 'middle', horizontal: 'right' }

   //Subtotal indirectos importe

    let  indirectosSubImp = worksheet.getCell(`H${rowIndexSubind    }`);
    indirectosSubImp.value = { formula: `H${rowIndexSubind - 1}+H${rowIndexSubind - 2} + H${rowIndexCd}`, date1904: false };
    indirectosSubImp.numFmt = '$ 0.00';
     indirectosSubImp.font = {
      name: 'Calibri',
      size: 12,
       bold: true,
    }
     indirectosSubImp.alignment = { vertical: 'middle', horizontal: 'center' }



//////////////////////////////////////////////////////////////////////
    //Finaniciamiento
    //financiamiento titulo

    let rowIndexFinanciamiento = rowIndexSubind + 1
    let financiamienito = worksheet.getCell(`A${rowIndexFinanciamiento}`);
    worksheet.mergeCells(`A${rowIndexFinanciamiento}`, `C${rowIndexFinanciamiento}`);
    financiamienito.value = "Financiamiento";
    financiamienito.font = {
      name: 'Calibri',
      size: 12,

      
    }

    financiamienito.alignment = { vertical: 'middle', horizontal: 'right' }

    //financiamiento pocentaje

    let financiamienitoP = worksheet.getCell(`G${rowIndexFinanciamiento}`);
    financiamienitoP.numFmt = '0.00%';
    financiamienitoP.value = 0 //.numFmt = '0.00%';
    financiamienitoP.font = {
      name: 'Calibri',
      size: 12,
    }

    financiamienitoP.alignment = { vertical: 'middle', horizontal: 'center' }

    //financiamiento importe

    let financiamienitoImp = worksheet.getCell(`H${rowIndexFinanciamiento}`);
    financiamienitoImp.value = { formula: `H${rowIndexSubind}*G${ rowIndexFinanciamiento }`, date1904: false };
    financiamienitoImp.numFmt = '$ 0.00';
    financiamienitoImp.font = {
      name: 'Calibri',
      size: 12,
    }
    financiamienitoImp.alignment = { vertical: 'middle', horizontal: 'center' }

    // subtotal fianciamiento
    //subtotal fianciamiento titulo

    let rowIndexSubFinanciamiento = rowIndexFinanciamiento + 1
    let financiamientoSub = worksheet.getCell(`A${rowIndexSubFinanciamiento}`);
    worksheet.mergeCells(`A${rowIndexSubFinanciamiento}`, `C${rowIndexSubFinanciamiento}`);
    financiamientoSub.value = "Subtotal Financiamiento ";
    financiamientoSub.font = {
      name: 'Calibri',
      size: 12,
      bold: true,

    }

    financiamientoSub.alignment = { vertical: 'middle', horizontal: 'right' }

      let financiamientoSubImp = worksheet.getCell(`H${rowIndexSubFinanciamiento}`);
    financiamientoSubImp.value = { formula: `H${rowIndexSubFinanciamiento - 1} + H${rowIndexSubFinanciamiento - 2}`, date1904: false };
    financiamientoSubImp.numFmt = '$ 0.00';
    financiamientoSubImp.font = {
      name: 'Calibri',
      size: 12,
      bold: true,
    }
    financiamientoSubImp.alignment = { vertical: 'middle', horizontal: 'center' }

    ///////////////////////////////////////

    //Utilidad
    //utilidad titulo

    let rowIndexUtilidad = rowIndexSubFinanciamiento  + 1
    let utilidad = worksheet.getCell(`A${rowIndexUtilidad}`);
    worksheet.mergeCells(`A${rowIndexUtilidad}`, `C${rowIndexUtilidad}`);
    utilidad.value = "Utilidad";
    utilidad.font = {
      name: 'Calibri',
      size: 12,

    
    }

    utilidad.alignment = { vertical: 'middle', horizontal: 'right' }

    //utilidad pocentaje

    let utilidadP = worksheet.getCell(`G${rowIndexUtilidad}`);
    utilidadP.numFmt = '0.00%';
    utilidadP.value = 0 //.numFmt = '0.00%';
    utilidadP.font = {
      name: 'Calibri',
      size: 12,
      
    }

    utilidadP.alignment = { vertical: 'middle', horizontal: 'center' }

    //utilidad importe

    let utilidadImp = worksheet.getCell(`H${rowIndexUtilidad}`);
    utilidadImp.value = { formula: `H${rowIndexSubFinanciamiento}*G${rowIndexUtilidad}`, date1904: false };
    utilidadImp.numFmt = '$ 0.00';
    utilidadImp.font = {
      name: 'Calibri',
      size: 12,
      
    }
    utilidadImp.alignment = { vertical: 'middle', horizontal: 'center' }

    // subtotal utilidad
    //subtotal utilidad titulo

    let rowIndexSubUtilidad = rowIndexUtilidad + 1
    let UtilidadSub = worksheet.getCell(`A${rowIndexSubUtilidad}`);
    worksheet.mergeCells(`A${rowIndexSubUtilidad}`, `C${rowIndexSubUtilidad}`);
    UtilidadSub.value = "Subtotal utilidad ";
    UtilidadSub.font = {
      name: 'Calibri',
      size: 12,
      bold: true,

    }

    UtilidadSub.alignment = { vertical: 'middle', horizontal: 'right' }

    let UtilidadSubImp = worksheet.getCell(`H${rowIndexSubUtilidad}`);
    UtilidadSubImp.value = { formula: `H${rowIndexSubUtilidad - 1} + H${rowIndexSubUtilidad - 2}`, date1904: false };
    UtilidadSubImp.numFmt = '$ 0.00';
    UtilidadSubImp.font = {
      name: 'Calibri',
      size: 12,
      bold: true,
    }
    UtilidadSubImp.alignment = { vertical: 'middle', horizontal: 'center' }



    ///////////////////////////////////////

    //Contingencia
    //Contingencia titulo

    let rowIndexContingencia = rowIndexSubUtilidad + 1
    let Contingencia = worksheet.getCell(`A${rowIndexContingencia}`);
    worksheet.mergeCells(`A${rowIndexContingencia}`, `C${rowIndexContingencia}`);
    Contingencia.value = "Contingencia";
    Contingencia.font = {
      name: 'Calibri',
      size: 12,
     
    }

    Contingencia.alignment = { vertical: 'middle', horizontal: 'right' }

    //Contingencia pocentaje

    let ContingenciaP = worksheet.getCell(`G${rowIndexContingencia}`);
    ContingenciaP.numFmt = '0.00%';
    ContingenciaP.value = 0 //.numFmt = '0.00%';
    ContingenciaP.font = {
      name: 'Calibri',
      size: 12,

    }

    ContingenciaP.alignment = { vertical: 'middle', horizontal: 'center' }

    //Contingencia importe

    let ContingenciaImp = worksheet.getCell(`H${rowIndexContingencia}`);
    ContingenciaImp.value = { formula: `H${rowIndexSubUtilidad}*G${rowIndexContingencia}`, date1904: false };
    ContingenciaImp.numFmt = '$ 0.00';
    ContingenciaImp.font = {
      name: 'Calibri',
      size: 12,
     
    }
    ContingenciaImp.alignment = { vertical: 'middle', horizontal: 'center' }

    // Precio unitario
    //Precio unitario titulo

    let rowIndexSubprecio = rowIndexContingencia + 1
    let precioSub = worksheet.getCell(`A${rowIndexSubprecio}`);
    worksheet.mergeCells(`A${rowIndexSubprecio}`, `G${rowIndexSubprecio}`);
  
    precioSub.value = "Precio Unitario ";
    precioSub.font = {
      name: 'Calibri',
      size: 14,
      bold: true,

    }
    precioSub.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '85929E' },
      bgColor: { argb: '' }
    }

    precioSub.alignment = { vertical: 'middle', horizontal: 'right' }
   
    let precioSubImp = worksheet.getCell(`H${rowIndexSubprecio}`);
    precioSubImp.value = { formula: `H${rowIndexSubprecio - 1} + H${rowIndexSubprecio - 2}`, date1904: false };
    precioSubImp.numFmt = '$ 0.00';
    precioSubImp.font = {
      name: 'Calibri',
      size: 14,
      bold: true,
     
    }

    precioSubImp.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '85929E' },
      bgColor: { argb: '' }
    }
    precioSubImp.alignment = { vertical: 'middle', horizontal: 'center' }

    /////////////////////////////////////////////////////////////////////////

    

    worksheet.addRow([]);

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    //Footer Row
    let footerRow = worksheet.addRow(['pressupuesta.com']);
    footerRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFB050' }
    };
    footerRow.alignment = { vertical: 'middle', horizontal: 'center' }



    //Merge Cells
    worksheet.mergeCells(`A${footerRow.number}:H${footerRow.number}`);

    //Generate & Save Excel File

    var FileSaver = require('file-saver');
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, title + '.xlsx');
    })

  }

}
