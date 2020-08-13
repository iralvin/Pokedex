const baseUrl = "https://pokeapi.co/api/v2/";

export default class Pokemon {
  constructor(template) {
    this._cardTemplate = template;
  }



  getPokemon() {
    return fetch(`${baseUrl}pokemon?offset=0&limit=10`, {
      method: "GET",
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }
}
