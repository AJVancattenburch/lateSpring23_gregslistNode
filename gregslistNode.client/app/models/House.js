export class House{
  constructor(data) {
    this.id = data.id
    this.bedrooms = data.bedrooms
    this.bathrooms = data.bathrooms
    this.levels = data.levels
    this.year = data.year
    this.price = data.price
    this.description = data.description
    this.imgUrl = data.imgUrl
    this.creatorId = data.creatorId
    this.creator = data.creator
  }

  get Template() {
    return /*html*/`
    <div class="col-md-4 col-6">
      <div class="card">
        <img class="card-img-top" src="${this.imgUrl}" alt="">
        <div class="card-body">
          <h4 class="card-title">${this.bedrooms} - ${this.bathrooms} - ${this.year}</h4>
          <p class="card-text">${this.description}</p>
          <p class="card-text">${this.price}</p>
          <div class="text-right">
            
            <button class="btn btn-danger" onclick="app.housesController.deleteHouse('${this.id}')">Delete</button>
          </div>
        </div>
      </div>
    </div>
    `
  }

}