
import Board from '../Board';

class Game {
    constructor() {
       this.computerterritory = new Board('Computer Territory');
       this.humanTerritory = new Board('Human Territory');
    }
}
const Games = new Game();

window.battleship = Object.assign(window.battleship || {}, { Games });

export default Games;