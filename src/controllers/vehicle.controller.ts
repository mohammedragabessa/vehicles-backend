import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
  AnyType,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { Vehicle } from '../models';
import { VehicleRepository } from '../repositories';

var rp = require('request-promise');

export class VehicleController {
  constructor(
    @repository(VehicleRepository)
    public vehicleRepository: VehicleRepository,
  ) { }

  @post('/vehicles', {
    responses: {
      '200': {
        description: 'Vehicle model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Vehicle) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehicle, {
            title: 'NewVehicle',
            exclude: ['id'],
          }),
        },
      },
    })
    vehicle: Omit<Vehicle, 'id'>,
  ): Promise<Vehicle> {
    return this.vehicleRepository.create(vehicle);
  }

  @get('/vehicles/count', {
    responses: {
      '200': {
        description: 'Vehicle model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Vehicle)) where?: Where<Vehicle>,
  ): Promise<Count> {
    return this.vehicleRepository.count(where);
  }

  @get('/vehicles', {
    responses: {
      '200': {
        description: 'Array of Vehicle model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Vehicle) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Vehicle)) filter?: Filter<Vehicle>,
  ): Promise<Vehicle[]> {
    // return vehicles including customer information  
    let vehicles = await this.vehicleRepository.find({ include: [{ relation: "customer" }] });

    let rStatus = [];
    rStatus = await rp({
      uri: 'http://random-status.us-east-2.elasticbeanstalk.com/RandomStatusArray/' + vehicles.length,
      json: true
    });

    for (let i = 0; i < vehicles.length; i++) {
      vehicles[i].isConnected = rStatus[i]
    }

    return vehicles;
  }

  @patch('/vehicles', {
    responses: {
      '200': {
        description: 'Vehicle PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehicle, { partial: true }),
        },
      },
    })
    vehicle: Vehicle,
    @param.query.object('where', getWhereSchemaFor(Vehicle)) where?: Where<Vehicle>,
  ): Promise<Count> {
    return this.vehicleRepository.updateAll(vehicle, where);
  }

  @get('/vehicles/{id}', {
    responses: {
      '200': {
        description: 'Vehicle model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Vehicle) } },
      },
    },
  })
  async findById(@param.path.string('id') id: number): Promise<Vehicle> {
    return this.vehicleRepository.findById(id);
  }

  @patch('/vehicles/{id}', {
    responses: {
      '204': {
        description: 'Vehicle PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehicle, { partial: true }),
        },
      },
    })
    vehicle: Vehicle,
  ): Promise<void> {
    await this.vehicleRepository.updateById(id, vehicle);
  }

  @put('/vehicles/{id}', {
    responses: {
      '204': {
        description: 'Vehicle PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: number,
    @requestBody() vehicle: Vehicle,
  ): Promise<void> {
    await this.vehicleRepository.replaceById(id, vehicle);
  }

  @del('/vehicles/{id}', {
    responses: {
      '204': {
        description: 'Vehicle DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: number): Promise<void> {
    await this.vehicleRepository.deleteById(id);
  }
}
