import React from 'react';
import './App.css';
import items from '../../BungieManifest/InventoryItem.json';

const url = 'https://www.bungie.net/Platform/Destiny2//Vendors/?components=402';
const apiKey = '39c9bfabfc4848469e52019b7115052c'

class xurUpdates extends React.Component {

  constructor() {
    super();
    this.state = {
      itemsForSale: [],
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
          itemsForSale: result.Response.sales.data["2190858386"].saleItems
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
    // Importing the values from the Bungie Manifest
    var obj = Object.values(items); 
    for (var i = 0; i < obj.length; i++) {
      if(obj[i].hash == props.item) {
        return(
          <div className="card">
            <div className="card__icon">
              <img src={"https://www.bungie.net" + obj[i].displayProperties.icon} alt="item-img"/>
            </div>
            <div className="card__desc">
              <div>
                <p className="card__desc__title">{obj[i].displayProperties.name}</p>
                <p className="card__desc__type">{obj[i].itemTypeAndTierDisplayName}</p>
                <div className="card__desc__price">
                  <img src={"https://www.bungie.net/common/destiny2_content/icons/1ff4a008cb851794ccb588e4eb3918a1.png"} alt="Legendary Shards"/>
                  ?/{props.cost}
                </div>
              </div>
              <div>
                {obj[i].displayProperties.description}
              </div>
            </div>
          </div>
          )  
      }
    }
    return(<div>NOT FOUND</div>)
  }

  getCost(cost) {
    var t = (cost).length
    if (t == 0) {
      return 0
    }
    else {
      return (Object.values(cost[0])[1])
    }
  }

  render() {
    const {loaded, itemsForSale, error} = this.state;
    const array = Object.values(itemsForSale);
    // Moving item to end of Array (One of the consumables, can only do this because I know the order)
    array.push(array.shift());
    
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
                <this.returnItems item={item.itemHash} cost={this.getCost(Object.values(item.costs))}/>
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
