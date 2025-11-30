/** @format */

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";

function Home() {
  const [reload, setReload] = useState(0);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [postImage, setPostImage] = useState(null);
  const currentUser = useSelector((state) => state.currentUser);
  const userdiv = useRef(null);
  const newPostDiv = useRef(null);
  const newPostFormDiv = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser) navigate("/sign-in");

    fetch("http://localhost:8000/posts?_sort=Pid&_order=desc")
      .then((res) => res.json())
      .then((data) => setPosts(data.reverse()));
  }, [currentUser, reload]);

  const likePost = (post) => {
    post.likesCount++;
    fetch(`http://localhost:8000/posts/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(post),
    }).then((res) => {
      if (res.ok) setReload(reload + 1);
    });
  };

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

  const handleFileChange = (e) => {
    console.log(e.target.files);
    if (e.target.files && e.target.files[0]) {
      setPostImage(e.target.files[0]);
    }
  };

  const handlePostWindowHide = () => {
    newPostFormDiv.current.style.display = "none";
    newPostDiv.current.style.display = "none";
  };

  const handlePostWindowShow = () => {
    newPostFormDiv.current.style.display = "flex";
    newPostDiv.current.style.display = "flex";
    userdiv.current.style.display = "none";
  };

  const addPost = async (e) => {
    e.preventDefault();

    if (!newPost) {
      alert("You should type something ...");
      return;
    }

    if (postImage?.size >= 36700160) {
      alert("The image size is too big, maximale size allowed is 35.0 Mb ...");
      return;
    }

    const formData = new FormData();
    formData.append("image", postImage);
    let name = null;

    if (postImage) {
      try {
        await fetch(
          `https://api.imgbb.com/1/upload?key=d002c89967bf0505f638b1c53346306e`,
          {
            method: "POST",
            body: formData,
          }
        )
          .then((response) => {
            if (response.ok) {
              alert("Image uploaded successfully!,");
              setPostImage(null);
              return response.json();
            } else {
              alert("Image upload failed.");
            }
          })
          .then((data) => {
            name = data.data.display_url;
          });
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("An error occurred during image upload.");
      }
    }

    await fetch("http://localhost:8000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Pid: Date.now(),
        Uid: currentUser.Uid,
        user_name: currentUser.display_name,
        body: newPost,
        likesCount: 0,
        imgUrl: name ? name : "",
      }),
    }).then((res) => {
      if (res.ok) {
        setNewPost("");
        newPostDiv.current.style.display = "none";
        newPostFormDiv.current.style.display = "none";
        e.target[0].value = "";
        e.target[1].value = "";
        setReload(reload + 1);
      }
    });
  };

  return (
    <div>
      {/* NavBar */}
      <nav>
        <Link to="/">
          <h2>Socialize</h2>
        </Link>
        <ul>
          <li>
            <Link to="/">Feed</Link>
          </li>
          <li>
            <Link to="">Users</Link>
          </li>
          <li>
            <Link to="">images</Link>
          </li>
        </ul>

        <div className="user">
          <img src="user.png" alt="user image" onClick={handleUserInfosShow} />
          <div className="user_infos" ref={userdiv}>
            <p>{currentUser?.display_name}</p>
            <div className="actions">
              <button onClick={handlePostWindowShow}>Post</button>
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
                  <h3>{p.user_name}</h3>
                  <p>{p.body}</p>
                </div>
                {p.imgUrl && <img src={`${p.imgUrl}`} alt="" />}

                <div className="actions">
                  <button onClick={() => likePost(p)}>
                    Likes {`{${p.likesCount}}`}
                  </button>
                </div>

                {/* <div className="counts">
                  <p>Likes {p.likesCount}</p>
                  {/* <button>Comment</button>
                   <span>|</span>
                  <p>Comments 0</p>
                </div> */}
              </article>
            );
          })}
        </div>
        {/* Add Post Form */}
        <div
          className="new_post"
          ref={newPostDiv}
          onClick={handlePostWindowHide}
        ></div>
        <form className="new_post_form" ref={newPostFormDiv} onSubmit={addPost}>
          <label htmlFor="body">What are your thoughts ?</label>
          <input
            type="text"
            name="body"
            placeholder="share them with us ..."
            onChange={(e) => setNewPost(e.target.value.trim())}
          />
          <label htmlFor="img">have an image ?</label>
          <input
            type="file"
            name="img"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
          />
          <button type="submit">Post now</button>
        </form>
      </main>
    </div>
  );
}

export default Home;
