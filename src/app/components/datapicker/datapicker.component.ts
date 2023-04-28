import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewEncapsulation} from '@angular/core';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-datapicker',
  templateUrl: './datapicker.component.html',
  styleUrls: ['./datapicker.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DatapickerComponent {

  @Output() dataScelta:EventEmitter<any> = new EventEmitter()
  form:FormGroup

  constructor(private fb:FormBuilder) { 
    this.form = this.fb.group({
      data:[moment(),Validators.required]
    })
  }

  setYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    console.log('setYear');
    const annoDaModificare = this.form.controls['data']
    const ctrlValue = annoDaModificare.value;
    ctrlValue?.year(normalizedMonthAndYear.year());
    annoDaModificare.setValue(ctrlValue);
    datepicker.close();
    this.dataScelta.emit( new Date(ctrlValue) )
  }

}
