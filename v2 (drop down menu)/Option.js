export default class Option {
  constructor(template, info, pokemonList, handlePokemonPopup) {
    this._template = template;
    this._info = info;
    this._pokemonList = pokemonList;
    this._handlePokemonPopup = handlePokemonPopup;
  }

  appendCard() {
    this._pokemonList.append(this._newCard);
  }

  getPokemonData() {
    fetch(this._info.url, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this._fullDataSet = res;
        this._pokemonImage.src = this._fullDataSet.sprites["front_default"];
        this._pokemonName.textContent = "#" + this._fullDataSet.id + " " + this._fullDataSet.name;
      })
      .then(() => {

        this.setEventListeners();
      });
  }

  setEventListeners() {
    this._newCard.addEventListener("click", () => {
      this._handlePokemonPopup(
        this._fullDataSet.name,
        this._fullDataSet.sprites["front_default"],
        this._fullDataSet.height,
        this._fullDataSet.weight
      );
    });
  }

  

  generatePokemonCard() {
    this._newCard = this._template.content
      .querySelector(".pokemon__card")
      .cloneNode(true);
    this._pokemonImage = this._newCard.querySelector(".pokemon__image");
    this._pokemonName = this._newCard.querySelector(".pokemon__name");
    this.appendCard();

    this.getPokemonData();
  }
}
