import {Adapter} from '../../../core/adapter';
import {AggregateCriteria} from './aggregate-criteria';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AggregateCriterionAdapter implements Adapter<AggregateCriteria> {
  adapt(item: any): AggregateCriteria {
    const criterion: AggregateCriteria = new AggregateCriteria();
    criterion.id = item.id;
    criterion.nombre = item.nombre;
    criterion.definicion = item.definicion;
    criterion.tipologia = item.tipologia;
    criterion.disponible = item.disponible;

    return criterion;
  }
}
