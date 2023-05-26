
const returnJSONData = async (fileQuery) => {
  const response = await fetch(fileQuery);
  const jsonData = await response.json();
  return jsonData;
}

let oldRandomNumber = NaN;
const changeQuote = async () => {
  const quotes = Object.values(await returnJSONData("./famousQuotes.json"));
  const randomNumber = Math.floor(Math.random() * quotes.length);
  if (oldRandomNumber !== randomNumber) {
    splitQuote = splitQuoteAndAuthor(quotes[randomNumber]);
    document.getElementById('quoteP').textContent = splitQuote[0];
    document.getElementById('author').textContent = (" - " + splitQuote[1]);
    oldRandomNumber = randomNumber;
  }else{
    console.log("Would have used the same quote twice. So i called the function again.");
    changeQuote();
  }
}

const splitQuoteAndAuthor = (quoteData) => {
  const newData = quoteData.split("~~");
  console.log(newData);
  return newData;
}
