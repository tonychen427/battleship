import DOM from "../../_core";
import game from '../../services/Game';
class Dashboard {
  startNewGame = () => {
    window.location.reload();
  }
  render() {
    const div_topPanel = DOM.createElement({ className: "topPanel" });
    const div_layout = DOM.createElement({ className: "layout" });
    const div_new_game_btn = DOM.createElement({ className: "actionBtn", innerText: 'New Game', onclick: this.startNewGame });

    const div_Computer_territory = DOM.createElement({ innerText: "Top Territory: " + game.computerterritory.territory });
    const div_human_territory = DOM.createElement({ innerText: "Bottom Territory: " + game.humanTerritory.territory });
    div_layout.appendChild(div_new_game_btn);
    div_layout.appendChild(div_Computer_territory);
    div_layout.appendChild(div_human_territory);
    div_topPanel.appendChild(div_layout);
    return div_topPanel;
  }
}
export default new Dashboard().render();
