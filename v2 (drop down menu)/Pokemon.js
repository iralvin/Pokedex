const baseUrl = "https://pokeapi.co/api/v2/";

export default class Pokemon {
  constructor(template) {
    this._cardTemplate = template;
  }

  getPokemon() {
    return fetch(`${baseUrl}pokemon?offset=0&limit=151`, {
      method: "GET",
    }).then((res) => {
      return res.json();
    });
  }
}
