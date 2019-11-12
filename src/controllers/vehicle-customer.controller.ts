import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Vehicle,
  Customer,
} from '../models';
import {VehicleRepository} from '../repositories';

export class VehicleCustomerController {
  constructor(
    @repository(VehicleRepository)
    public vehicleRepository: VehicleRepository,
  ) { }

  @get('/vehicles/{id}/customer', {
    responses: {
      '200': {
        description: 'Customer belonging to Vehicle',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Customer)},
          },
        },
      },
    },
  })
  async getCustomer(
    @param.path.number('id') id: typeof Vehicle.prototype.id,
  ): Promise<Customer> {
    return this.vehicleRepository.customer(id);
  }
}
