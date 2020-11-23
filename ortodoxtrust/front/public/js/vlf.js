var SupportsCSS = (property, value) =>{
    const element = document.createElement('span');
    if (element.style[property] == undefined) return !1;
    element.style.cssText = property + ':' + value; // Вносим новое свойство в style элемента
    return element.style[property] === value;
}

if(!SupportsCSS('display','grid')){
    alert('Браузер не поддерживает GridBox, обновите браузер')
}