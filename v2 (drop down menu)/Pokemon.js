const baseUrl = "https://pokeapi.co/api/v2/";

export default class Pokemon {
  constructor() {
  }

  getPokemon() {
    return fetch(`${baseUrl}pokemon?offset=0&limit=151`, {
      method: "GET",
    }).then((res) => {
      return res.json();
    });
  }

  getPokemonData(pokemonName){
    return Promise.all([fetch(`${baseUrl}pokemon/${pokemonName}`, {
      method:"GET"
    }),
    fetch(`${baseUrl}pokemon-species/${pokemonName}`, {
      method:"GET"
    })])
    .then (res => {
      console.log(res)
      return Promise.all(res.map((response) => {
        return response.json();
      }))
    })


    // return fetch(`${baseUrl}pokemon/${pokemonName}`, {
    //   method:"GET"
    // })
    // .then (res => {
    //   if (res.ok){
    //     return res.json();
    //   }
    // })
      
  }
}
