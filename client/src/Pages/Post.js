import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

function Post() {
  let { id } = useParams();
  // let navigate = useNavigate();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [cmtDelete, setCmtDelete] = useState({});

  useEffect(() => {
    // let abortController;
    // (async () {
    //   abortController = new AbortController();
    // })

    axios.get(`http://localhost:3001/posts/${id}`).then((response) => {
      console.log("POST:", response.data);
      setPostObject(response.data);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      console.log("COMMENT:", response.data);
      console.log("Get comment id:",response.data[0].comment_id);
      setComments(response.data);
    });
  }, [id]);

  const addComment = () => {
    axios.post("http://localhost:3001/comments", {
        commentofpost: newComment,
        post_id: id,
      })
      .then((response) => {
        const commentToAdd = { commentofpost: newComment };
        setComments([...comments, commentToAdd]);
        setNewComment("");
        console.log("Comment id when add:",comments[0].comment_id);
        console.log("New COMMENT added!!!");
      });
  };

  const deleteComment = () => {
    axios.delete(`http://localhost:3001/comments/${comments[0].comment_id}`).then((response) => {
      console.log("DELETE1:", response.data);
      console.log("DELETE2:", comments[0].comment_id);
      // console.log("DELETE ID:", response.data.comment_id);
      setCmtDelete(response.data);
      // navigate(`/${id}`);
    });
  }
  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title"> {postObject.title}</div>
          <div className="body">{postObject.comment}</div>
          <div className="footer">{postObject.mail}</div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comment..."
            autoComplete="off"
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <button onClick={addComment}> Add Comment</button>
          <div className="delOfDel">
                <button className="delete" onClick={deleteComment} value={cmtDelete}> Delete Latest</button>
                </div>
        </div>
        <div className="listOfComments">
          {comments.map((comment, i) => {
            return (
              <div key={i} className="comment">
                <div className="cmtOfCmt">{comment.commentofpost}</div>
                {/* <div className="delOfDel">
                <button className="delete" onClick={deleteComment} value={cmtDelete}> X {comments[0].comment_id}</button>
                </div> */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;
