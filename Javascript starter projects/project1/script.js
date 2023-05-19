const changeColor = () => {
    let newColor = 'rgb(';
    newColor+=createRandomColorValue() + ',';
    newColor+=createRandomColorValue() + ',';
    newColor+=createRandomColorValue();
    newColor+=")";
    
    console.log(newColor);
    document.getElementById('body').style.backgroundColor = newColor;
}

const createRandomColorValue = () => {
    const newValue = Math.round(Math.random() * 255);
    console.log(newValue);
    return newValue;
}