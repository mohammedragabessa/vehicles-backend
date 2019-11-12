import { DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import { Vehicle, Customer} from '../models';
import { DbDataSource } from '../datasources';
import { inject, Getter} from '@loopback/core';
import {CustomerRepository} from './customer.repository';

export class VehicleRepository extends DefaultCrudRepository<
  Vehicle,
  typeof Vehicle.prototype.id
  > {

  public readonly customer: BelongsToAccessor<Customer, typeof Vehicle.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('CustomerRepository') protected customerRepositoryGetter: Getter<CustomerRepository>,
  ) {
    super(Vehicle, dataSource);
    this.customer = this.createBelongsToAccessorFor('customer', customerRepositoryGetter,);
    this.registerInclusionResolver('customer', this.customer.inclusionResolver);
  }
}
