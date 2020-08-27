export default class Card {
  constructor(template, info, index, pokemonGrid, handlePokemonPopup) {
    this._template = template;
    this._info = info;
    this._pokemonGrid = pokemonGrid;
    this._handlePokemonPopup = handlePokemonPopup;
  }

  appendCard() {
    this._pokemonGrid.append(this._newCard);
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
        this._pokemonName.textContent =
          "#" + this._fullDataSet.id + " " + this._fullDataSet.name;
      })
      .then(() => {
        this.setEventListeners();
      });
  }

  setEventListeners() {
    this._newCard.addEventListener("click", () => {
      console.log("clicked on pokemon grid card");
      this._handlePokemonPopup(this._info.name);
    });
  }

  generatePokemonCard() {
    this._newCard = this._template.content
      .querySelector(".pokemon__card")
      .cloneNode(true);

    this._pokemonImage = this._newCard.querySelector(".pokemon__card_image");
    this._pokemonName = this._newCard.querySelector(".pokemon__card_name");
    this.appendCard();

    this.getPokemonData();
  }
}
