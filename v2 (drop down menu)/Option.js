export default class Option {
  constructor(template, info,index, pokemonList, handlePokemonClick) {
    this._template = template;
    this._info = info;
    this._index = index;
    this._pokemonList = pokemonList;
    this._handlePokemonClick = handlePokemonClick;
  }

  appendOption() {
    this._pokemonList.append(this._newOption);
  }

  // getPokemonData() {
  //   fetch(this._info.url, {
  //     method: "GET",
  //   })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((res) => {
  //       this._fullDataSet = res;
  //       this._pokemonImage.src = this._fullDataSet.sprites["front_default"];
  //       this._pokemonName.textContent = "#" + this._fullDataSet.id + " " + this._fullDataSet.name;
  //     })
  //     .then(() => {

  //       this.setEventListeners();
  //     });
  // }

  setEventListeners() {
    this._newOption.addEventListener("click", () => {
      console.log("clicked on " + this._info.name)





      this._handlePokemonClick(
        this._info.name
        // this._fullDataSet.sprites["front_default"],
        // this._fullDataSet.height,
        // this._fullDataSet.weight
      );
    });

  }

  

  generatePokemonOption() {
    this._newOption = this._template.content.querySelector(".pokemon__option").cloneNode(true);
    this._pokemonName = this._newOption.querySelector(".pokemon__name");
    this._pokemonName.innerHTML = `#${this._index+1}&nbsp;&nbsp;${this._info.name}`
    // this._pokemonImage = this._newOption.querySelector(".pokemon__image");

    
    this.appendOption();
    this.setEventListeners();
    // this.getPokemonData();
  }
}
