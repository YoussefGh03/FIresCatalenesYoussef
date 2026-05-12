import { Component, Input, Output, EventEmitter } from '@angular/core'; // Ha de dir core, no common
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selector.html',
  styleUrl: './selector.css'
})
export class SelectorComponent {
  @Input() comarques: string[] = [];
  @Input() seleccionada: string = '';
  @Output() comarcaClicada = new EventEmitter<string>();

  seleccionar(comarca: string) {
    this.comarcaClicada.emit(comarca);
  }
}