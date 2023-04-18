import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CodetotxtService {

  // https://open-meteo.com/en/docs#latitude=45.70&longitude=9.67&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=Europe%2FBerlin
  constructor() { }

  getDescription(code: number): string {
    switch (code) {
      case 0:
        return "Cielo sereno";
      case 1:
        return "Per lo più sereno";
      case 2:
        return "Parzialmente nuvoloso";
      case 3:
        return "Coperto";
      case 45:
        return "Nebbia";
      case 48:
        return "Nebbia depositante";
      case 51:
        return "Pioggerella: intensità leggera";
      case 53:
        return "Pioggerella: intensità moderata";
      case 55:
        return "Pioggerella: intensità forte";
      case 56:
        return "Pioggerellina gelante: intensità leggera";
      case 57:
        return "Pioggerellina gelante: intensità forte";
      case 61:
        return "Pioggia: intensità lieve";
      case 63:
        return "Pioggia: intensità moderata";
      case 65:
        return "Pioggia: intensità forte";
      case 66:
        return "Pioggia ghiacciata: intensità leggera";
      case 67:
        return "Pioggia ghiacciata: intensità forte";
      case 71:
        return "Neve: intensità lieve";
      case 73:
        return "Neve: intensità moderata";
      case 75:
        return "Neve: intensità forte";
      case 77:
        return "Granella di neve";
      case 80:
        return "Pioggia a intermittenza: intensità lieve";
      case 81:
        return "Pioggia a intermittenza: intensità moderata";
      case 82:
        return "Pioggia a intermittenza: intensità forte";
      case 85:
        return "Precipitazioni nevose leggere";
      case 86:
        return "Precipitazioni nevose forti";
      case 95:
        return "Temporale: intensità lieve o moderata";
      case 96:
        return "Temporale con grandine leggera";
      case 99:
        return "Temporale con grandine forte";
      default:
        return "Volano maiali";
    }
  }

}
