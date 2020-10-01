import { Component } from "@angular/core";
import { StoreGroupService, StoreGroup } from "./storegroup.service";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidatorFn,
  AsyncValidatorFn,
  ValidationErrors
} from "@angular/forms";
import { AppBaseComponent } from "./AppBaseComponent";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

enum StoregroupIdentifier {
  Record,
  Trademark,
  Agency
}

@Component({
  selector: "storegroup-component",
  templateUrl: "./storegroup.component.html"
})
export class StoregroupComponent extends AppBaseComponent {
  StoregroupIdentifier = StoregroupIdentifier;
  //converting enum to dropdown list
  storegroupIdentifierList = this.EnumToDropDown(StoregroupIdentifier);
  StoreGroups: StoreGroup[] = [];

  //using built in validator
  //using custom sync validator
  //using custom async validator
  storegroupNameControl = new FormControl(
    "",
    [Validators.required, this.specialStringValidator("abc")],
    [this.isValidName()]
  );

  priceFromControl = new FormControl(undefined, [Validators.required]);
  priceToControl = new FormControl(undefined, [Validators.required]);
  storegroupIdentifier = new FormControl(undefined, [Validators.required]);
  tradMarkControl = new FormControl(undefined, [Validators.required]);

  storgroupForm = new FormGroup({
    storegroupNameControl: this.storegroupNameControl,
    priceFromControl: this.priceFromControl,
    priceToControl: this.priceToControl,
    storegroupIdentifier: this.storegroupIdentifier,
    tradMarkControl: this.tradMarkControl
  });

  constructor(private _StoreGroupService: StoreGroupService) {
    super();

    this.addValidator({ priceRangeValidator: "priceRangeValidator" });

    //using cross controls valiadtor
    this.storgroupForm.setValidators([this.priceRangeValidator(this)]);

    this.loadStoregroups();

    //set control value without trigerring change event
    this.storegroupIdentifier.valueChanges.subscribe(() => {
      this.tradMarkControl.setValue(undefined, { emitEvent: false });
    });

    //track control value change
    this.tradMarkControl.valueChanges.subscribe(() => {
      console.log(this.tradMarkControl.value);
    });
  }

  addStoregroup() {
    //mark controls as touched
    this.storgroupForm.markAllAsTouched();
    if (this.storgroupForm.valid) {
      //extract and cast data from form
      this._StoreGroupService
        .addStoreGroup(<StoreGroup>{
          Name: this.storegroupNameControl.value,
          Stores: []
        })
        .subscribe(result => {
          if (result) {
            //clear form controls with form.reset()
            this.storgroupForm.reset();
            this.notify("storegroup added");
            this.loadStoregroups();
          }
        });
    }
  }

  loadStoregroups() {
    this._StoreGroupService.getAll().subscribe(result => {
      this.StoreGroups = result;
    });
  }

  //disable control and stop validation
  isTradeMarkControlVisible() {
    if (this.storegroupIdentifier.value === StoregroupIdentifier.Trademark) {
      this.tradMarkControl.enable({ emitEvent: false });
      return true;
    } else {
      this.tradMarkControl.disable({ emitEvent: false });
      return false;
    }
  }

  priceRangeValidator(self): ValidatorFn {
    return (currentControl: AbstractControl): { [key: string]: any } => {
      return self.priceFromControl.value > self.priceToControl.value
        ? {
            priceRangeValidator: { error: "priceRangeValidator" }
          }
        : null;
    };
  }

  isValidName(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      return this._StoreGroupService
        .isValidName(control.value)

        .pipe(
          map((response: boolean) =>
            response === false
              ? null
              : { isValidName: { error: "isValidName" } }
          )
        );
    };
  }
}
