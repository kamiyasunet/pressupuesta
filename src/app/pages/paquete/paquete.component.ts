import { Component, OnInit, ViewChild } from '@angular/core';
import { PaqueteService } from '../../services/paquete.service';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { NgForm } from '@angular/forms';
import { PaqueteModule } from './paquete.module';
import Swal from 'sweetalert2';


@Component({
  selector: 'ngx-paquete',
  templateUrl: './paquete.component.html',
  styleUrls: ['./paquete.component.scss']
})
export class PaqueteComponent implements OnInit {

  @ViewChild("stepper") stepper: PaqueteComponent;

  token: string;
  idUsuario: string;
  tipoUsuario: string;
  paquete: any;
  evidencias: any[] = [];
  ruta: boolean = false;
  entrada: boolean = false;
  entregado: boolean = false;
  noEntregado: boolean = false;
  movimientos: any[] = [];
  map = null;
  argumento: string = null;
  title = 'My first AGM project';
  lat = 19.414957;
  lng = -99;
/*   pMlat: number;
  pMlng: number; */
  items: any[];
  pMlat = 19.414957;
  pMlng = -99;
  constructor(
    private paqueteService: PaqueteService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    public gallery: Gallery,
    ) {}

  ngOnInit(): void {
    this.argumento = this.route.snapshot.params.id;
    console.log ("Argumento: ",this.argumento);
        this.usuarioService.cargarStorage().then(() => {
      this.token = this.usuarioService.token;
      this.idUsuario = this.usuarioService.idUsuario;
      this.tipoUsuario = this.usuarioService.tipoUsuario;
       console.log(this.token, this.idUsuario, this.tipoUsuario);
      this.getMovimientos(this.token, this.idUsuario, this.argumento);
      this.getEvidencias(this.token, this.idUsuario, this.argumento);
      this.getPaquete(this.token, this.idUsuario, this.argumento);
    });
  }
  stepperIndex: number = 0; // here 0 is initial index
  backToSelectPackage() {
    this.stepperIndex = this.stepperIndex + 1; // here 0 is navigate index
    console.log(this.stepperIndex);
  }
  reset() {
    this.stepperIndex = 0 // here 0 is navigate index
    console.log(this.stepperIndex);
    this.stepper.reset();
  }
  getPaquete(token: string, usuario: string, id: string) {
    this.paqueteService.getPaquete(token, usuario, id).subscribe((resp) => {
      this.paquete = resp[0];
      // console.log(this.paquete);
    });
  }
  getMovimientos(token: string, usuario: string, id: string) {
   this.stepperIndex=  0;
    this.paqueteService
      .getMovimientos(token, usuario, id)
      .subscribe((resp: any) => {
        console.log(resp.movimientos);
        this.movimientos = resp.movimientos;
        // this.puntoMedio(this.movimientos);
        this.movimientos.forEach((element) => {
          switch (element.estatus) {
            case 'Ruta':
              element.color = '#ffffb2';
              break;
            case 'Entrada':
              element.color = '#BADA55';
              break;
            case 'Entregado':
              element.color = '#cc99cc';
              this.pMlat = Number(element.lat);
              this.pMlng = Number(element.lng);
              //console.log('Entregado', this.pMlat, '_', this.pMlgn)
              break;
            case 'No Entregado':
              element.color = '#ffb2b2';
              this.pMlat = Number(element.lat);
              this.pMlng = Number(element.lng);
              //console.log('No_entregado', this.pMlat, '_', this.pMlgn);
              break;
            default:
              break;
          }
          console.log(this.movimientos);
        });

        if (
          this.movimientos.findIndex((mov) => mov.estatus === 'Salida') >= 0
        ) {
          this.entrada = true;
           console.log("Entrada",this.entrada);
                 }
        if (this.movimientos.findIndex((mov) => mov.estatus === 'Ruta') >= 0) {
          this.ruta = true;
          console.log("ruta", this.ruta);
               }
        if (
          this.movimientos.findIndex((mov) => mov.estatus === 'Entregado') >= 0
        ) {
         this.entregado = true;
          console.log("entregado", this.entregado);
           }
        if (
          this.movimientos.findIndex((mov) => mov.estatus === 'No Entregado') >=0
        ) {
          this.noEntregado = true;
          console.log("noEntregado", this.noEntregado);
           }
      });

   
      
  }
  getEvidencias(token: string, usuario: string, id: string) {
    this.paqueteService.getEvidencias(id).subscribe((resp: any) => {
      this.evidencias = resp.evidencias;
      // console.log(token, usuario, id);
      // console.log(resp);
      this.items = this.evidencias;
     // const galleryRef = this.gallery.ref();
    //  galleryRef.load(this.items);
    });
  }
  async paqueteUpdate(fRegistro: NgForm) {
    if (fRegistro.invalid) {
      //console.log('formulario invalido');
      return;
    }
    const valido = await this.paqueteService
      .actualizarPaquete(
        this.token,
        this.idUsuario,
        this.argumento,
        this.paquete.direccion,
        this.paquete.codigo_postal,
        this.paquete.cliente,
        this.paquete.telefono,
        this.paquete.tipo,
        this.paquete.cod,
        this.paquete.tamano,
        this.paquete.zona
      )
      .subscribe((resp) => {
        console.log(resp);

        if (!resp['error']) {
          Swal.fire('Actualizado!', 'Los datos fueron actualizados', 'success');
        }
      });
  }


}
