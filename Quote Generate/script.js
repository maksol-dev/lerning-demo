const QuoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');

let apiQuotes = [];

//show Quote
function newQuote(){
    //Pick a Random Quote
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    quoteText.textContent = quote.text;
    if(!quote.author){
        authorText.textContent = 'UnKnown';
    }
    else{
        authorText.textContent = quote.author;

    }
}

async function getQuotes(){
    const apiUrl='https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }catch (error){
        //catch the more
    };
}
getQuotes();
newQuoteBtn.addEventListener('click', newQuote);