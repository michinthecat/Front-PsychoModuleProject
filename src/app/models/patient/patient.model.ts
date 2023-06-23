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

export interface PatientType {
  id: number;
  patientType: string;
}

export interface Gender {
  id: number;
  gender: string;
}
