
const changeColorAndDisplayHex = () => {
    changeColor();
    displayColorHex();
}

//Yeah this is way more bloated than the youtube video...
const displayColorHex = () => {
    let currentColor = document.getElementById('body').style.backgroundColor;
    currentColor = rgba2hex(currentColor);
    console.log(currentColor);
    document.getElementById('colorTextDisplay').textContent = "The Hex Color Value Is : " + currentColor;

    if(Number(currentColor[1]) <= 3){//If the color too is close to black, change the text color.
        document.getElementById('colorTextDisplay').style.color = '#ffffff';
    }else{
        document.getElementById('colorTextDisplay').style.color = '#000000';
    }
}

const changeColor = () => {
    let newColor = 'rgb(';
    newColor += createRandomColorValue() + ',';
    newColor += createRandomColorValue() + ',';
    newColor += createRandomColorValue();
    newColor += ")";

    console.log(newColor);
    document.getElementById('body').style.backgroundColor = newColor;
}

const createRandomColorValue = () => {
    const newValue = Math.round(Math.random() * 255);
    console.log(newValue);
    return newValue;
}

//pulled this from stackoverflow... It works, but WOW this is painful. I bet there is an easier(more readable) way to convert between these two types.
//Shouldn't something like this be built in?
const rgba2hex = (rgba) => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`

changeColorAndDisplayHex();