import {BankEntity} from '../../../shared/model/bank-entity';

export class EtlExecution {
  fechaDato: string;
  tipologia: string;
  entidades: BankEntity[];
  periodicidades: string[];
  finalidad: string;
  agregado: string;
  criterio_agregacion?: string;
  nombre_etl: string;
}
