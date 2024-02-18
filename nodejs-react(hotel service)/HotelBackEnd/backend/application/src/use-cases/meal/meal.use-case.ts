import { User } from '../../frameworks/data-services/mongo/models/user.model';
import { BadRequestException, Injectable } from '@nestjs/common';
import { IDataServices } from '../../core/contracts/data-service.contract';
import { MealInput } from '../../frameworks/graphQL-service/dto/meal/meal.input';
import { Meal } from '../../frameworks/data-services/mongo/models/meal.model';
import { PlaceTable } from '../../frameworks/data-services/mongo/models/place_table.model';
import { PlaceTableInput } from '../../frameworks/graphQL-service/dto/meal/place-table.input';
import { OrderMealInput } from '../../frameworks/graphQL-service/dto/meal/order-meal.input';
import { OrderMeal } from '../../frameworks/data-services/mongo/models/order_meal.model';
import { getDay, getMonth } from '../room/room.use-case';
import { TableTimesModel } from '../../frameworks/data-services/mongo/models/table-times.model';
import { TableTimesInput } from '../../frameworks/graphQL-service/dto/meal/TableTimesInput';
import { TableTimeModel } from '../../frameworks/data-services/mongo/models/table-time.model';
import { Deleted } from '../../frameworks/graphQL-service/dto/tour/tour.input';
import { AuthService } from '../../frameworks/auth/services/auth.service';

@Injectable()
export class MealUseCases {
  constructor(
    private dataService: IDataServices,
    private readonly authService: AuthService
  ) {}

  async createMeal(meal: MealInput): Promise<Meal> {
    try {
      return await this.dataService.meals.create(meal);
    } catch (error) {
      throw error;
    }
  }

  async getAllMeals(): Promise<Meal[]> {
    try {
      return await this.dataService.meals.getAll();
    } catch (error) {
      throw error;
    }
  }

  async createTable(table: PlaceTableInput): Promise<PlaceTable> {
    try {
      const BOOK_DURATION = 3;
      const startDate = new Date();
      const finishDate = new Date(`${startDate.getFullYear()}-${+getMonth(startDate) + BOOK_DURATION}-${getDay(startDate)}`);
      table.availabilitySchedule = this.generateAvailabilitySchedule(startDate.toString(), finishDate.toString());


      return await this.dataService.placeTables.create(table);
    } catch (error) {
      throw error;
    }
  }

  async getAllTables(): Promise<PlaceTable[]> {
    try {
      let tables = await this.dataService.placeTables.getAll()
      return tables.sort((current: PlaceTable, next:PlaceTable) => {
        return +current.tableNumber - +next.tableNumber
      });
    } catch (error) {
      throw error;
    }
  }

  async getTableBookTimeByBookDateAndTableNumber(tableNumber: string, bookDate: string): Promise<TableTimeModel[] >{
    try{
      const tables = await this.dataService.placeTables.getAll();
      const searchingTable = tables.find((table: any) => table.tableNumber === tableNumber)
      const bookingTimes = searchingTable.availabilitySchedule.find((date: any) => date.date === bookDate)
      const availableTimes = bookingTimes.bookTimes.filter((time: any) =>(time.value))
      return availableTimes
    }catch (error) {
      throw error;
    }
  }
  async createOrderMeal(order: OrderMealInput, token): Promise<OrderMeal> {
    try {
      const {login} = await this.authService.getRoleAndLoginByAccessToken(token)

      const existingUser = await this.dataService.users.findOneByParameters({login: login})

      if (!existingUser) {
        throw new BadRequestException('Login not defined')
      }

      order.userLogin = existingUser.login

      const tables = await this.dataService.placeTables.getAll();
      if (!order.inRoom) {
        const searchingTable = tables.find((table: any) => table.tableNumber === order.tableNumber)

        const bookingTimes = searchingTable.availabilitySchedule.find((date: any) => date.date === order.bookDate)

        const bookNote = bookingTimes.bookTimes.find((times: any) => times.key === order.bookTime)
        bookNote.value = false

        await  this.dataService.placeTables.update({tableNumber: order.tableNumber}, searchingTable)

      }
      return await this.dataService.orderMeals.create(order);
    } catch (error) {
      throw error;
    }
  }

  async deleteOneOrderMeal(id: string): Promise<Deleted> {
    try {

      const order = await this.dataService.orderMeals.findOneByParameters({_id: id})

      const tables = await this.dataService.placeTables.getAll();
      if (!order.inRoom) {
        const searchingTable = tables.find((table: any) => table.tableNumber === order.tableNumber)

        if (!searchingTable) {
          return await this.dataService.orderMeals.deleteOne({_id: id});
        }

        const bookingTimes = searchingTable.availabilitySchedule.find((date: any) => date.date === order.bookDate)

        const bookNote = bookingTimes.bookTimes.find((times: any) => times.key === order.bookTime)
        bookNote.value = true

        await  this.dataService.placeTables.update({tableNumber: order.tableNumber}, searchingTable)
      }

      return await this.dataService.orderMeals.deleteOne({_id: id});
    } catch (error) {
      throw error;
    }
  }

  async deleteOneMeal(name: string): Promise<Deleted> {
    try {
      return await this.dataService.meals.deleteOne({mealName: name});
    } catch (error) {
      throw error;
    }
  }

  async getAllOrderMeals(): Promise<OrderMeal[]> {
    try {
      return await this.dataService.orderMeals.getAll();
    } catch (error) {
      throw error;
    }
  }

  private getDays(startDate: string, finishDate: string): number {
    const start = new Date(startDate);
    const end = new Date(finishDate);
    const timeDiff = Math.abs(start.getTime() - end.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  private generateAvailabilitySchedule(checkInDate: string, checkOutDate: string): TableTimesModel[] {
    const start = new Date(checkInDate);
    const days = this.getDays(checkInDate, checkOutDate)

    let schedule = []
    const START_HOURS = 8
    const END_HOURS = 20
    const MINUTES = 0
    const SECONDS = 0
    for (let i = 0; i <= days; i++) {
      const date = new Date(start);
      date.setDate(date.getDate() + i);
      let tableTimeNote = new TableTimesModel()
      tableTimeNote.date = new Date(date).toISOString().slice(0, 10);
      tableTimeNote.bookTimes = []

      //Creating array of book times
      const startTime = new Date(date);
      startTime.setHours(START_HOURS)
      startTime.setMinutes(MINUTES)
      startTime.setSeconds(SECONDS)
      const endTime = new Date(date);
      endTime.setHours(END_HOURS)
      endTime.setMinutes(MINUTES)
      endTime.setSeconds(SECONDS)

      while (startTime < endTime) {
        let timeNote = new TableTimeModel()
        timeNote.key =  `${String(startTime.getHours()).padStart(2, '0')}:${String(
          startTime.getMinutes()
        ).padStart(2, '0')}`
        timeNote.value = true

        tableTimeNote.bookTimes.push(timeNote);
        startTime.setTime(startTime.getTime() + 2 * 60 * 60 * 1000); // Add 2 hours
      }
      //Creating array of book times

      schedule.push(tableTimeNote);
    }
    return schedule;
  }

  async updateMeal(meal: MealInput): Promise<Meal> {
    try {
      return await this.dataService.meals.update({mealName: meal.mealName}, meal);
    } catch (error) {
      throw error;
    }
  }

  async deleteOneTable(number: string): Promise<Deleted> {
    try {

      /*const orders = await this.dataService.orderMeals.findByParameters({tableNumber: number})

      for (const order of orders) {
        await this.dataService.orderMeals.deleteOne({_id: order._id})
      }*/

      return await this.dataService.placeTables.deleteOne({tableNumber: number});
    } catch (error) {
      throw error;
    }
  }

  async updateTable(table: PlaceTableInput): Promise<PlaceTable> {
    try {
       await this.dataService.placeTables.update({tableNumber: table.tableNumber}, table);
      return await this.dataService.placeTables.findOneByParameters({tableNumber: table.tableNumber})
    } catch (error) {
      throw error;
    }
  }

  async getTablesCount(): Promise<number> {
    try {
      const tables = await this.dataService.placeTables.getAll()
      return tables.length
    } catch (error) {
      throw error;
    }
  }
}
