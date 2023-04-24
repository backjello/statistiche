import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Citta } from '../interfaces/citta';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL  = "https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=Europe%2FBerlin&forecast_days=10"
  private API_GEO  = "https://geocoding-api.open-meteo.com/v1/search?count=10&language=it&format=json"
  private API_TEMP = "https://climate-api.open-meteo.com/v1/climate?daily=temperature_2m_mean&models=CMCC_CM2_VHR4"

  constructor(private http:HttpClient) { }

  getGrafico(latitude:number,longitude:number,dataInizio:string,dataFine:string){
    return this.http.get<any>(this.API_TEMP,{
      params:{
        // i nomi delle proprietà (a sinistra dei due punti) devono essere gli stessi forniti dalla doc
        latitude:latitude,
        longitude:longitude,
        start_date:dataInizio,
        end_date:dataFine
      }
    })
  }

  getMeteo(latitude:number,longitude:number){
    return this.http.get<any>(this.API_URL,{
      params:{
        latitude:latitude,
        longitude:longitude
      }
    })
  }

  getCities(citta:string){
    return this.http.get<any>(this.API_GEO,{
      params:{
        name:citta
      }
    })
  }

}
