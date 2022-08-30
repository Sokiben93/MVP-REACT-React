import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  // const handleClick = () => {
  //   navigate()
  // }

  return (
    <div>
    <h1> Welcome To FACEBUGBLOG!!!</h1>
      {listOfPosts.map((value, i) => {
        return (
          <div key={i} className="post" onClick={() => {navigate(`/post/${value.post_id}`)}}>
            <div className="title"> {value.title} </div>
            <div className="body">{value.comment}</div>
            <div className="footer">{value.mail}</div>
            {/* <button className="footer"> Delete </button> */}
          </div>
        );
      })}
    </div>
  );
}

export default Home;