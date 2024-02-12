import {Injectable} from '@angular/core';
import {Adapter} from '../../../core/adapter';
import {SegExecutionHistoryDetail} from './seg-execution-history-detail';

@Injectable({
  providedIn: 'root',
})
export class SegExecutionHistoryDetailAdapter implements Adapter<SegExecutionHistoryDetail> {
  adapt(item: any): SegExecutionHistoryDetail {
    const seg: SegExecutionHistoryDetail = new SegExecutionHistoryDetail();
    seg.id = item.id;
    seg.fechaDato = item.fechaDato;
    seg.entidad = item.entidad;
    seg.criterio = item.criterio;
    seg.version = item.version;
    seg.registrosSegmentados = item.registrosSegmentados;
    seg.registrosNoSegmentados = item.registrosNoSegmentados;
    seg.registrosFallidos = item.registrosFallidos;

    return seg;
  }
}
