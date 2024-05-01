import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface myDataArray {
  inventoryName: string;
  quantity: number;
}

const ELEMENT_DATA: myDataArray[] = [
  { inventoryName: 'Cars', quantity: 14 },
  { inventoryName: 'Books', quantity: 49 },
];

@Component({
  selector: 'app-payment.dialog',
  templateUrl: './payment.dialog.component.html',
  styleUrls: ['./payment.dialog.component.scss']
})
export class PaymentDialogComponent {
  paymentFormGroup: FormGroup;
  displayedColumns: string[] = ['concept'];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.paymentFormGroup = this.fb.group({
      concepts: this.fb.array([]) // Initialize an empty FormArray
    });

  }

  addItem() {
    const item = this.fb.group({
      paymentConcept: ['', Validators.required],
      unitPrize: [0, Validators.required],
      paymentMethod: ['', Validators.required],
      quantity: [1, Validators.required],
      subtotal: [0, Validators.required],
    });
    // Add the new form group to the FormArray
    this.concepts.push(item);
    console.log('AÑADIMOOOS', this.paymentFormGroup.value)
  }
  
  // Helper method to get the 'items' FormArray
  get concepts() {
    return this.paymentFormGroup.get('concepts') as FormArray;
  }


}
