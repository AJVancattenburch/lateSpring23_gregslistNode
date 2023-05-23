
import { api } from './AxiosService.js'
import { AppState } from '../AppState.js'

class HousesService {

  async getHouses() {
    const res = await api.get('api/houses')
    console.log(res.data)
  }
}