export interface Appointment {

  id: number;
  date: string;
  service: Service;
  psychologist: Psychologist;
  patient: Patient;
  state: State;

}

interface Specialty {
  id: number;
  specialty: string;
}

interface Role {
  id: number;
  role: string;
}

export interface Psychologist {
  id: number;
  name: string;
  lastName: string;
  email: string;
  specialty: Specialty;
  role: Role;
  services: any[] | null;
}

interface PatientType {
  id: number;
  patientType: string;
}

interface Gender {
  id: number;
  gender: string;
}

export interface Patient {
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

export interface Service {
  id: number;
  serviceName: string;
  description: string;
  cost: number;
}

export interface State {
  id: number;
  state: string;
}
