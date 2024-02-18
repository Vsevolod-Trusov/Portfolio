import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FreeTimeInfo } from '../../frameworks/data-services/mongo/models/free_time_info';
import { FreeTimeInfoInput } from '../../frameworks/graphQL-service/dto/hobby/hobby.input';
import { MealUseCases } from '../../use-cases/meal/meal.use-case';
import { MealInput } from '../../frameworks/graphQL-service/dto/meal/meal.input';
import { Meal } from '../../frameworks/data-services/mongo/models/meal.model';
import { PlaceTable } from '../../frameworks/data-services/mongo/models/place_table.model';
import { PlaceTableInput } from '../../frameworks/graphQL-service/dto/meal/place-table.input';
import { OrderMealInput } from '../../frameworks/graphQL-service/dto/meal/order-meal.input';
import { OrderMeal } from '../../frameworks/data-services/mongo/models/order_meal.model';
import { TableTimeModel } from '../../frameworks/data-services/mongo/models/table-time.model';
import { Roles } from 'src/frameworks/auth/services/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { RoleGuard } from '../../frameworks/auth/services/role.guard';
import { JwtAuthGuard } from '../../frameworks/auth/services/jwt-auth.guard';
import { Deleted } from '../../frameworks/graphQL-service/dto/tour/tour.input';

@Resolver()
export class MealGraphResolver {
  constructor(private mealUseCases: MealUseCases) {
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Mutation(() => Meal)
  async createMeal(@Args('createMeal') mealInput: MealInput): Promise<Meal>{
    return await this.mealUseCases.createMeal(mealInput)
  }

  @Roles('admin', 'user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Query(() => [Meal])
  async getAllMeals(): Promise<Meal[]> {
    return await this.mealUseCases.getAllMeals()
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Mutation(() => PlaceTable)
  async createTable(@Args('createTable') tableInput: PlaceTableInput): Promise<PlaceTable>{
    return await this.mealUseCases.createTable(tableInput)
  }

  @Roles('admin', 'user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Query(() => [PlaceTable])
  async getAllTables(): Promise<PlaceTable[]> {
    return await this.mealUseCases.getAllTables()
  }

  @Roles('admin', 'user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Query(() => [TableTimeModel])
  async getBookTimes(@Args('tableNumber') tableNumber: string, @Args('bookDate') bookDate: string ): Promise<TableTimeModel[]> {
    return await this.mealUseCases.getTableBookTimeByBookDateAndTableNumber(tableNumber, bookDate)
  }

  @Roles('admin', 'user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Mutation(() => OrderMeal)
  async createOrderMeal(@Args('createOrder') orderInput: OrderMealInput,
                        @Args('token') token: string): Promise<OrderMeal>{
    return await this.mealUseCases.createOrderMeal(orderInput, token)
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Mutation(() => Deleted)
  async deleteOneMealOrder(@Args('orderId') id: string): Promise<Deleted>{
    return await this.mealUseCases.deleteOneOrderMeal(id)
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Mutation(() => Deleted)
  async deleteOneMeal(@Args('mealName') name: string): Promise<Deleted>{
    return await this.mealUseCases.deleteOneMeal(name)
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Mutation(() => Meal)
  async updateMeal(@Args('meal') meal: MealInput): Promise<Meal>{
    return await this.mealUseCases.updateMeal(meal)
  }


  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Mutation(() => Deleted)
  async deleteOneTable(@Args('tableNumber') number: string): Promise<Deleted>{
    return await this.mealUseCases.deleteOneTable(number)
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Mutation(() => PlaceTable)
  async updateTable(@Args('table') table: PlaceTableInput): Promise<PlaceTable>{
    return await this.mealUseCases.updateTable(table)
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Query(() => Number)
  async getAmountTables(): Promise<number>{
    return await this.mealUseCases.getTablesCount()
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Query(() => [OrderMeal])
  async getAllMealOrders(): Promise<OrderMeal[]> {
    return await this.mealUseCases.getAllOrderMeals()
  }
}
