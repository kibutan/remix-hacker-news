import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { getItem } from "~/utils/hackerNews.server";
import stylesUrl from "~/style/article.css";

export const links = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

// (1)
export const loader = async ({ params }) => {
  // (2)
  const { id } = params;

  // (3)
  const item = await getItem(id);

  const kidsItems = await Promise.all(
    item.kids.map((kidsItemId) => getItem(kidsItemId))
  );
  // (4)
  return json({ item, kids: kidsItems });
};

export default function Top20IdRoute() {
  //  (5)
  const loaderData = useLoaderData();
  const item = loaderData.item;
  const kids = loaderData.kids;

  return (
    <article>
      <h1>{item.title}</h1>
      {/* (6 )*/}
      <p>
        by {item.by} on {new Date(item.time * 1000).toLocaleString()}
      </p>
      <p>
        <a href="{item.url}">{item.url}</a>
      </p>
      <h2>Comments</h2>
      {kids.map((kidsItem) => (
        <div key={kidsItem.id}>
          <h3>by: {kidsItem.by}</h3>
          <p>{kidsItem.text}</p>
          <p>{new Date(kidsItem.time * 1000).toLocaleString()}</p>
        </div>
      ))}
    </article>
  );
}
