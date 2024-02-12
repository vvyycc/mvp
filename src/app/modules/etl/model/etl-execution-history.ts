export interface EtlExecutionHistory {
  id: number;
  fechaDato: string;
  tipologia: string;
  entidades: string;
  periodicidades: string;
  purpose: string;
  agregado: string;
  criterio: string;
  fechaIni: string;
  fechaFin: string;
  numeroRegistros: string;
  estado: string;
  nombreFichero: string;
  jobId: string;
  executionDate: string;
}

export enum Typology {
  TESORERIA, COMERCIAL
}

export enum WfmStatus {
  PENDING, RUNNING, FAILED, DONE
}
