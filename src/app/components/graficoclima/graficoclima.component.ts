import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chart } from 'chart.js/auto';
import { Citta } from 'src/app/interfaces/citta';
import { ApiService } from 'src/app/services/api.service';
import { ViewEncapsulation} from '@angular/core';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
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
  selector: 'app-graficoclima',
  templateUrl: './graficoclima.component.html',
  styleUrls: ['./graficoclima.component.css'],
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
export class GraficoclimaComponent {

  form: FormGroup
  citta!: Citta
  temperature: number[] = [] // temperature dei vari giorni
  giorni: string[] = [] // date dei giorni
  grafico!:Chart
  constructor(private fb: FormBuilder, private api: ApiService) {
    this.form = fb.group({
      dataInizio: [moment(), Validators.required],
      dataFine: [moment(), Validators.required]
    })
  }

  setYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>, inizioOrFine:'dataInizio'|'dataFine') {
    console.log('setYear');
    const annoDaModificare = this.form.controls[inizioOrFine]
    const ctrlValue = annoDaModificare.value;
    // ctrlValue?.month(normalizedMonthAndYear.month());
    ctrlValue?.year(normalizedMonthAndYear.year());
    annoDaModificare.setValue(ctrlValue);
    datepicker.close();
  }

  setCitta(c: Citta) {
    this.citta = c
  }

  submit() {
    var DATA_INIZIO: Date =  new Date( this.form.value.dataInizio )
    var DATA_FINE: Date = new Date( this.form.value.dataFine )
    // DATA_INIZIO.setMonth(0)
    // DATA_INIZIO.setDate(1)
    // DATA_FINE.setMonth(11)
    // DATA_FINE.setDate(31)
    // 1° metodo con Date / 2° metodo con string
    // prendo solamente i primi 10 caratteri
    var inizio = DATA_INIZIO.toISOString().slice(0, 4) // prediamo solamente l'anno
    var fine = DATA_FINE.toISOString().slice(0, 4)
    inizio = inizio + "-01-01"
    fine = fine + "-12-31"
    console.log('stringa', inizio, fine)
    // AAAA-MM-DD // AAAA-01-01 / AAAA-12-31

    this.api.getGrafico(
      this.citta.latitude,
      this.citta.longitude,
      inizio,
      fine
    ).subscribe((res) => {
      console.log(res)
      this.temperature = res.daily.temperature_2m_mean
      this.giorni = res.daily.time
      this.creaGrafico()
    })
  }

  creaGrafico() {
    // [15,20,25, 17,22,27] -> [20,22]
    // [01-01-1990... 01-01-2000] -> [1990,2000]
    const MEDIE:number[] = []
    const ANNI:string[] = []
    var nAnniBisestili = 0
    var giorniDiTroppo = this.temperature.length%365 // n giorni di troppo
    for (let i = 0; i < ((this.temperature.length - giorniDiTroppo) / 365); i++) {
      const INDICE_INIZIO = i * 365 + nAnniBisestili
      var anno: string | number = this.giorni[INDICE_INIZIO] // AAAA-MM-DD
      anno = anno.slice(0,4)
      anno = parseInt(anno)
      var giorniAnno = 365
      if( anno%4 == 0 ){ //anno bisestile
        giorniAnno ++ // l'anno ha 366 giorni
        nAnniBisestili ++ // aumento il numero di anni bisestili trovati
      } 
      const INDICE_FINE = INDICE_INIZIO + giorniAnno
      var somma = 0
      for (let j = INDICE_INIZIO; j < INDICE_FINE; j++) {
        somma = somma + this.temperature[j]
      }
      var media = somma / giorniAnno
      MEDIE.push(media)
      ANNI.push(anno.toString())
    }

    const DATA = {
      labels: ANNI,
      datasets:[{
        label:'Temperatura Media Annuale',
        data: MEDIE
      }]
    }
    if(!this.grafico) // se non ho creato il grafico lo creo
      this.grafico = new Chart("areaGrafico",{
        type:'line',
        data:DATA
      })
    else{ // se ho già un grafico lo aggiorno
      this.grafico.data = DATA
      this.grafico.update()
    }
  }
  controllaDate(): boolean {
    const INIZIO: Date = new Date(this.form.value.dataInizio)
    const FINE: Date = new Date(this.form.value.dataFine)
    // se la data di inizio è maggiore della fine blocco l'esecuzione
    return INIZIO.getTime() > FINE.getTime()
  }

}  