import {AggBankEntity} from './agg-bank-entity';

export class AggExecution {
  fechaDato: string;
  tipologias: AggTypology[];
  entidades: AggBankEntity[];
  periodicidades: string[];
  finalidad: string;
}

export class AggTypology {
  tipologia: string;
  criterios: AggCriteria[];
}

export class AggCriteria {
  nombre: string;
  version?: string;
}
