import { Link } from "react-router-dom";
const MissingPage = () => {
    return (
      <main className="PostPage">
          <h2>Page Not Found</h2>
          <p>Sorry, page can't found</p>
          <Link to='/'>Visit our Home</Link>
      </main>
    )
  };
  
  export default MissingPage;