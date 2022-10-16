import Airtable, { Record } from "airtable";

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: "keyL2jAWRn8O70hk6",
});

const base = Airtable.base("appMyaPJhJZWTZRHg");

import React from "react";

type Author = {
  /** "usrmp2gyOMsb85wOT" */
  id: string;
  /** "evanjbacon@gmail.com" */
  email: string;
  /** "Evan Bacon" */
  name: string;
};
export type Post = {
  title: string;
  body: string;
  author: Author;
  tags: string[];

  thumbnail: string;

  created: string;

  slug: string;
  // slug: string;
};

function uniqueBy<T>(arr: T[], key: keyof T): T[] {
  return arr.filter((v, i, a) => a.findIndex((t) => t[key] === v[key]) === i);
}

export function usePosts() {
  const [posts, setPosts] = React.useState<Record<Post>[]>([]);

  const isMounted = React.useRef(true);

  React.useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  React.useEffect(() => {
    base("Posts")
      .select({
        view: "Grid view",
      })
      .eachPage(
        function page(records, fetchNextPage) {
          if (isMounted.current) {
            setPosts((posts) => uniqueBy([...posts, ...records], "id"));
            fetchNextPage();
          }
        },
        function done(err) {
          if (err) {
            throw err;
          }
        }
      );
  }, []);

  return posts;
}

export async function getPosts() {
  return new Promise((res, rej) => {
    const query = base("Posts").select({
      // Selecting the first 3 records in Grid view:
      maxRecords: 25,
      view: "Grid view",
    });

    query.eachPage(
      function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        res(records);
        // records.forEach(function(record) {
        //     console.log('Retrieved', record.get('Title'));
        // });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        // fetchNextPage();
      },
      function done(err) {
        if (err) {
          rej(err);
        }
      }
    );
  });
}
