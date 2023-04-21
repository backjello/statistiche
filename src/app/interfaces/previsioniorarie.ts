export interface Previsioniorarie {
    temperature_2m : number[], //tutte e le temperature
    time: string[], // data e ora
    weathercode: number[], // codice meteo
}

export interface SingolaPrevisione {
    temperature_2m : number, //tutte e le temperature
    time: string, // data e ora
    weathercode: number, // codice meteo
}