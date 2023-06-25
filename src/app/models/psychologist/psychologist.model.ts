import { Role } from "../role/role.model";
import { ServicesPsycho } from "../servicespsycho/servicespsycho.model";
import { Specialty } from "../specialty/specialty.model";


export interface Psychologist {
  id: number;
  name: string;
  lastName: string;
  email: string;
  specialty: Specialty;
  role: Role;
  services: ServicesPsycho[];
}
