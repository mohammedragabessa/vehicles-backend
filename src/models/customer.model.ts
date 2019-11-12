import { Entity, model, property, hasMany } from '@loopback/repository';
import { Vehicle } from './vehicle.model';

@model()
export class Customer extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true

  })
  id: number;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  address?: string;

  @hasMany(() => Vehicle)
  vehicles: Vehicle[];

  constructor(data?: Partial<Customer>) {
    super(data);
  }
}
