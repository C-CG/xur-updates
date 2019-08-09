import React from 'react';
import './App.css';

const url = 'https://www.bungie.net/Platform/Destiny2//Vendors/?components=402';
const comp = ''
const apiKey = '39c9bfabfc4848469e52019b7115052c'

class xurUpdates extends React.Component {

  constructor() {
    super();
    this.state = {
      exotics: [],
      consumables: [],
      loaded: false,
      error: null,
    };
  }

  componentDidMount() {
    // Fetch
    fetch(url, {headers: {"X-API-KEY": apiKey}})
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          exotics: result.Response.sales.data["2190858386"].saleItems
        });
      },
      (error) => {
        this.setState({
          error
        });
      }
    )
    
    // Loading Screen
    setTimeout(
      function() {
        this.setState({loaded : true});
      }.bind(this), 2000
    )
  }

  render() {
    const {loaded, exotics, consumables, error} = this.state;
    const array = Object.values(exotics);

    if (error) {
      return ( <div>
        <p>{error.message}</p>
        </div>)
    }
    else if(!loaded) {
      return (
        <div className="container">   
          <div className="center-transform">
            <img className="logo" src={require('../../assets/images/logo.jpg')} alt="logo"/>
          </div>   
        </div>
      )
    }
    else {
      return(
        <div className="container">
          <ul>
            {array.map(item => (
              <li key={item.key}>
                <p>{item.itemHash}</p>
              </li>
            ))
            }
          </ul>
        </div>
        )
    } 
  }
}

export default xurUpdates;
