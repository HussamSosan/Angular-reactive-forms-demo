import { Validators, AbstractControl, ValidatorFn } from "@angular/forms";

export class AppBaseComponent {
  showNotification = false;
  notificationText = "";

  //To access Validators class in html file
  Validators() {
    return Validators;
  }

  //Display notification message
  notify(msg: string) {
    this.notificationText = msg;
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    }, 2000);
  }

  //Get variable name
  Name(object) {
    return Object.keys({ object })[0];
  }

  //Shared validator
  specialStringValidator(specialString: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return <string>control.value
        ? (<string>control.value).includes(specialString)
          ? {
              specialStringValidator: {
                error: "special string validation error"
              }
            }
          : null
        : null;
    };
  }

  //List of validators to use with hasError
  ValidatorsList: any = {
    required: "required",
    specialStringValidator: "specialStringValidator"
  };

  addValidator(validator) {
    this.ValidatorsList = { ...this.ValidatorsList, validator };
  }

  EnumToDropDown(_enum) {
    let dropDownDtoList = new Array<DropDownDto>();
    for (const value in _enum) {
      if (!isNaN(Number(value))) {
        let dropDownDto = new DropDownDto();
        dropDownDto.label = _enum[value];
        dropDownDto.value = Number(value);
        dropDownDtoList.push(dropDownDto);
      }
    }

    return dropDownDtoList;
  }
}

export class DropDownDto {
  value: number;
  label: string;
}
