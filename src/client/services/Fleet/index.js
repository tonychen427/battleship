import { boardSize, numShips} from '../../common/constants';
import Ship from "../Ship";

class Fleet {
  constructor() {
    this.ships = [];
    this.generateShipLocations();
  }
  isAllDestroyed = () => {
    for (let i = 0; i < numShips; i++) {
      if (!this.ships[i].isSunk()) { return false; }
    }
    console.log(this.ships);
    return true;
  }
  getAllShipLocations() {
    const battleshipPoints = [];
    const ships = this.ships;
    for (let i = 0; i < ships.length; i++) {
      battleshipPoints.push(...ships[i].location);
    }
    return battleshipPoints;
  }
  generateShipLocations() {
    let location;
    for (let i = 0; i < numShips; i++) {
      do {
        location = this.generateShip();
      } while (this.collision(location));
      this.ships.push(new Ship(location, location.length));
    }
  }

  generateShip() {
    const direction = Math.floor(Math.random() * 2);
    let row, col;

    if (direction === 1) {
      row = Math.floor(Math.random() * boardSize);
      col = Math.floor(Math.random() * (boardSize - numShips));
    } else {
      row = Math.floor(Math.random() * (boardSize - numShips));
      col = Math.floor(Math.random() * boardSize);
    }

    let newShipLocations = [];
    const min = 3;
    const max = 5;
    let sizeBattleShip = Math.floor(Math.random()*(max-min+1)+min); 
    for (let i = 0; i < sizeBattleShip; i++) {
      if (direction === 1) {
        newShipLocations.push(row + "" + (col + i));
      } else {
        newShipLocations.push(row + i + "" + col);
      }
    }
    return newShipLocations;
  }

  collision(locations) {
    for (let i = 0; i < numShips; i++) {
      let ship = this.ships[i] || new Ship();
      for (let j = 0; j < locations.length; j++) {
        if (ship.location && ship.location.indexOf(locations[j]) >= 0) {
          return true;
        }
      }
    }
    return false;
  }
}

export default Fleet;
