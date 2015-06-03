Pokedex.Router = Backbone.Router.extend({
  routes: {
    "" : "pokemonIndex"
  },

  pokemonDetail: function (id, callback) {
  },

  pokemonIndex: function (callback) {
    $(function () {
      var pokemons = new Pokedex.Collections.Pokemon();
      var pokemonIndex = new Pokedex.Views.PokemonIndex({
        collection: pokemons
      });
      pokemonIndex.refreshPokemon();
      $("#pokedex .pokemon-list").html(pokemonIndex.$el);
    });
    if (callback) {
      callback();
    }
  },

  toyDetail: function (pokemonId, toyId) {
  },

  pokemonForm: function () {
  }
});

$(function () {
  new Pokedex.Router();
  Backbone.history.start();
  console.log(Backbone.history);
});
