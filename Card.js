export default class Card {
  constructor(template, info, pokemonList, popupWindow) {
    this._template = template;
    this._info = info;
    this._pokemonList = pokemonList;
    this._popupWindow = popupWindow;
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
        // console.log(res)
        // setPokemonCardInfo(res)
        console.log(res.sprites);
        this._pokemonImage.src = res.sprites["front_default"];
        this._pokemonName.textContent = res.name;
        this.appendCard();
      });
  }

  setEventListeners() {
    this._popupWindow.addEventListener("click", (e) => {
      if (e.target === this._popupWindow)
        this._popupWindow.classList.remove("popup_visible");
    });

    this._newCard.addEventListener("click", () => {
      this._popupWindow.classList.add("popup_visible");
    });
  }

  generatePokemonCard() {
    // console.log(this._info);
    this._newCard = this._template.content
      .querySelector(".pokemon__card")
      .cloneNode(true);
    this._pokemonImage = this._newCard.querySelector(".pokemon__image");
    this._pokemonName = this._newCard.querySelector(".pokemon__name");

    this.getPokemonData();
    this.setEventListeners();
  }
}
