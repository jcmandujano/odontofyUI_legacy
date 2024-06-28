import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[appCurrencyMask]'
})
export class CurrencyFormatDirectiveDirective {
  private previousValue: string | null = null;

  constructor(private el: ElementRef<HTMLInputElement>) { }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    // Elimina caracteres no numéricos del valor de entrada
    const cleanValue = value.replace(/[^\d.-]/g, '');
    this.el.nativeElement.value = cleanValue; // Actualiza el valor del input limpio
    this.previousValue = cleanValue; // Almacena el valor limpio para comparación posterior
  }

  @HostListener('blur')
  onBlur() {
    // Aplica el formato de moneda al valor cuando se pierde el foco del input
    if (this.previousValue !== null) {
      const formattedValue = this.formatCurrency(this.previousValue);
      this.el.nativeElement.value = formattedValue; // Actualiza el valor del input con el formato de moneda
      this.previousValue = null; // Reinicia el valor previo
    }
  }

  private formatCurrency(value: string): string {
    if (!value) return '';

    const numberValue = parseFloat(value);
    if (isNaN(numberValue)) return '';

    return numberValue.toLocaleString('es-MX', {
      style: 'currency',
      currency: 'MXN'
    });
  }
}