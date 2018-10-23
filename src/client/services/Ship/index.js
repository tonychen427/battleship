const HIT = "hit";
class Ship {
  constructor(location, shipLength) {
    this.hits = [];
    this.location = location;
    this.shipLength = shipLength;
  }
  isSunk = () => {
    for (let i = 0; i < this.shipLength; i++) {
      if (this.hits[i] !== HIT) {
        return false;
      }
    }
    return true;
  };
  hit = guess => {
    let index = this.location.indexOf(guess);
    if (index < 0) {
      return false;
    }

    this.hits[index] = HIT;
    return true;
  };
}

export default Ship;
