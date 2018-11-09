
import { FormGroup } from '@angular/forms';

// Custom validator for comparing if start clip time is lesser than the ending clip time
export function isClipRangeValid(
  group: FormGroup ) {
   let startInput = group.controls['start'];
   let endInput = group.controls['end'];

   console.log( startInput.value  +  '<' + endInput.value );
   if (startInput.value >= endInput.value) {
     return startInput.setErrors( { rangeNotValid: true} );
   }else{
     startInput.setErrors(null);
     return null;
   }
}
