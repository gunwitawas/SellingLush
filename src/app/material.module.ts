// material.module.ts
import {NgModule} from '@angular/core';
import {
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule, NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule
  ],
  exports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule
  ],
  providers: [MatDatepickerModule],
})

export class MaterialModule { }

export class AppDateAdapter extends NativeDateAdapter {

  format(date: Date, displayFormat: Object): string {

    if (displayFormat === 'input') {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return `${day}-${month}-${year}`;
    }

    return date.toDateString();
  }
}

export const APP_DATE_FORMATS =
  {
    parse: {
      dateInput: {month: 'short', year: 'numeric', day: 'numeric'},
    },
    display: {
      dateInput: 'input',
      monthYearLabel: {year: 'numeric', month: 'numeric'},
      dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
      monthYearA11yLabel: {year: 'numeric', month: 'long'},
    }
  };
