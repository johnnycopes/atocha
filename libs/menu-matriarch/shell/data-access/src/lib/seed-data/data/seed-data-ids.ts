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
    bread: this._createId(),
    condiment: this._createId(),
    dryGood: this._createId(),
    frozen: this._createId(),
    meat: this._createId(),
    preserved: this._createId(),
    produce: this._createId(),
    oil: this._createId(),
    refrigerated: this._createId(),
    seafood: this._createId(),
    spice: this._createId(),
  };

  readonly ingredientIds = {
    adobo: this._createId(),
    arborioRice: this._createId(),
    avocado: this._createId(),
    avocadoOil: this._createId(),
    basil: this._createId(),
    basmatiRice: this._createId(),
    bayLeaves: this._createId(),
    bellPepper: this._createId(),
    broccoli: this._createId(),
    cannedSalmon: this._createId(),
    cannedTomatoes: this._createId(),
    cardamom: this._createId(),
    cauliflower: this._createId(),
    cayennePepper: this._createId(),
    cheddarCheese: this._createId(),
    chickenStock: this._createId(),
    chickenThighs: this._createId(),
    chickpeas: this._createId(),
    chiliPowder: this._createId(),
    chives: this._createId(),
    cilantro: this._createId(),
    cinnamon: this._createId(),
    coconutOil: this._createId(),
    coriander: this._createId(),
    crushedRedPepper: this._createId(),
    cumin: this._createId(),
    eggplant: this._createId(),
    eggs: this._createId(),
    flour: this._createId(),
    garlic: this._createId(),
    garlicPowder: this._createId(),
    groundBeef: this._createId(),
    jasmineRice: this._createId(),
    ketchup: this._createId(),
    lemon: this._createId(),
    lime: this._createId(),
    mayonnaise: this._createId(),
    mozzarellaCheese: this._createId(),
    mushroom: this._createId(),
    mustard: this._createId(),
    nutmeg: this._createId(),
    oliveOil: this._createId(),
    onion: this._createId(),
    oregano: this._createId(),
    paprika: this._createId(),
    parsley: this._createId(),
    pepper: this._createId(),
    pizzaDough: this._createId(),
    potato: this._createId(),
    sage: this._createId(),
    salmon: this._createId(),
    salt: this._createId(),
    serranoPepper: this._createId(),
    sesameOil: this._createId(),
    spinach: this._createId(),
    sweetPotato: this._createId(),
    thyme: this._createId(),
    tomato: this._createId(),
    tomatoSauce: this._createId(),
    tortillas: this._createId(),
    tuna: this._createId(),
    turmeric: this._createId(),
  };

  constructor(private _createId: () => string) {}
}
