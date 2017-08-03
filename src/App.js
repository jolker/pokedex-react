import React, {Component} from 'react';
import './App.css';

class Pokemon extends Component {
  render() {
    const {pokemon, id} = this.props;
    return <div className="pokemon--species">
      <div className="pokemon--species--container">
        <div className="pokemon--species--sprite">
          <img src={process.env.PUBLIC_URL + `/sprites/${id}.png`}/>
        </div>
        <div className="pokemon--species--name">
          {pokemon.name}
        </div>
      </div>
    </div>;
  }
}

class PokemonList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      species: [],
      fetched: false,
      loading: false
    };
  }
  componentWillMount() {
    this.setState({loading: true});
    fetch('http://pokeapi.co/api/v2/pokemon?limit=151').then(res => res.json()).then(response => {
      this.setState({species: response.results, loading: true, fetched: true});
    });
  }

  render() {
    const {fetched, loading, species} = this.state;
    let content;
    if (fetched) {
      content = <div className="pokemon--species--list">{species.map((pokemon, index) =>< Pokemon key = {
          pokemon.name
        }
        id = {
          index + 1
        }
        pokemon = {
          pokemon
        } />)}</div>;
    } else if (loading && !fetched) {
      content = <p>
        Loading ...</p>;
    } else {
      content = <div/>;
    }
    return <div>
      {content}
    </div>;
  }
}

class App extends Component {
  render(){
    return <div className="pokeapp">
      <h1> The Kanto PokeDex! </h1>
      <PokemonList/>
    </div>;
  }
}

export default App
