import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-cambios',
  templateUrl: './cambios.component.html',
  styleUrls: ['./cambios.component.scss']
})
export class CambiosComponent implements OnInit {

  materiales=[
    {
      id_material:"TUB-13",
      descripcion: "Tubería conduit de 13mm de diametro",
      unidad: "m",
      cantidad:"12",
      solicitado:"12",
      adicional:"3",
      
    },
    
    {
      id_material: "TUB-19",
      descripcion: "Tubería conduit de 19mm de diametro",
      unidad: "m",
      cantidad: "15",
      solicitado: "15",
      adicional: "3",
    },
    {
      id_material: "TUB-25",
      descripcion: "Tubería conduit de 25mm de diametro",
      unidad: "m",
      cantidad: "23",
      solicitado: "23",
      adicional: "3"
    }
  ]

  cambios =
   [
    {
      id_material: "TUB-13",
      descripcion: "Tubería conduit de 13mm de diametro",
      unidad: "m",
      cantidad: "12",
      solicitado: "12",
      adicional: "3",
    }   
  ]

  cambio =
    
      {
        id_material: "",
        descripcion: "",
        unidad: "",
        cantidad: "",
        solicitado: "",
        adicional: "",
      }
    


  constructor() { }

  ngOnInit(): void {

  //  console.log(this.materiales);
    
  }

  agregar(item1){

    this.materiales.forEach(element => {
     
      if(element.id_material ===  item1){
        this.cambio.id_material= element.id_material;
        this.cambio.descripcion = element.descripcion;
        this.cambio.unidad = element.unidad;
        this.cambio.adicional = this.cambio.adicional+1;
     }
      
    });

    this.cambios.forEach( item=>{
     if (this.cambio.id_material === item.id_material){
        console.log("Item:", item.id_material);
           item.adicional=item.adicional+1
      }else{
        this.cambios.push(this.cambio)
      }
    })
    }

    

}
