import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export function rangeComparisonValidator(options :{key1 : string , key2 : string}): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const key1 = formGroup.get(options.key1);
    const key2 = formGroup.get(options.key2);

    // Return null if controls haven't been created yet
    if (!key1 || !key2) {
      return null;
    }

    // Clear previous comparison errors to avoid stale state
    if (key2.hasError('key1LowerThankey2')) {
      const errors = { ...(key2.errors || {}) };
      delete errors['key1LowerThankey2'];
      key2.setErrors(Object.keys(errors).length ? errors : null);
    }

    // Only check comparison if both fields have values
    if (+key1.value !== null && +key2.value !== null) {
      if (+key2.value <= +key1.value) {
        // Set error on key2 control
        key2.setErrors({ 
          ...key2.errors, 
          key1LowerThankey2: true 
        });
        return { key1LowerThankey2: true };
      }
    }
    return null;
  };
}