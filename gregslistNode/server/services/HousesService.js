import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class HousesService {

  async getHouses(query) {
    const houses = await dbContext.Houses.find(query)
    return houses
  }

  async getHouseById(houseId) {
    const house = await dbContext.Houses.findById(houseId)
    if (!house) {
      throw new BadRequest("Invalid House Id")
    }
    return house
  }

  async createHouse(houseData) {
    const house = await dbContext.Houses.create(houseData)
    return house
  }

  async editHouse(houseData, houseId, userId) {
    const originalHouse = await this.getHouseById(houseId)

    if (originalHouse.creatorId != userId) {
      throw new Forbidden("Unauthorized to edit house")
    }
      
    originalHouse.bedrooms = houseData.bedrooms || originalHouse.bedrooms
    originalHouse.bathrooms = houseData.bathrooms || originalHouse.bathrooms
    originalHouse.levels = houseData.levels || originalHouse.levels
    originalHouse.year = houseData.year || originalHouse.year
    originalHouse.price = houseData.price || originalHouse.price
    originalHouse.description = houseData.description || originalHouse.description
    originalHouse.imgUrl = houseData.imgUrl || originalHouse.imgUrl

    originalHouse.save()
    return originalHouse
  }

  async deleteHouse(houseId, userId) {
    const house = await this.getHouseById(houseId)
    if (house.creatorId != userId) {
      throw new Forbidden("Unauthorized to edit that house")
    }

    await house.remove()
    return
  }
  
}

export const housesService = new HousesService()