import { Entity, model, property, belongsTo} from '@loopback/repository';
import {Customer} from './customer.model';

@model()
export class Vehicle extends Entity {

  @property({
    type: 'number',
    id: true,
    generated: true

  })
  id: number;

  @property({
    type: 'string',
  })
  vin?: string;

  @property({
    type: 'string',
  })
  regnumber?: string;

  @property({
    type: 'boolean',
    default: false
  })
  isConnected?: boolean;

  @belongsTo(() => Customer)
  customerId: number;

  constructor(data?: Partial<Vehicle>) {
    super(data);
  }
}

export interface VehicleRelations {
  // describe navigational properties here
}

export type VehicleWithRelations = Vehicle & VehicleRelations;
