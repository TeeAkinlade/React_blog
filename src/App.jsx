import Header from './Header'
import Nav from './Nav'
import Home from './Home'
import NewPost from './NewPost'
import Post from './Post'
import EditPost from './EditPost'
import MissingPage from './MissingPage'
import About from './About'
import Footer from './Footer'
import { format } from 'date-fns'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import api from './api/posts'
import useWindowSize from './hooks/useWindowSize'
import useAxiosFetch from './hooks/useAxiosFetch'

function App() {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult]=  useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const {width} = useWindowSize;
  const {data, fetchError, isLoading} = useAxiosFetch('http://localhost:3600/posts');

  useEffect(() =>{
    setPosts(data)
  }, [data])

  useEffect(() => {
    const filterData = posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()))
    setSearchResult(filterData.reverse())
  }, [posts, search]);

    const handleEdit = async (id) =>{
      const postDate = format(new Date(), 'MMMM dd, yyyy pp');
      const newPost = {id, title: editTitle, date: postDate, body: editBody};
      try{
        const response = await api.put(`/posts/${id}`, newPost)
        const allPost = posts.map(post => post.id === id ? {...response.data} : post )
        setPosts(allPost);
        setEditTitle('');
        setEditBody('');
        navigate('/');
      } catch (err){
        if(err.response){
          console.log(err.ressponse.status)
          console.log(err.ressponse.header)
          console.log(err.ressponse.data)
        } else {
          console.log(`Error: ${err.message}`)
        }
      }
    }

  const handleDelete = async (id) =>{
    try{
      await api.delete(`/posts/${id}`)
      const result = posts.filter(post => post.id !==id)
      setPosts(result)
      navigate('/');
    } catch (err){
      console.log(`Error: ${err.message}`)
    }
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const postDate = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = {id, title: postTitle, postDate, body: postBody};
    try{
      const response = await api.post('/posts', newPost)
      const allPost = [...posts, response.data];
      setPosts(allPost);
      setPostTitle('');
      setPostBody('');
      navigate('/');
    } catch (err){
      console.log(`Error: ${err.message}`)
    }
  }

  return (
      <div className="App">
        <Header title={"Blue-Blog"} width={width} />
        <Nav  
          search={search}
          setSearch={setSearch}
        />
        <Routes>
          <Route exact path="/" element={
            <Home
            posts={searchResult}
            fetchError={fetchError}
            isLoading={isLoading}
            />} 
          />
          <Route exact path="/post" element={
            <NewPost 
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
              handleSubmit={handleSubmit}
            />} 
          />
          <Route path="/edit/:id" element={
            <EditPost 
              posts={posts}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editBody={editBody}
              setEditBody={setEditBody}
              handleEdit={handleEdit}
            />} 
          />
          <Route path="/post/:id" element={
            <Post
            posts={posts}
            handleDelete={handleDelete}
            />} 
          />
          <Route path="/about" Component={About} />
          <Route path="*" Component={MissingPage} />
        </Routes>
        <Footer />
      </div>
  )
}

export default App
