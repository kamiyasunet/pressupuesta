export interface Actividad {

    id_actividad?: number;
    actividad?: string;
    zona?: string;
    fase?: string;
    descripcion?: string;
    comienzo?: string;
    termino?: string;
    progreso?: Number;
    presupuesto?: string;
    valor_ganado?: string;
    costo_actual?: string;
    horas_hombre?: string;
    nivel?:string

}

export interface AvanceNuevo {
    id_avance?: string;
    fecha?: string;
    porcentaje?: string;
    elemento?:any[]
   
}
export interface ElementoNuevo{
   elemento?: string
   puesto?: string,
   cantidad?: string,
}