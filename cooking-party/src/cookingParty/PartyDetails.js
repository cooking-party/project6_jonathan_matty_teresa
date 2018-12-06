import React, {Component} from 'react';
import { Route, Link, NavLink } from "react-router-dom";
import firebase from '../firebase/firebase.js';
import SearchForRecipe from '../recipes/SearchForRecipe';


class PartyDetails extends Component {
  constructor() {
    super();
    this.state = {
      partyDetails: {},
      // firebaseKey: ''
    }
  }
  componentDidUpdate(prevProps) {
    const dbRef = firebase.database().ref(`/${this.props.match.params.party_id}`);
    if (this.props.match.params.party_id !== prevProps.match.params.party_id) {
      dbRef.on('value', (snapshot) => {
        this.setState({
          partyDetails: snapshot.val() || {},
          // firebaseKey: this.props.match.params.party_id
        })
      })
    }
  }
  render() {
    return (
      <div>
        <h1>{this.state.partyDetails.name}</h1>
        <p>Date: {this.state.partyDetails.date}</p>
        <p>Invitees:</p>
        <ul>
        </ul>
        {
          <SearchForRecipe firebaseKey={this.props.match.params.party_id}/>
        }
      </div>
      
    )
  }
}

export default PartyDetails;