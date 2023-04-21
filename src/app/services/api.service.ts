import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL = "https://api.open-meteo.com/v1/forecast?latitude=45.69&longitude=9.80&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=Europe%2FBerlin"

  constructor(private http:HttpClient) { }

  getMeteo(){
    return this.http.get<any>(this.API_URL)
  }

}
