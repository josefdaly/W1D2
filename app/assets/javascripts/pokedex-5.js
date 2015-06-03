Pokedex.Views = {}

Pokedex.Views.PokemonIndex = Backbone.View.extend({
  events: { 'click .poke-list-item': 'selectPokemonFromList'
  },

  initialize: function () {
    this.listenTo(this.collection, "sync add", this.render.bind(this));
  },

  addPokemonToList: function (pokemon) {
    this.$el.append(JST["pokemonListItem"]({pokemon: pokemon}));
  },

  refreshPokemon: function (options) {
    this.collection.fetch();
  },

  render: function () {
    var view = this;
    this.$el.empty();
    this.collection.each(function(pokemon) {
      view.addPokemonToList(pokemon);
    });
  },

  selectPokemonFromList: function (event) {
    event.preventDefault();
    var $pokemon = $(event.currentTarget);
    var pokemon = this.collection.find({ id: $pokemon.data('id') });
    var pokemonDetail = new Pokedex.Views.PokemonDetail({
      model: pokemon
    });

    $("#pokedex .pokemon-detail").html(pokemonDetail.$el);
    pokemonDetail.refreshPokemon();
  }
});

Pokedex.Views.PokemonDetail = Backbone.View.extend({
  events: { 'click .toys li' : 'selectToyFromList'
  },

  refreshPokemon: function (options) {
    this.model.fetch({
      success: this.render.bind(this)
    });
  },

  render: function () {
    this.$el.append(JST["pokemonDetail"]({ pokemon: this.model }));
    var view = this;
    this.model.toys().each( function(toy) {
      view.$('ul.toys').append(JST["toyListItem"]({ toy: toy }));
    });
  },

  selectToyFromList: function (event) {
    event.preventDefault();

    var toy = this.model.toys().find({ id: $(event.currentTarget).data('id') });
    var toyDetail = new Pokedex.Views.ToyDetail({ model: toy });

    $("#pokedex .toy-detail").html(toyDetail.$el);
    toyDetail.render();
  }
});

Pokedex.Views.ToyDetail = Backbone.View.extend({
  initialize: function(options) {
    this.pokemonList = new Pokedex.Collections.Pokemon();
    this.pokemonList.fetch();
    this.listenTo(this.pokemonList, "sync", this.render);
  },

  render: function () {
    this.$el.html(JST["toyDetail"]({ toy: this.model, pokes: this.pokemonList }));
  }
});


// $(function () {
//   var pokemons = new Pokedex.Collections.Pokemon();
//   var pokemonIndex = new Pokedex.Views.PokemonIndex({
//     collection: pokemons
//   });
//   pokemonIndex.refreshPokemon();
//   $("#pokedex .pokemon-list").html(pokemonIndex.$el);
// });
