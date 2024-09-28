let articles = []; // To store fetched articles
let currentIndex = 0; // To track which article is currently displayed

document.getElementById("fetchNewsBtn").addEventListener("click", fetchNews);

function fetchNews() {
  // If no articles have been fetched yet, fetch them from the API
  if (articles.length === 0) {
    const apiKey = 'be9e7913abb549bab7e92604ab1dfe19';
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        articles = data.articles; // Store the fetched articles
        displayArticle(); // Display the first article
      })
      .catch(error => {
        console.error("Error fetching news:", error);
        document.getElementById("newsContainer").innerHTML = "<p>Failed to load news.</p>";
      });
  } else {
    displayArticle(); // If articles are already fetched, just display the next one
  }
}

function displayArticle() {
  const newsContainer = document.getElementById("newsContainer");
  newsContainer.innerHTML = ''; // Clear previous article

  if (articles.length > 0) {
    // Get the current article
    const article = articles[currentIndex];
    
    const newsArticle = document.createElement('div');
    newsArticle.classList.add('news-article');
    
    newsArticle.innerHTML = `
      <h2>${article.title}</h2>
      <p>${article.description || "No description available"}</p>
      <a href="${article.url}" target="_blank">Read more</a>
    `;
    
    newsContainer.appendChild(newsArticle);

    // Update index to show the next article on the next click
    currentIndex = (currentIndex + 1) % articles.length;
  } else {
    newsContainer.innerHTML = "<p>No articles available.</p>";
  }
}
