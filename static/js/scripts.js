document.getElementById('chat-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const query = document.getElementById('query').value;
    
    fetch('/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'query': query
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').textContent = data.response;
    })
    .catch(error => console.error('Error:', error));
});
$(document).ready(function() {
    // Fetch stock data and render chart
    function fetchStockData() {
        $.ajax({
            url: 'https://api.example.com/stock',  // Replace with your stock data API
            method: 'GET',
            success: function(data) {
                renderStockChart(data);
            },
            error: function(error) {
                console.log('Error fetching stock data:', error);
            }
        });
    }

    function renderStockChart(data) {
        const ctx = document.getElementById('stockChart').getContext('2d');
        const stockChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,  // X-axis labels
                datasets: [{
                    label: 'Stock Price',
                    data: data.prices,  // Y-axis data
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Price'
                        }
                    }
                }
            }
        });
    }

    // Fetch investment advice
    function fetchInvestmentAdvice() {
        $.ajax({
            url: 'https://api.example.com/investment-advice',  // Replace with your investment advice API
            method: 'GET',
            success: function(data) {
                $('#investmentAdvice').text(data.advice);
            },
            error: function(error) {
                console.log('Error fetching investment advice:', error);
            }
        });
    }

    // Fetch top news headlines
    function fetchNewsHeadlines() {
        $.ajax({
            url: 'https://newsapi.org/v2/top-headlines?category=business&apiKey=your-news-api-key',  // Replace with your NewsAPI key
            method: 'GET',
            success: function(data) {
                renderNewsHeadlines(data.articles);
            },
            error: function(error) {
                console.log('Error fetching news headlines:', error);
            }
        });
    }

    function renderNewsHeadlines(articles) {
        const newsList = $('#newsHeadlines');
        newsList.empty();
        articles.forEach(article => {
            const newsItem = `<li class="list-group-item"><a href="${article.url}" target="_blank">${article.title}</a></li>`;
            newsList.append(newsItem);
        });
    }

    // Initialize data fetch
    fetchStockData();
    fetchInvestmentAdvice();
    fetchNewsHeadlines();
});
