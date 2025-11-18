/** @format */

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

function Home() {
  const [posts, setPosts] = useState([]);
  const currentUser = useSelector((state) => state.currentUser);
  const userdiv = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser) navigate("/sign-in");

    fetch("http://localhost:8000/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, [currentUser]);

  const handleLogOut = () => {
    dispatch({ type: "logout_user" });
  };

  const handleUserInfosShow = () => {
    userdiv.current.style.display =
      userdiv.current.style.display === "none" ? "block" : "none";
  };
  const handleUserInfosHide = () => {
    userdiv.current.style.display = "none";
  };

  return (
    <div>
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

        <div className="user">
          <img
            src="user.png"
            alt="user image"
            onClick={handleUserInfosShow}
            // onMouseLeave={handleUserInfosHide}
          />
          <div className="user_infos" ref={userdiv}>
            <p>{currentUser?.display_name}</p>
            <div className="actions">
              <button>Post</button>
              <button onClick={handleLogOut}>Log-out</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Feed */}
      <main onClick={handleUserInfosHide}>
        <div className="posts">
          {posts.map((p) => {
            return (
              <article className="post" key={p.Pid}>
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
    </div>
  );
}

export default Home;
