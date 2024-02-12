import {Adapter} from '../../../core/adapter';
import {AdjExecutionHistory} from './AdjExecutionHistory';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdjExecutionHistoryAdapter implements Adapter<AdjExecutionHistory> {
  adapt(item: any): AdjExecutionHistory {
    const adj: AdjExecutionHistory = new AdjExecutionHistory();
    adj.id = item.id;
    adj.selectedDate = item.selectedDate;
    adj.typology = item.typology;
    adj.selectedPurposes = item.selectedPurposes;
    adj.startedExecutionAt = item.startedExecutionAt;
    adj.endedExecutionAt = item.endedExecutionAt;
    adj.adjustmentNotExecuted = item.adjustmentNotExecuted;
    adj.totalOkRecords = item.totalOkRecords;
    adj.totalKoRecords = item.totalKoRecords;
    adj.status = item.status;

    return adj;
  }
}
