import React from "react";
import { Link } from "react-router-dom";

const Eachpost = ({ post }) => {
  return (
        <article className="post">
            <Link to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
                <p className="postDate">{post.date}</p>
                <p className="postBody">{
                    (post.body).length <= 25 ? post.body : `${(post.body).slice(0, 25)}...`
                }</p>

            </Link>
        </article>
  )
};

export default Eachpost;
