import DOM from "../../_core";

const Status = () => {
  const div_console = DOM.createElement({ className: "console" });
  const div_text = DOM.createElement({ className: "game-status" });
  div_console.appendChild(div_text);
  return div_console;
}

export default new Status();
