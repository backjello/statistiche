import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL = "https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=Europe%2FBerlin&forecast_days=10"
  private API_GEO = "https://geocoding-api.open-meteo.com/v1/search?count=10&language=it&format=json"

  constructor(private http:HttpClient) { }

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
