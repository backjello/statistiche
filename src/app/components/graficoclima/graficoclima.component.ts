import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chart } from 'chart.js/auto';
import { Citta } from 'src/app/interfaces/citta';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-graficoclima',
  templateUrl: './graficoclima.component.html',
  styleUrls: ['./graficoclima.component.css']
})
export class GraficoclimaComponent {

  form: FormGroup
  citta!: Citta
  temperature: number[] = [] // temperature dei vari giorni
  giorni: string[] = [] // date dei giorni
  grafico!:Chart

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.form = fb.group({
      dataInizio: ["", Validators.required],
      dataFine: ["", Validators.required]
    })
  }

  setCitta(c: Citta) {
    this.citta = c
  }

  submit() {
    var DATA_INIZIO: Date = this.form.value.dataInizio
    var DATA_FINE: Date = this.form.value.dataFine

    // prendo solamente i primi 10 caratteri
    var inizio = DATA_INIZIO.toISOString().slice(0, 10)
    var fine = DATA_FINE.toISOString().slice(0, 10)
    console.log('stringa', inizio, fine)
    // AAAA-MM-DD

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
    for (let i = 0; i < this.temperature.length / 365; i++) {
      const INDICE_INIZIO = i * 365
      const INDICE_FINE = INDICE_INIZIO + 365
      var somma = 0
      for (let j = INDICE_INIZIO; j < INDICE_FINE; j++) {
        somma = somma + this.temperature[j]
      }
      var media = somma / 365
      MEDIE.push(media)

      var anno = this.giorni[INDICE_INIZIO] // 01-01-1990 -> 1990
      anno = anno.slice(0,4) // se no indice finale si va fino alla fine
      ANNI.push(anno)
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
    const INIZIO: Date = this.form.value.dataInizio
    const FINE: Date = this.form.value.dataFine
    // se la data di inizio è maggiore della fine blocco l'esecuzione
    return INIZIO.getTime() > FINE.getTime()
  }

}  