import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CheckboxDesratizacionComponent } from '../checkbox-desratizacion/checkbox-desratizacion.component';
import { FormatLabelPipe } from '../pipes/format-label.pipe';

@Component({
  selector: 'app-quoter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormatLabelPipe, CheckboxDesratizacionComponent],
  templateUrl: './quoter.component.html',
  styleUrl: './quoter.component.scss',
})
export class QuoterComponent {
  cotizadorForm: FormGroup;
  totalMateriales: number = 0;
  costoTotal: number = 0;
  precioNeto: number = 0;
  precioConIgv: number = 0;
  desratizacionValue: number = 0;

  constructor(private fb: FormBuilder) {
    this.cotizadorForm = this.fb.group({
      manoObra: [90],
      DesinfectanteExquat: [15],
      movilidad: [50],
      epp: [41.67],
      rupi: [40],
      alquilerMaquina: [0],
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
    const desinsectacionCost = valores.desinsectacion === 'clase1' ? 80 : 95;
    const desratizacionCeboCost = valores.desratizacionCebo === 'ceboAvena' ? 20 : 7.5;
    const desratizacionTrampasCost = valores.desratizacionTrampas === 'beta' ? 25 : valores.desratizacionTrampas === 'rejilla' ? 40 : 6;
    this.totalMateriales = desinsectacionCost + desratizacionCeboCost + desratizacionTrampasCost;
    this.costoTotal = valores.manoObra + this.totalMateriales + valores.movilidad + valores.epp + valores.rupi + valores.alquilerMaquina + valores.emo + valores.supervision + valores.contingencia + valores.certificado + valores.baldesGasolinaAceite + valores.depreciacionEquipo;
    const gastosAdministrativos = (valores.gastosAdministrativos / 100) * this.costoTotal;
    this.costoTotal += gastosAdministrativos;
    const margen = (valores.margen / 100) * this.costoTotal;
    this.precioNeto = this.costoTotal + margen;
    this.precioConIgv = this.precioNeto * valores.igv;
  } 

  updateReceived(n: number) {
    this.desratizacionValue = n;
  }

}
