import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Customer,
  Vehicle,
} from '../models';
import { CustomerRepository } from '../repositories';

export class CustomerVehicleController {
  constructor(
    @repository(CustomerRepository) protected customerRepository: CustomerRepository,
  ) { }

  @get('/customers/{id}/vehicles', {
    responses: {
      '200': {
        description: 'Array of Vehicle\'s belonging to Customer',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Vehicle) },
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Vehicle>,
  ): Promise<Vehicle[]> {
    return this.customerRepository.vehicles(id).find(filter);
  }

  @post('/customers/{id}/vehicles', {
    responses: {
      '200': {
        description: 'Customer model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Vehicle) } },
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Customer.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehicle, {
            title: 'NewVehicleInCustomer',
            exclude: ['id'],
            optional: ['customerId']
          }),
        },
      },
    }) vehicle: Omit<Vehicle, 'VIN'>,
  ): Promise<Vehicle> {
    return this.customerRepository.vehicles(id).create(vehicle);
  }

  @patch('/customers/{id}/vehicles', {
    responses: {
      '200': {
        description: 'Customer.Vehicle PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehicle, { partial: true }),
        },
      },
    })
    vehicle: Partial<Vehicle>,
    @param.query.object('where', getWhereSchemaFor(Vehicle)) where?: Where<Vehicle>,
  ): Promise<Count> {
    return this.customerRepository.vehicles(id).patch(vehicle, where);
  }

  @del('/customers/{id}/vehicles', {
    responses: {
      '200': {
        description: 'Customer.Vehicle DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Vehicle)) where?: Where<Vehicle>,
  ): Promise<Count> {
    return this.customerRepository.vehicles(id).delete(where);
  }
}
