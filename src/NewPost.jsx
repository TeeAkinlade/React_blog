const NewPost = ({
     postTitle, setPostTitle, postBody, setPostBody, handleSubmit
    }) => {
    return (
      <main className="NewPost">
          <h1>New Post</h1>
          <form className="newPostForm" onSubmit={handleSubmit}>
            <label htmlFor="postTile"> Title:</label>
            <input
                type="text"
                id="postTitle"
                required
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)} 
            />
            <label htmlFor="postBody"> Post:</label>
            <textarea 
                id="postBody"
                required
                value={postBody}
                onChange={(e) => setPostBody(e.target.value)}>
            </textarea>
            <button type="submit"> Submit post</button>
          </form>
      </main>
    )
  };
  
  export default NewPost;