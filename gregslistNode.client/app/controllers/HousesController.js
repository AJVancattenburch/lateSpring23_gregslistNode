import { housesService } from "../services/HousesService";
import { Pop } from "../utils/Pop.js";

export class HousesController {
  constructor() {
    console.log("houses controller");
  }

  async getHouses() {
    try {
      await housesService.getHouses();
    } catch (error) {
      console.error(error);
      Pop.toast(error, "error");
    }
  }

}