import { BadRequestException, Injectable } from '@nestjs/common';
import { IDataServices } from '../../core/contracts/data-service.contract';
import { Deleted, TourInput } from '../../frameworks/graphQL-service/dto/tour/tour.input';
import { Tour } from '../../frameworks/data-services/mongo/models/tour.model';
import { OrderTourInput } from '../../frameworks/graphQL-service/dto/tour/order-tour.input';
import { OrderTour } from '../../frameworks/data-services/mongo/models/order_tour.model';
import { AuthService } from '../../frameworks/auth/services/auth.service';

@Injectable()
export class TourUseCases {
  constructor(
    private dataService: IDataServices,
    private readonly authService: AuthService
  ) {}

  async createTour(tour: TourInput): Promise<Tour> {
    try {
      return await this.dataService.tours.create(tour);
    } catch (error) {
      throw error;
    }
  }

  async createOrderTour(orderTour: OrderTourInput, token: string): Promise<OrderTour> {
    try {
      const {login} = await this.authService.getRoleAndLoginByAccessToken(token)

      const existingUser = await this.dataService.users.findOneByParameters({login: login})

      if (!existingUser) {
        throw new BadRequestException('Login not defined')
      }

      orderTour.userLogin = existingUser.login

      return await this.dataService.orderTours.create(orderTour);
    } catch (error) {
      throw error;
    }
  }

  async getTourByName(name: string): Promise<Tour> {
    try {
      return await this.dataService.tours.findOneByParameters({tourName: name});
    } catch (error) {
      throw error;
    }
  }

  async getAllTours(): Promise<Tour[]> {
    try {
      return await this.dataService.tours.getAll();
    } catch (error) {
      throw error;
    }
  }

  async getAllOrderTours(): Promise<OrderTour[]> {
    try {
      return await this.dataService.orderTours.getAll();
    } catch (error) {
      throw error;
    }
  }

  async updateTour(tour: TourInput): Promise<Tour> {
    try {
      return await this.dataService.tours.update({tourName: tour.tourName}, tour);
    } catch (error) {
      throw error;
    }
  }

  async deleteOneTour(name: string): Promise<Deleted> {
    try {
      return await this.dataService.tours.deleteOne({tourName: name});
    } catch (error) {
      throw error;
    }
  }

  async deleteOneTourOrder(id: string): Promise<Deleted> {
    try {
      return await this.dataService.orderTours.deleteOne({_id: id});
    } catch (error) {
      throw error;
    }
  }
}
