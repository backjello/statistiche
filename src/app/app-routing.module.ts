import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeteotableComponent } from './components/meteotable/meteotable.component';
import { GraficoclimaComponent } from './components/graficoclima/graficoclima.component';

const routes: Routes = [
  {
    path:'meteo',
    component:MeteotableComponent
  },
  {
    path:'graficoclima',
    component:GraficoclimaComponent
  },
  {
    path:'', // se non si specifica una pagina si va al meteo
    component:MeteotableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
