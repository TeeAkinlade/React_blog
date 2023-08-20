import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";

const EditPost = ({
    handleEdit, posts, editBody, setEditBody, editTitle, setEditTitle
}) => {
    const {id} = useParams()
    const post = posts.find(post => (post.id).toString() === id)

    useEffect(() =>{
        if(post){
            setEditTitle(post.title)
            setEditBody(post.body)
        }
    }, [post, setEditTitle, setEditBody])

  return(
    <main className="NewPost">
        {editTitle &&
            <>
                <h1>Edit Post</h1>
                <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="postTile"> Title:</label>
                    <input
                        type="text"
                        id="postTitle"
                        required
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)} 
                    />
                    <label htmlFor="postBody"> Post:</label>
                    <textarea 
                        id="postBody"
                        required
                        value={editBody}
                        onChange={(e) => setEditBody(e.target.value)}>
                    </textarea>
                    <button type="submit" onClick={()=> handleEdit(post.id)}> Submit post</button>
                </form>
            </>
        }
        {!editTitle &&
            <main className="PostPage">
                <h2>Page Not Found</h2>
                <p>Sorry, page can't found</p>
                <Link to='/'>Visit our Home</Link>
            </main>
        }   
      </main>

  )
};

export default EditPost;
