import {BankEntity} from '../../../shared/model/bank-entity';

export class SegExecution {
  fechaDato: string;
  tipologias: SegTypology[];
  entidades: BankEntity[];
  periodicidades: string[];
}

export class SegTypology {
  tipologia: string;
  criterios: SegCriteria[];
}

export class SegCriteria {
  nombre: string;
  version?: string;
}
