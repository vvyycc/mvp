import {Adapter} from '../../../core/adapter';
import {AggExecutionHistory} from './agg-execution-history';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AggExecutionHistoryAdapter implements Adapter<AggExecutionHistory> {
  adapt(item: any): AggExecutionHistory {
    const agg: AggExecutionHistory = new AggExecutionHistory();
    agg.id = item.id;
    agg.selectedDate = item.selectedDate;
    agg.typology = item.typology;
    agg.entities = item.entities;
    agg.periodicity = item.periodicity;
    agg.purpose = item.purpose;
    agg.criterios = item.criterios;
    agg.startedExecutionAt = item.startedExecutionAt;
    agg.endedExecutionAt = item.endedExecutionAt;
    agg.executionDate = item.executionDate;
    agg.status = item.status;

    return agg;
  }
}
