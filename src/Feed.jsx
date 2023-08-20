import Eachpost from "./Eachpost";

const Feed = ({ posts }) => {
  return (
    <>
        {posts.map(post => (
            <Eachpost
                key={post.id}
                post={post}
            />
        ))}
    </>
  );
};

export default Feed;
