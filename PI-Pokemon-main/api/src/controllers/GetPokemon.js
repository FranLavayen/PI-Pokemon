const axios = require('axios');

const getPokemonApi = async () => {
    try {
        const { data } = await axios.get(
            "https://pokeapi.co/api/v2/pokemon/"
        );
        const pokemon = Promise.all(
            data.results.map(async (pokemon) => {
                let subRequest = await axios.get(pokemon.url);
                let pokemonResult = {
                    name: subRequest.data.name,
                    id: Number(subRequest.data.id),
                    hp: subRequest.data.stats[0].base_stat,
                    attack: subRequest.data.stats[1].base_stat,
                    defense: subRequest.data.stats[2].base_stat,
                    speed: subRequest.data.stats[4].base_stat,
                    height: subRequest.data.height,
                    weight: subRequest.data.weight,
                    image: subRequest.data.sprites.other.dream_world.front_default,
                    types: subRequest.data.types.map((type) => {
                        return { name: type.type.name };
                    }),
                    created: "false",
                };
                return pokemonResult;
            })
        );
        return pokemon;
    } catch (error) {
        return error;
    }
}


module.exports = { getPokemonApi }