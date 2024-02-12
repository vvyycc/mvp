import {Injectable} from '@angular/core';
import {Adapter} from '../../../core/adapter';
import {EtlCriterion} from './etl-criterion';

@Injectable({
  providedIn: 'root'
})
export class EtlCriterionAdapter implements Adapter<EtlCriterion> {
  adapt(item: any): EtlCriterion {
    const criterion: EtlCriterion = new EtlCriterion();
    criterion.id = item.id;
    criterion.nombre = item.nombre;
    criterion.tipologia = item.tipologia;
    criterion.definicion = item.definicion;
    criterion.inputVersion = item['input-version'];
    criterion.outputVersion = item['output-version'];
    criterion.disponible = item.disponible;

    return criterion;
  }
}
