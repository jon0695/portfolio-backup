
const returnJSONData = async (fileQuery) => {
    const response = await fetch(fileQuery);
    const jsonData = await response.json();
    return jsonData;
  }

const changeQuote = async () => {
    const quotes = Object.values(await returnJSONData("./famousQuotes.json"));
    randomNumber = Math.floor(Math.random() * quotes.length);
    document.getElementById('quoteContainer').textContent = quotes[randomNumber];
}

changeQuote();