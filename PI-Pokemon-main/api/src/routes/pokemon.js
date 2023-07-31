const { getPokemonApi } = require('../Controllers/GetPokemon');

const router = require('express').Router();


router.get('/', async (req, res) => {
    const pokemon = await getPokemonApi();
    res.json(pokemon);
})

module.exports = router;