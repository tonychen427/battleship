import DOM from "../../_core";
import game from '../../services/Game';
import logger from '../../services/logger';

class Board {
  constructor(territory) {
    this.size = 10;
    this.battleShipBoard = territory;
    this.lastSuccessfulShot = '';
    this.isGameOver = false;
  }

  isHumanTerritory = () => {
    return this.battleShipBoard.territory === game.humanTerritory.territory;
  }

  getPointSettingByIndex = index => { 
    const battleshipPoints = this.battleShipBoard.gameBoard.getAllShipLocations();
    const x = Math.floor(index % this.size);
    const y =  Math.floor(index / this.size);
    const position =  x + "-" + y;
    let className = "points";
    if (this.isHumanTerritory()) {
      const isBattleShipPoint = battleshipPoints.indexOf(x+''+y);
      className = isBattleShipPoint < 0 ? "points" : "points battleship";
    }
    return {
      className,
      position
    }
  }

  checkGameOver = () => {
    const computerBoard = game.computerterritory.gameBoard.isAllDestroyed();
    const humanBoard = game.humanTerritory.gameBoard.isAllDestroyed();
    if (computerBoard || humanBoard) {
      this.isGameOver = true;
      const GameOverMsg = ">> "+(humanBoard ? game.computerterritory.territory : game.humanTerritory.territory ) + ' is winning';
      logger.info(GameOverMsg);
    }
  }

  humanAttack = e => {
    // human attach computer territory
    const className = e.target.className;
    const tempCoord = className.split(" ")[0].split("-");
    const computerTerritory = game.computerterritory;
    const isHit = computerTerritory.attackShip(tempCoord[0] + "" + tempCoord[1]);
    const computerBoardCell = document.getElementsByClassName(className)[0]
    computerBoardCell.className = isHit ? "hit" : "miss";
    computerBoardCell.onclick = null;
    const message = ">> You hit  [" + (parseInt(tempCoord[0])+1)+ ":" + (parseInt(tempCoord[1])+1) + "] and it is " + (isHit ? 'hit' : 'missed');
    logger.info(message);
  }

  computerAttack = () => {
    // computer attach human territory
    const humanTerritory = game.humanTerritory;
    const generateCoords = this.lastSuccessfulShot === '' ? 
                            humanTerritory.generateRandomCoords() :
                            humanTerritory.generateEducatedCoords(this.lastSuccessfulShot);

    const isHumanHit = humanTerritory.attackShip(generateCoords.x + '' + generateCoords.y);
    this.lastSuccessfulShot = isHumanHit ? generateCoords : '';

    const humanTerritoryPoint = generateCoords.x + '-' + generateCoords.y + ' ' + humanTerritory.territory + ' hole ';
    const domHumanTerritoryPoint = document.getElementsByClassName(humanTerritoryPoint);
    if (domHumanTerritoryPoint.length > 0) {
      domHumanTerritoryPoint[0].className = isHumanHit ? "hit" : "miss";
    }
    const message = ">> Computer hit  [" + (generateCoords.x+1)+ ":" + (generateCoords.y+1) + "] and it is " + (isHumanHit ? 'hit' : 'missed');
    logger.info(message);
  }

  handleOnClick = e => {
    if (this.isGameOver) return;
    this.humanAttack(e)
    this.computerAttack();
    this.checkGameOver();
  };
  
  render() {
    const div_top = DOM.createElement({ className: "gridWrapper" });

    div_top.appendChild(DOM.createElement({ className: "aTops hidezero", innerText: "0" }));
    for (let i = 1; i <= this.size; i++) {
      div_top.appendChild(DOM.createElement({ className: "aTops", innerText: i }));
    }

    const ul_grid = DOM.createElement({ tag: "ul", className: "grid" });
    div_top.appendChild(ul_grid);
    for (let i = 0; i < this.size * 10; i++) {
      const pointSetting = this.getPointSettingByIndex(i);
      const li_point = DOM.createElement({ tag: "li", className: pointSetting.className });
      const span_hole = DOM.createElement({
        tag: "span",
        className: pointSetting.position + " " + this.battleShipBoard.territory + " hole ",
        innerText: "&nbsp;",
        onclick: !this.isHumanTerritory() ? this.handleOnClick : null
      });
      li_point.appendChild(span_hole);
      ul_grid.appendChild(li_point);
    }

    for (let i = 1; i <= this.size; i++) {
      const leftColumn = DOM.createElement({ tag: "span", className: "aLeft", innerText: i });
      div_top.appendChild(leftColumn);
    }

    return div_top;
  }
}
export default Board;
