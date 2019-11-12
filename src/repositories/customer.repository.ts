import { DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import { Customer, Vehicle} from '../models';
import { DbDataSource } from '../datasources';
import { inject, Getter} from '@loopback/core';
import {VehicleRepository} from './vehicle.repository';

export class CustomerRepository extends DefaultCrudRepository<
  Customer,
  typeof Customer.prototype.id
  > {

  public readonly vehicles: HasManyRepositoryFactory<Vehicle, typeof Customer.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('VehicleRepository') protected vehicleRepositoryGetter: Getter<VehicleRepository>,
  ) {
    super(Customer, dataSource);
    this.vehicles = this.createHasManyRepositoryFactoryFor('vehicles', vehicleRepositoryGetter,);
    this.registerInclusionResolver('vehicles', this.vehicles.inclusionResolver);
  }
}
