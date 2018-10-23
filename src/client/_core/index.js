
class DOM {
    render = (element, container) => {
      // container.insertAdjacentHTML('beforeend', element);
      container.appendChild(element);
    }
    createElement = (option) => {
      const elem = document.createElement(option.tag || 'div');
      option.id && (elem.id = option.id);
      option.className && (elem.className = option.className);
      option.innerText && (elem.innerText = option.innerText);
      option.onclick && (elem.onclick = option.onclick);
      return elem;
    }
  }
  
  export default new DOM();
  