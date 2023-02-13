const div = document.getElementById("title");
const loading = document.getElementById("loading");
const renderHtml = (articles) => {
  articles.forEach((el) => {
    const title = document.createElement("h1");
    title.innerText = el.author;
    div.appendChild(title);
  });
};
const clearArticles = () => {
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
};
const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  clearArticles();
  const apiKey = "e9b42b817f034ce8930a83883566d9db";
  const getSearch = document.getElementById("search");
  const hasil = getSearch.value;
  const url = `https://newsapi.org/v2/everything?language=en&pageSize=10&q=${hasil}&sortBy=publishedAt&apiKey=${apiKey}`;
  loading.setAttribute("class", "loading");
  getNews(url)
    .then((articles) => {
      loading.setAttribute("class", "");
      renderHtml(articles);
    })
    .catch((error) => {
      console.error(error);
    });
});
const getNews = (url) => {
  const data = new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("api nya error");
      })
      .then((data) => {
        const news = data;
        if (news.status === "ok") {
          resolve(news.articles);
        } else {
          reject(news.message);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
  return data;
};
