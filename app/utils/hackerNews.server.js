export async function getTopStories() {
  return fetch("https://hacker-news.firebaseio.com/v0/topstories.json").then(
    (res) => res.json()
  );
}

export async function getItem(id) {
  return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
    (res) => res.json()
  );
}
