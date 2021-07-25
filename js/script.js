let apiQuotes = []

// Fetch items in HTML
const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')
const bg_loader = document.getElementById('bg-loading')

// Show loading
function loading() {
    loader.hidden = false
    bg_loader.hidden = false
    quoteContainer.hidden = true
}

// Hide loading
function complete() {
    loader.hidden = true
    bg_loader.hidden = true
    quoteContainer.hidden = false
}

// Show new quote
function newQuote() {
    loading()
    // Pick random number
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    
    // Check if author field is blank then replace it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = "Unknown"
    }
    else {
        authorText.textContent = quote.author
    }
    
    // Check quote length to determine the styling
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text
    complete()
}

// Get quotes from API
async function getQuotes() {
    loading()
    const apiUrl = 'https://type.fit/api/quotes'
    try {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json()
        newQuote()
    } catch (error) {
        // Catch error here
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl, '_blank')
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

// 5th video
getQuotes()
