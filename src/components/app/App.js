import React from 'react';
import './App.css';
import items from '../../BungieManifest/InventoryItem.json';

const url = 'https://www.bungie.net/Platform/Destiny2//Vendors/?components=402';
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
          // Large ID = unique reference to Xur
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

  returnItems(props) {
    var obj = Object.values(items); 
    for (var i = 0; i < obj.length; i++) {
      if(obj[i].hash == props.item) {
        console.log("ITEM FOUND: " + obj[i].displayProperties.name)
        return(
          <div className="row">
            <div className="row__icon">
              <img src={"https://www.bungie.net" + obj[i].displayProperties.icon}/>
            </div>
            <div className="row__desc">
              <div style={{paddingTop: "7px", borderBottom: "3px solid white"}}>
                <p className="row__desc__title">{obj[i].displayProperties.name}</p>    
                <p className="row__desc__desc">{obj[i].displayProperties.description}</p>
              </div>
              <div>
                <p>Cost: {props.cost}</p>
              </div>            
            </div>           
          </div>
        )    
      }
    }
    return(<div>NOT FOUND</div>)
  }

  render() {
    const {loaded, exotics, consumables, error} = this.state;
    const array = Object.values(exotics);
    const cost = 0;
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
          <ul style={{listStyle: "none"}}>
            {array.map(item => (
              <li key={item.key} onClick={() => console.log(Object.values(item.costs[0])[1])}>
                <this.returnItems item={item.itemHash} cost={"NA"}/>
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
