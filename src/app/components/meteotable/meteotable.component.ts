import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Previsioniorarie, SingolaPrevisione } from 'src/app/interfaces/previsioniorarie';
import { ApiService } from 'src/app/services/api.service';
import { CodetotxtService } from 'src/app/services/codetotxt.service';

@Component({
  selector: 'app-meteotable',
  templateUrl: './meteotable.component.html',
  styleUrls: ['./meteotable.component.css']
})
export class MeteotableComponent {

  meteo7giorni! : Previsioniorarie // rappresenta il meteo per 7 giorni
  meteoCorrente : Previsioniorarie = { // rappresenta il meteo attualmente visualizzato
    time:[],
    weathercode:[],
    temperature_2m:[]
  } 
  colonneMostrate:string[] = ['ora','meteo','temperatura']
  datiTabella: SingolaPrevisione[] =[] 

  constructor(private api:ApiService, public codeService:CodetotxtService) { 
    this.api.getMeteo().subscribe((res)=>{
      this.meteo7giorni = res.hourly // salvo il meteo di tutti e 7 i giorni (lunghezza di 168 elementi (24*7))
      //copiamo i dati del meteo di oggi
      this.meteoCorrente.temperature_2m = this.meteo7giorni.temperature_2m.slice(0,24)
      this.meteoCorrente.time = this.meteo7giorni.time.slice(0,24)
      this.meteoCorrente.weathercode = this.meteo7giorni.weathercode.slice(0,24)
      this.preparaDati()
      console.log(this.meteoCorrente)
    })
  }
  preparaDati(){ // {a:[...],b[...],c[....]} -> [{a:'',b:1,c:''},...]
    const INDICE_FINALE = 24
    for (let i = 0; i < INDICE_FINALE; i++) {
      this.datiTabella.push({
        temperature_2m:this.meteoCorrente.temperature_2m[i],
        time:this.meteoCorrente.time[i],
        weathercode:this.meteoCorrente.weathercode[i]
      })
    }
  }
}
