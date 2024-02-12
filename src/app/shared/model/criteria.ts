import {Valor} from './valor';

export class Criteria {
  id?: string;
  tipologia: string;
  nombre: string;
  definicion: string;
  automatico?: boolean;
  disponible?: boolean;
  valores?: Valor[];
}
