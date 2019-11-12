import { DefaultCrudRepository } from '@loopback/repository';
import { Vehicle } from '../models';
import { DbDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class VehicleRepository extends DefaultCrudRepository<
  Vehicle,
  typeof Vehicle.prototype.id
  > {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Vehicle, dataSource);
  }
}
