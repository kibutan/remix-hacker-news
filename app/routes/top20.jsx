import { useLoaderData, Link, Outlet } from "@remix-run/react";
import { getItem, getTopStories } from "~/utils/hackernews.server";

import styleUrl from "~/style/top20.css";

// (5)
export const links = () => {
  return [{ rel: "stylesheet", href: styleUrl }];
};

// (1)
export const loader = async () => {
  const top500Ids = await getTopStories();
  const top20Ids = top500Ids.slice(0, 20);
  const top20 = await Promise.all(top20Ids.map((id) => getItem(id)));
  const top20Summary = top20.map((item) => ({
    id: item.id,
    title: item.title,
  }));
  return top20Summary;
};

function Top20Route() {
  // (2)
  const data = useLoaderData();

  return (
    <div>
      <header>
        <h1>Hacker News Viewer</h1>
      </header>
      <div id="container">
        <div id="sidebar">
          <h2>Top 20</h2>
          <nav>
            <ul>
              {data.map((item) => (
                <li key={item.id}>
                  {/* (3) */}
                  <Link to={`/top20/${item.id}`}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <main>
          {/* (4) */}
          <div>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Top20Route;
