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
      leader: {}
    }
    this.onDropDownChange = this.onDropDownChange.bind(this);
    this.onSSChange = this.onSSChange.bind(this);
    this.checkLeader = this.checkLeader.bind(this);
    this.checkUpgrade = this.checkUpgrade.bind(this);
    this.compare = this.compare.bind(this);
    this.onUpgradeChange = this.onUpgradeChange.bind(this);
    this.checkUnit = this.checkUnit.bind(this);
    this.checkMerc = this.checkMerc.bind(this);

  }

  onDropDownChange(event){
    if (event.target.name === 'faction'){
      this.setState({
        leader: {},
        faction: event.target.value
      })
    } else {
      console.log(event.target.value);
      this.setState({leader: data[event.target.value]})
    }
  }

  onUpgradeChange(event){

  }

  onUnitChange(event){

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

  checkUpgrade(unit){
    if (unit.characteristics.includes('Campaign')) {
      return false;
    }
    if (!this.compare(unit.faction, this.state.faction) || !this.compare(unit.rank, 'Upgrade')){
      return false;
    }
    console.log(unit);
    return true;
  }

  checkUnit(unit){
    if(!this.compare(unit.faction, this.state.faction) || this.compare(unit.rank, 'Upgrade') || this.compare(unit.rank, 'Master')){
      return false;
    }
    if(this.compare(unit.name, this.state.leader.name)){
      return false;
    }
    return true;
  }

  checkMerc(unit){
    if(!this.compare(unit.characteristics, 'Mercenary')){
      return false;
    }
    if(this.compare(unit.faction, this.state.faction)){
      return false;
    }
    if(this.state.faction === 'Guild' && unit.name === 'Lazarus'){
      return false;
    }
    return true;
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
          <select name="leader"  onChange={this.onDropDownChange}>
            <option>Select
            </option>
            {
              data.filter(this.checkLeader).map(el => (
                <option key={el.id} value={el.id}>{el.name}
                </option>
                )
              )
            }
          </select>
          <div>Cache {this.state.leader.cache}</div>
          <div>
            <button>
              + add upgrade
            </button>
            <select name="upgrade"  onChange={this.onUpgradeChange}>
              <option>Select
              </option>
              {
                data.filter(this.checkUpgrade).map(el => (
                  <option key={el.id} value={el.id}>{el.name}  - {el.cost}ss
                  </option>
                  )
                )
              }
            </select>
          </div>
        </div>

        <div>
          <button>
            + add unit
          </button>
          <select name="unit"  onChange={this.onUnitChange}>
            <option>Select
            </option>
            {
              data.filter(this.checkUnit).map(el => (
                <option key={el.id} value={el.id}>{el.name}  - {el.cost}ss
                </option>
                )
              )
            }
          </select>
        </div>

        <div>
          <button>
            + add merc
          </button>
          <select name="unit"  onChange={this.onUnitChange}>
            <option>Select
            </option>
            {
              data.filter(this.checkMerc).map(el => (
                <option key={el.id} value={el.id}>{el.name}  - {el.cost + 1}ss
                </option>
                )
              )
            }
          </select>
        </div>
      </div>
    );
  }
}

export default App;
