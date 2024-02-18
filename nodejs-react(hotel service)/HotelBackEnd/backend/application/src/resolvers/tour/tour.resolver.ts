import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Tour } from '../../frameworks/data-services/mongo/models/tour.model';
import { Deleted, TourInput } from '../../frameworks/graphQL-service/dto/tour/tour.input';
import { TourUseCases } from '../../use-cases/tour/tour.use-case';
import { OrderTour } from '../../frameworks/data-services/mongo/models/order_tour.model';
import { OrderTourInput } from '../../frameworks/graphQL-service/dto/tour/order-tour.input';
import { Roles } from '../../frameworks/auth/services/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../frameworks/auth/services/jwt-auth.guard';
import { RoleGuard } from '../../frameworks/auth/services/role.guard';

@Resolver()
export class TourGraphResolver {
  constructor(private tourUseCases: TourUseCases) {
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Mutation(() => Tour)
  async createTour(@Args('createTour') createTourInput: TourInput): Promise<Tour>{
    return await this.tourUseCases.createTour(createTourInput)
  }

  @Roles('admin', 'user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Mutation(() => OrderTour)
  async createOrderTour(@Args('createOrderTour') orderTourInput: OrderTourInput,
                        @Args('token') token: string): Promise<OrderTour>{
    return await this.tourUseCases.createOrderTour(orderTourInput, token)
  }

  @Roles('admin', 'user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Query(() => Tour)
  async getOneTour(@Args('tourName') tourName: string): Promise<Tour> {
    return await this.tourUseCases.getTourByName(tourName)
  }

  @Roles('admin', 'user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Query(() => [Tour])
  async getAllTours(): Promise<Tour[]> {
    return await this.tourUseCases.getAllTours()
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Query(() => [OrderTour])
  async getAllOrderTours(): Promise<OrderTour[]> {
    return await this.tourUseCases.getAllOrderTours()
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Mutation(() => Tour)
  async updateTour(@Args('tour') tour: TourInput): Promise<Tour> {
    return await this.tourUseCases.updateTour(tour)
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Mutation(() => Deleted)
  async deleteOneTour(@Args('tourName') name: string): Promise<Deleted> {
    return await this.tourUseCases.deleteOneTour(name)
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Mutation(() => Deleted)
  async deleteOneTourOrder(@Args('orderId') id: string): Promise<Deleted> {
    return await this.tourUseCases.deleteOneTourOrder(id)
  }
}
