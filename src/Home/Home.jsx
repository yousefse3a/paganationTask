import React, { useEffect, useRef, useState } from "react";
let total = 0;
export default function Home() {
  const [Body, setBody] = useState([]);
  const [Page, setPage] = useState(0);
  function changePage(Name, e) {
    if (Name == "frist") {
      if (Page <= 0) {
        return 0;
      }
      setPage(0);
    }
    if (Name == "post") {
      if (Page >= total) {
        return 0;
      }
      setPage(Page + 1);
    }
    if (Name == "pre") {
      if (Page <= 0) {
        return 0;
      }
      setPage(Page - 1);
    }
    if (Name == "last") {
      if (Page == total) {
        return 0;
      }
      setPage(total);
    }
  }
  async function callApi() {
    const api = `https://api.instantwebtools.net/v1/passenger?page=${Page}&size=10`;
    const res = await fetch(api).then((res) => res.json());
    console.log(api);
    total = res.totalPages - 1;
    setBody(res.data);
  }
  useEffect(() => {
    callApi();
  }, [Page]);

  return (
    <div>
      <h1>Pagenation</h1>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>trips</th>
          </tr>
        </thead>
        <tbody>
          {Body.map((e) => {
            return (
              <tr key={e._id}>
                <td>{e.name}</td>
                <td>{e.trips}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button
          disabled={Page == 0 ? true : false}
          className={`frist `}
          onClick={(e) => {
            changePage("frist", e);
          }}
        >
          frist
        </button>
        <button
          disabled={Page == 0 ? true : false}
          className={`pre`}
          onClick={(e) => {
            changePage("pre", e);
          }}
        >
          previous
        </button>
        <button
          disabled={Page == total ? true : false}
          className={`post`}
          onClick={(e) => {
            changePage("post", e);
          }}
        >
          next
        </button>
        <button
          disabled={Page == total ? true : false}
          className={`last`}
          onClick={(e) => {
            changePage("last", e);
          }}
        >
          last
        </button>
      </div>
    </div>
  );
}
