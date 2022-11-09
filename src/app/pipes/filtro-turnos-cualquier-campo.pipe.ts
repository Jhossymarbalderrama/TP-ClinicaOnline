import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroTurnosCualquierCampo'
})
export class FiltroTurnosCualquierCampoPipe implements PipeTransform {

  //Values Lista de turnos del paciente
  transform(values: any[], arg: any): any[] {
    let result : any[] = [];

    if(!arg || arg?.length <1 || arg.trim() == ""){
      return values;    
    } 

    // console.log(values);
    // console.log("dentro de pipe");
    for (const value of values) {       
      if(
        value.calificacion_atencion.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||

        value.comentario_cancelacion?.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||

        (value.encuesta.calificacion)?.toString().toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        value.encuesta.pregunta?.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||

        value.especialidad.toLowerCase().indexOf(arg.toLowerCase()) > -1  ||

        value.especialista.apellido.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        (value.especialista.dni).toString().toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        // value.especialista.especialidad.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        value.especialista.id.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        value.especialista.mail.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        value.especialista.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||

        value.estado_turno.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||

        value.fecha[0].toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        value.fecha[1].toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        value.fecha[2].toLowerCase().indexOf(arg.toLowerCase()) > -1 ||


        value?.historiaClinica?.altura.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        value?.historiaClinica?.peso.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        value?.historiaClinica?.presion.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        value?.historiaClinica?.temperatura.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||

        value?.historiaClinica?.datos_1[0].toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        value?.historiaClinica?.datos_1[1].toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        value?.historiaClinica?.datos_2[0].toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        value?.historiaClinica?.datos_2[1].toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        value?.historiaClinica?.datos_3[0].toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        value?.historiaClinica?.datos_3[1].toLowerCase().indexOf(arg.toLowerCase()) > -1 ||

        value.id.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||

        value.paciente.apellido.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        (value.paciente.dni).toString().toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        (value.paciente.edad).toString().toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        value.paciente.id.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        value.paciente.mail.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        value.paciente.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        value.paciente.obra_social.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||

        value.resenea.toLowerCase().indexOf(arg.toLowerCase()) > -1 
        ){      
        result = [...result, value];
      }
    }


    return result;
  }

}
