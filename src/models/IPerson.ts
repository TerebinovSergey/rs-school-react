import { IPeople } from './IPeople';

export interface IPerson extends IPeople {
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}
