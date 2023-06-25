import { Gender } from "../gender/gender.model";
import { PatientType } from "../patienttype/patienttype.model";

export interface Patient{
  id: number;
  name: string;
  lastName: string;
  email: string;
  age: number;
  phone: string;
  patientType: PatientType;
  gender: Gender;
  notes: string;
}

