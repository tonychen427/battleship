import DOM from "./_core";
import board from "./component/board";
import dashboard from "./component/dashboard";
import status from "./component/status";
import game from "./services/Game";
class App {
  render() {
    const div_main = DOM.createElement({ id: "main" });
    const div_board = DOM.createElement({ className: "board" });
    const div_displays = DOM.createElement({ className: "displays" });
    const div_panel = DOM.createElement({ className: "panel" });

    div_displays.appendChild(new board(game.computerterritory).render());
    div_displays.appendChild(new board(game.humanTerritory).render());
    div_panel.appendChild(dashboard);
    div_panel.appendChild(status);
    div_board.appendChild(div_displays);
    div_main.appendChild(div_board);
    div_main.appendChild(div_panel);

    return div_main;
  }
}

export default new App().render();
