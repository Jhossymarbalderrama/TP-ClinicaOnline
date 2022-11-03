import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroTurnosXNameEspecialista'
})
export class FiltroTurnosXNameEspecialistaPipe implements PipeTransform {

  transform(values: any[], arg: string): any[]{
    let result : any[] = [];

    if(!arg || arg?.length <1 || arg.trim() == ""){
      return values;    
    } 

    for (const value of values) {       
      if(value.especialista.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        result = [...result, value];
      }
    }

    return result;
  }

}
