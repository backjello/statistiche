import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Citta } from 'src/app/interfaces/citta';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css']
})
export class RicercaComponent{
  
  ricerca: string = "albino";
  datiCitta: Citta[] = []
  @Output() cambioCitta: EventEmitter<Citta> = new EventEmitter()
  
  constructor(private api:ApiService) { }
  
  cittaScelta(citta: Citta) {
    this.cambioCitta.emit(citta)
    this.ricerca = ""
    this.datiCitta = []
  }

  cerca() {
    this.api.getCities(this.ricerca).subscribe((res)=>{
      console.log(res)
      this.datiCitta = res.results
    })
  }

}
