import React, { Component } from 'react';
import data from './malifauxData.json';
import './App.css';
// console.log(data);
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      soulstones: 50,
      soulstonesSpent: 0,
      faction: 'Select',
      leader: 'Select',
      cache: 0
    }
    this.onDropDownChange = this.onDropDownChange.bind(this);
    this.onSSChange = this.onSSChange.bind(this);
    this.checkLeader = this.checkLeader.bind(this);
    this.compare = this.compare.bind(this);
  }

  onDropDownChange(event){
    if (event.target.name === 'faction'){
      this.setState({leader: 'select'})
      this.setState({[event.target.name]: event.target.value})
    } else {
      this.setState({[event.target.name]: event.target.value})
    }
  }

  onSSChange(event){
    this.setState({soulstones: event.target.value})
  }

  checkLeader(unit){
    if (!this.compare(unit.faction, this.state.faction)) {
      return false;
    }
    let master = false;
    let henchman = false;

    if (this.state.soulstones > 25) {
      master = (this.compare(unit.rank, 'Master'));
    }
    if (this.state.soulstones <= 40) {
      henchman = (this.compare(unit.rank, 'Henchman'));
    }
    return master || henchman;
  }

  compare(a, b) {
    return (a.includes(b) || a === b);
  }

  render() {
    return (
      <div>
        Soulstones
        <input value={this.state.soulstones}onChange={this.onSSChange} />
        <div>{this.state.soulstones - this.state.soulstonesSpent} Soulstones left</div>

        Faction
        <select name="faction" value={this.state.faction} onChange={this.onDropDownChange}>
          <option disabled>Select
          </option>
          <option value="Guild">Guild
          </option>
          <option value="Resurrectionist">Reserrectionist
          </option>
          <option value="Neverborn">Neverborn
          </option>
          <option value="Arcanist">Arcanist
          </option>
          <option value="Outcast">Outcast
          </option>
          <option value="Ten Thunders">Ten Thunders
          </option>
          <option value="Gremlin">Gremlin
          </option>
        </select>
        <br/>

        <div>
          Leader
          <select name="leader" value={this.state.leader} onChange={this.onDropDownChange}>
            <option disabled>Select
            </option>
            {
              data.filter(this.checkLeader).map(el => (
                <option key ={el.id}value={el.name}>{el.name}
                </option>
                )
              )
            }
          </select>
          {/* <div>+ upgrade</div> */}
        </div>

        <div>Cache {this.state.cache}</div>
        <div>+ add unit</div>
      </div>
    );
  }
}

export default App;
