import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mainhome',
  templateUrl: './mainhome.component.html',
  styleUrls: ['./mainhome.component.css']
})
export class MainhomeComponent {
  mostrarTextoCompleto = false;
  textoResumido = 'Los Consultorios de Psicología se establecen como un espacio del Programa de Psicología de la Universidad de Ibagué; ahora parte del Centro de Servicios en Psicología de la Universidad, se renombró como Unidad de Atención Clínica y Psicosocial; orientado al desarrollo social, a través del servicio de atención psicológica a la población Tolimense, creando estrategias de abordaje en los diferentes contextos, a partir de las diversas formas de intervención (asesoría, evaluación, diagnóstico, psicoterapia, consultoría, investigación, prevención y promoción) posibilitando así, cambios y transformaciones que contribuyan al mejoramiento de la calidad de vida y la salud mental de la región.<br> A su vez permite la exploración y la consolidación teórico-práctica del proceso formativo profesional de los estudiantes de pregrado y postgrado de nuestra Universidad.';
  textoCompleto = 'Los Consultorios de Psicología se establecen como un espacio del Programa de Psicología de la Universidad de Ibagué; ahora parte del Centro de Servicios en Psicología de la Universidad, se renombró como Unidad de Atención Clínica y Psicosocial; orientado al desarrollo social, a través del servicio de atención psicológica a la población Tolimense, creando estrategias de abordaje en los diferentes contextos, a partir de las diversas formas de intervención (asesoría, evaluación, diagnóstico, psicoterapia, consultoría, investigación, prevención y promoción) posibilitando así, cambios y transformaciones que contribuyan al mejoramiento de la calidad de vida y la salud mental de la región.<br> A su vez permite la exploración y la consolidación teórico-práctica del proceso formativo profesional de los estudiantes de pregrado y postgrado de nuestra Universidad.<br><br>La Universidad de Ibagué se encuentra acreditada como una Universidad de alta calidad, factor que implica la implementación de planes de mejoramiento continuo en las diferentes dependencias. Desde la Unidad de Atención Clínica y Psicosocial se trabaja en la consecución de la acreditación, a través del seguimiento del plan de mejoramiento de la I.P.S (evaluación de los procesos), la incorporación de un plan estratégico, contribuyendo a los programas de responsabilidad social.';

  toggleTextoCompleto() {
    this.mostrarTextoCompleto = !this.mostrarTextoCompleto;
  }


}
