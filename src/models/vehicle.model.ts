import { Entity, model, property } from '@loopback/repository';

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

  @property({
    type: 'number',
  })
  customerId?: number;

  constructor(data?: Partial<Vehicle>) {
    super(data);
  }
}

export interface VehicleRelations {
  // describe navigational properties here
}

export type VehicleWithRelations = Vehicle & VehicleRelations;
