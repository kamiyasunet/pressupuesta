import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filtro', 
})
export class FiltroPipe implements PipeTransform {
   
    transform(arreglo: any[],texto: string, campo:string): any[] {
    
     if (!texto) {return arreglo}
     
       return arreglo.filter((item) => {

           return item[campo].toLowerCase().includes(texto.toLowerCase());

        });
    }
}