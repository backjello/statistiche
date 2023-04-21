import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Citta } from 'src/app/interfaces/citta';
import { Previsioniorarie, SingolaPrevisione } from 'src/app/interfaces/previsioniorarie';
import { ApiService } from 'src/app/services/api.service';
import { CodetotxtService } from 'src/app/services/codetotxt.service';

@Component({
  selector: 'app-meteotable',
  templateUrl: './meteotable.component.html',
  styleUrls: ['./meteotable.component.css']
})
export class MeteotableComponent {


  meteo7giorni! : Previsioniorarie // rappresenta il meteo per X giorni
  meteoCorrente : Previsioniorarie = { // rappresenta il meteo attualmente visualizzato
    time:[],
    weathercode:[],
    temperature_2m:[]
  } 
  meteoGiornaliero:any = {} // riassunto del meteo per i giorni

  colonneMostrate:string[] = ['ora','meteo','temperatura']
  datiTabella: SingolaPrevisione[] =[] 
  dateDisponibili:string[]=[]
  giornoMostrato:number = 0 //il giorno del quale sto mostrando il meteo

  constructor(private api:ApiService, public codeService:CodetotxtService) { 
  }

  getDati(nuovaCitta: Citta) {
    this.dateDisponibili = [] //reset date disponibili
    this.api.getMeteo(nuovaCitta.latitude,nuovaCitta.longitude).subscribe((res)=>{
      this.meteo7giorni = res.hourly // salvo il meteo di tutti e 7 i giorni (lunghezza di 168 elementi (24*7))
      //copiamo i dati del meteo di oggi
      this.meteoCorrente.temperature_2m = this.meteo7giorni.temperature_2m.slice(0,24)
      this.meteoCorrente.time = this.meteo7giorni.time.slice(0,24)
      this.meteoCorrente.weathercode = this.meteo7giorni.weathercode.slice(0,24)
      this.preparaDati()
      for (let index = 0; index < 240; index = index + 24) {
        this.dateDisponibili.push( //aggiungo le date per i 7 giorni successivi
          this.meteo7giorni.time[index]
        )
      }
      this.meteoGiornaliero = res.daily
    })
  }

  preparaDati(giorno:number = 0){ // {a:[...],b[...],c[....]} -> [{a:'',b:1,c:''},...]
    this.giornoMostrato = giorno // aggiorno il giorno mostrato (per i bottoni)
    var indice = giorno * 24 // setto l'indice dal quale partire
    const INDICE_FINALE = indice + 24 // setto l'indice dove fermarmi
    this.datiTabella = [] // resetto i dati
    for (let i = indice; i < INDICE_FINALE; i++) {
      this.datiTabella.push({
        temperature_2m: this.meteo7giorni.temperature_2m[i],
        time:           this.meteo7giorni.time[i],
        weathercode:    this.meteo7giorni.weathercode[i]
      })
    }
  }
}
