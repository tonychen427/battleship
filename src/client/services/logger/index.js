
import DOM from '../../_core';
class ConsoleLogger {
    info(message) {
        document.getElementsByClassName('game-status')[0].prepend(DOM.createElement({ innerText: message }));
    }
}

export default new ConsoleLogger();