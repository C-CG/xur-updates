import React from 'react';
import './App.css';

class xurUpdates extends React.Component {

  constructor() {
    super();
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    // Loading Screen
    setTimeout(
      function() {
        this.setState({loaded : true});
      }.bind(this), 2000
    )
  }

  render() {
    const {loaded} = this.state;

    if(!loaded) {
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
          <p>LOADED</p>
        </div>
        )
    } 
  }
}

export default xurUpdates;
