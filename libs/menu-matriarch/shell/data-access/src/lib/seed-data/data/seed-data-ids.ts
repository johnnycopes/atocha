export class SeedDataIds {
  readonly menuIds = {
    menu: this._createId(),
  };

  readonly mealIds = {
    southernClassic: this._createId(),
    sushiDinner: this._createId(),
  };

  readonly dishIds = {
    cornbread: this._createId(),
    enchiladas: this._createId(),
    friedChicken: this._createId(),
    greekSalad: this._createId(),
    huevosRotos: this._createId(),
    macAndCheese: this._createId(),
    misoSoup: this._createId(),
    pizza: this._createId(),
    redLentilSoup: this._createId(),
    roastedCauliflower: this._createId(),
    salmonBurgers: this._createId(),
    sushi: this._createId(),
    sweetPotatoFries: this._createId(),
    tiramisu: this._createId(),
    thaiCurry: this._createId(),
  };

  readonly tagIds = {
    easy: this._createId(),
    pescatarian: this._createId(),
    vegan: this._createId(),
    vegetarian: this._createId(),
  };

  readonly ingredientTypeIds = {
    produce: this._createId(),
    refrigerated: this._createId(),
    spice: this._createId(),
  };

  readonly ingredientIds = {
    eggs: this._createId(),
    garlic: this._createId(),
    oliveOil: this._createId(),
    onion: this._createId(),
    paprika: this._createId(),
    pepper: this._createId(),
    potato: this._createId(),
    salt: this._createId(),
  };

  constructor(private _createId: () => string) {}
}
