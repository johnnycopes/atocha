import { FormControl } from '@angular/forms';

/*
  A mapped type that accepts a form model type and returns
  a new type with every property wrapped in a FormControl.
  This new type can be passed as a type argument into a FormGroup.
*/
export type Form<TModel> = Required<{
  [Property in keyof TModel]: FormControl<TModel[Property]>;
}>;
