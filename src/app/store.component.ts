import { Component } from "@angular/core";
import { StoreGroupService, StoreGroup, Store } from "./storegroup.service";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidatorFn
} from "@angular/forms";
import { AppBaseComponent } from "./AppBaseComponent";

@Component({
  selector: "store-component",
  templateUrl: "./store.component.html"
})
export class StoreComponent extends AppBaseComponent {
  nameControl = new FormControl("", [Validators.required]);
  storegroupControl = new FormControl("", [Validators.required]);

  storeForm = new FormGroup({
    nameControl: this.nameControl,
    storegroupControl: this.storegroupControl
  });

  storegroupsList: StoreGroup[] = [];

  constructor(private _StoreGroupService: StoreGroupService) {
    super();

    this._StoreGroupService.getAll().subscribe(result => {
      this.storegroupsList = result;
    });
  }

  addStore() {
    this._StoreGroupService
      .addStoreToStoreGroup(this.storegroupControl.value, <Store>{
        Name: this.nameControl.value
      })
      .subscribe(result => {
        if (result) {
          this.storeForm.reset();
          this.notify("storegroup added");
        }
      });
  }
}
