import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'statistiche';
  data: any

  impostaData(d:any){
    console.log('nuova data '+d);
    this.data = d
  }

  // this.api.getStat(data)
}