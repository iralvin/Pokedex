export default class Option {
  constructor(
    template,
    info,
    index,
    pokemonList,
    handlePokemonClick,
    dropdownListButton
  ) {
    this._template = template;
    this._info = info;
    this._index = index;
    this._pokemonList = pokemonList;
    this._handlePokemonClick = handlePokemonClick;
    this._dropdownListButton = dropdownListButton;
  }

  appendOption() {
    this._pokemonList.append(this._newOption);
  }

  setEventListeners() {
    this._newOption.addEventListener("click", () => {
      console.log("clicked on " + this._info.name);
      this._dropdownListButton.innerHTML = `#${this._index + 1}&nbsp;&nbsp;${
        this._info.name
      } ▼`;
      this._handlePokemonClick(this._info.name);
    });
  }

  generatePokemonOption() {
    this._newOption = this._template.content
      .querySelector(".dropdown___list-item")
      .cloneNode(true);
    this._pokemonName = this._newOption.querySelector(".dropdown__list-item_name");
    this._pokemonName.innerHTML = `#${this._index + 1}&nbsp;&nbsp;${
      this._info.name
    }`;

    this.appendOption();
    this.setEventListeners();
  }
}
