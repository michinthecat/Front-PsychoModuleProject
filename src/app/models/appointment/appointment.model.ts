
import { Patient } from "../patient/patient.model";

import { Psychologist } from "../psychologist/psychologist.model";
import { ServicesPsycho } from "../servicespsycho/servicespsycho.model";
import { State } from "../state/state.model";

export interface Appointment {

  id: number;
  date: string;
  service: ServicesPsycho;
  psychologist: Psychologist;
  patient: Patient;
  state: State;

}

