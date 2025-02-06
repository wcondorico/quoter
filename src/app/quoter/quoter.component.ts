import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CheckboxDesratizacionComponent } from '../checkbox-desratizacion/checkbox-desratizacion.component';
import { CheckboxDesinfeccionComponent } from '../checkbox-desinfeccion/checkbox-desinfeccion.component';
import { CheckboxDesinsectacionComponent } from '../checkbox-desinsectacion/checkbox-desinsectacion.component';

@Component({
  selector: 'app-quoter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CheckboxDesratizacionComponent, CheckboxDesinfeccionComponent, CheckboxDesinsectacionComponent],
  templateUrl: './quoter.component.html',
  styleUrl: './quoter.component.scss',
})
export class QuoterComponent {
  cotizadorForm: FormGroup;
  totalMateriales: number = 0;
  movilidad: number = 0;
  costoTotal: number = 0;
  precioNeto: number = 0;
  precioConIgv: number = 0;
  desratizacionValue: number = 0;
  desinfeccionValue: number = 0;
  desinsectacionValue: number = 0;

  constructor(private fb: FormBuilder) {
    this.cotizadorForm = this.fb.group({
      metros: [1000],
      epp: [41.67],
      rupi: [40],
      emo: [20],
      supervision: [0],
      contingencia: [100],
      certificado: [20],
      baldesGasolinaAceite: [25],
      depreciacionEquipo: [20],
      gastosAdministrativos: [15],
      margen: [30],
      igv: [1.18]
    });
  }

  calcular(): void {
    const valores = this.cotizadorForm.value;
    const manoDeObra = valores.metros <= 1000 ? 90 : (valores.metros*90)/1000; //mano de obra en funcion de los metros
    const desratizacion = (valores.metros*this.desratizacionValue)/1000; //precio de desratizacion en funcion de los metros
    const desinsectacion = (valores.metros*this.desinsectacionValue)/1000; //precio de desinsectacion en funcion de los metros
    const desinfeccion = (valores.metros*this.desinfeccionValue)/1000; //precio de desinfeccion en funcion de los metros
    this.totalMateriales = desratizacion + desinsectacion + desinfeccion;
    this.costoTotal = manoDeObra + this.totalMateriales + this.movilidad + valores.epp + valores.rupi + valores.alquilerMaquina + valores.emo + valores.supervision + valores.contingencia + valores.certificado + valores.baldesGasolinaAceite + valores.depreciacionEquipo;
    const gastosAdministrativos = (valores.gastosAdministrativos / 100) * this.costoTotal;
    this.costoTotal += gastosAdministrativos;
    const margen = (valores.margen / 100) * this.costoTotal;
    this.precioNeto = this.costoTotal + margen;
    this.precioConIgv = this.precioNeto * valores.igv;
  } 

  updateDesratizacion(n: number) {
    this.desratizacionValue = n;
  }

  updateDesinfeccion(n: number) {
    this.desinfeccionValue = n;
  }

  updateDesinsectacion(n: number) {
    this.desinsectacionValue = n;
  }

  onMovilidadChanges(event: any) {
    this.movilidad = event.target.value;
  }
}
