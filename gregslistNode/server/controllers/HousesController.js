import { Auth0Provider } from '@bcwdev/auth0provider';
import { housesService } from '../services/HousesService.js';
import BaseController from '../utils/BaseController.js';

export class HousesController extends BaseController {
  constructor() {
    super('api/houses');
    this.router
      .get('', this.getHouses)
      .get('/:houseId', this.getHouseById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createHouse)
      .put('/:houseId', this.editHouse)
      .delete('/:houseId', this.deleteHouse);
  }

  async getHouses(req, res, next) {
    try {
      const houses = await housesService.getHouses(req.query);
      res.send(houses);
    } catch (error) {
      next(error);
    }
  }

  async getHouseById(req, res, next) {
    try {
      const houseId = req.params.houseId;
      const house = await housesService.getHouseById(houseId);
      res.send(house);
    } catch (error) {
      next(error);
    }
  }

  async createHouse(req, res, next) {
    try {
      const houseData = req.body;
      houseData.creatorId = req.userInfo.id;
      const newHouse = await housesService.createHouse(houseData);
      res.send(newHouse);
    } catch (error) {
      next(error);
    }
  }

  async editHouse(req, res, next) {
    try {
      const houseData = req.body;
      const houseId = req.params.houseId;
      const userId = req.userInfo.id;
      const editedHouse = await housesService.editHouse(
        houseData,
        houseId,
        userId
      );
      res.send(editedHouse);
    } catch (error) {
      next(error);
    }
  }

  async deleteHouse(req, res, next) {
    try {
      const houseId = req.params.houseId;
      const userId = req.userInfo.id;
      await housesService.deleteHouse(houseId, userId);
      res.send({ message: 'Successfully Deleted House' });
    } catch (error) {
      next(error);
    }
}












}

