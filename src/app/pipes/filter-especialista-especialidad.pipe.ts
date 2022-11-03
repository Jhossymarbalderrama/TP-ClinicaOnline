import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterEspecialistaEspecialidad'
})
export class FilterEspecialistaEspecialidadPipe implements PipeTransform {

  transform(values: any[], arg: any): any[] {
    let result: any[] = []

    for (const value of values) {
        if(value.especialidad.indexOf(arg) > -1){
          result = [...result, value];
        }
    }

    return result;
  }



}
