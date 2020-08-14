const baseUrl = "https://pokeapi.co/api/v2/";

export default class Pokemon {
  constructor() {
  }

  getPokemon(options) {
    return fetch(`${baseUrl}pokemon?offset=${options.offset}&limit=${options.limit}`, {
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
