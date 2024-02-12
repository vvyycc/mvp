import {Injectable} from '@angular/core';
import {Adapter} from '../../../core/adapter';
import {SegExecutionHistory} from './seg-execution-history';

@Injectable({
  providedIn: 'root',
})
export class SegExecutionHistoryAdapter implements Adapter<SegExecutionHistory> {
  adapt(item: any): SegExecutionHistory {
    const seg: SegExecutionHistory = new SegExecutionHistory();
    seg.id = item.id;
    seg.fechaDato = item.fechaDato;
    seg.executionType = item.executionType;
    seg.contratos = item.contratos;
    seg.entidades = item.entidades;
    seg.periodicidades = item.periodicidades;
    seg.fechaIni = item.fechaIni;
    seg.fechaFin = item.fechaFin;
    seg.hasDetails = item.hasDetails;
    seg.filename = item.filename;
    seg.workflowStatus = item.workflowStatus;

    return seg;
  }
}
