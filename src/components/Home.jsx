/** @format */

import React, { useEffect, useState } from "react";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <>
      {/* NavBar */}
      <nav>
        <a href="/">
          <h2>Socialize</h2>
        </a>
        <ul>
          <li>
            <a href="/">Feed</a>
          </li>
          <li>
            <a href="">Users</a>
          </li>
          <li>
            <a href="">images</a>
          </li>
        </ul>
        <button>Post</button>
      </nav>

      {/* Feed */}
      <main>
        <div className="posts">
          {posts.map((p) => {
            return (
              <article className="post">
                <div className="infos">
                  <h3>user name</h3>
                  <p>{p.body}</p>
                </div>
                <img src={p.imgUrl} alt="" />
                <div className="counts">
                  <p>Likes {p.likesCount}</p>
                  <span>|</span>
                  <p>Comments 0</p>
                </div>
                <div className="actions">
                  <button>Like</button>
                  <button>Comment</button>
                </div>
              </article>
            );
          })}
        </div>
      </main>
    </>
  );
}

export default Home;
