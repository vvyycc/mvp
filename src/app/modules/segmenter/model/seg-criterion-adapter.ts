import {Adapter} from '../../../core/adapter';
import {Criteria} from '../../../shared/model/criteria';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SegCriterionAdapter implements Adapter<Criteria>{
  adapt(item: any): Criteria {
    const cri: Criteria = new Criteria();
    cri.id = item.id;
    cri.tipologia = item.tipologia;
    cri.nombre = item.nombre;
    cri.definicion = item.definicion;
    cri.disponible = item.disponible;
    cri.automatico = item.automatico;
    cri.valores = item.valores;

    return cri;
  }
}
