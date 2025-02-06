import { Component, output } from '@angular/core';

@Component({
  selector: 'app-checkbox-desinsectacion',
  imports: [],
  templateUrl: './checkbox-desinsectacion.component.html',
  styleUrl: './checkbox-desinsectacion.component.scss'
})
export class CheckboxDesinsectacionComponent {
  // Variable para controlar si el checkbox está activado
      isCheckboxChecked: boolean = false;
    
      // Variable para almacenar la opción seleccionada de los radio buttons
      selectedOption: number = 0;
    
      sendOption = output<number>();
    
      // Método para manejar el cambio en el checkbox
      onCheckboxChange(event: any): void {
        this.isCheckboxChecked = event.target.checked;
    
        // Si el checkbox se desactiva, se limpia la selección de los radio buttons
        if (!this.isCheckboxChecked) {
          this.selectedOption = 0;
          this.sendOption.emit(this.selectedOption);
        }
      }
    
      // Método para manejar el cambio en los radio buttons
      onRadioChange(event: any): void {
        this.selectedOption = event.target.value;
        this.sendOption.emit(this.selectedOption);
      }
}
