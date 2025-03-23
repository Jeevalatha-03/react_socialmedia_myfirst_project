
import Home from "./Home";
import About from "./About";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import {useState,useEffect} from "react";
import Missing from "./Missing";
import Nav from "./Nav";
import Footer from "./Footer";
import Header from "./Header";
import { format } from "date-fns";
import api from "./api/posts"
import useAxiosFetch from "./hooks/useAxiosFetch";
import useWindowSize from "./hooks/useWindowSize";
import { useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import EditPost from "./EditPost";
import {width} from "./hooks/useWindowSize"






function App() {
  const [posts,setPosts]=useState([]);
  const [search,setSearch]=useState('');
  const [searchResults,setSearchResults]=useState([]);
  const [postTitle,setPostTitle]=useState('');
  const [editBody,setEditBody]=useState('');
  const [editTitle,setEditTitle]=useState('');
  const [postBody,setPostBody]=useState('');
  const navigate = useNavigate();
  const {width}=useWindowSize();
  const {data,fetchError,isLoading}=useAxiosFetch("http://localhost:3500/posts")


  useEffect(()=>{
      setPosts(data)}
      ,[data]
    )
    
    
    
      useEffect(() => {
        const filteredResult =posts.filter((post) => 
        ((post.body).toLowerCase()).includes(search.toLowerCase())
        || ((post.title).toLowerCase()).includes(search.toLowerCase()))
    
        setSearchResults(filteredResult.reverse());
      }, [posts,search])
    
      const handleDelete = async (id) => {
        console.log(id)
        try{
          
          await api.delete(`/posts/${id}`)
          
          
          const postsList=posts.filter(post => post.id !==id);
          
          setPosts(postsList);
          navigate('/')
    
        }catch(err){
          
          console.log(err.message)
        }
      }
    
      const handleSubmit= async(e) => {
        e.preventDefault();
          const id = posts.length ? posts[posts.length-1].id+1:1;
          const datetime= format(new Date(), 'MMMM dd ,yyyy pp');
          const newPost ={id,title: postTitle,datetime ,body : postBody };
        try{
          const response=await api.post('/posts',newPost)
          
          
          const allPosts = [...posts , response.data];
          setPosts(allPosts)
          setPostTitle('')
          setPostBody('')
          navigate('/')
        }catch (err) {
            
          console.log(err.message)
        }
      }
    
      const handleEdit= async (id)=>{
        const datetime= format(new Date(), 'MMMM dd ,yyyy pp');
        const updatePost ={id,title: editTitle,datetime ,body : editBody };
        try {
          const response= await api.put(`/posts/${id}` , updatePost)
          setPosts(posts.map(post => post.id===id ? {...response.data} : post))
          setEditTitle('')
          setEditBody('')
          navigate('/')
        } catch (err) {
          console.log(err.message)
        }
    
      }


  return (
    
    <div className="App">
    
          <Header title=" Social Media" width={width} />
          <Nav  search={search} setSearch={setSearch}/>
          <Routes>
            <Route path="/" element={<Home searchResults={searchResults} 
            fetchError={fetchError}
            isLoading={isLoading}/>}/>
            <Route path="post">
              <Route index element={ <NewPost   handleSubmit={handleSubmit} postTitle= {postTitle} setPostTitle={setPostTitle} postBody={postBody} setPostBody={setPostBody}
              />}/>
              <Route path=":id" element={<PostPage posts={posts} handleDelete={handleDelete}/>}/>
            </Route>
            <Route path="/edit/:id" element={<EditPost  posts={posts} editBody={editBody} setEditBody={setEditBody} editTitle={editTitle} setEditTitle={setEditTitle } handleEdit={handleEdit}/>}/>
            <Route path="about" element={<About/>}/>
            <Route path="*" element={<Missing/>}/>
          </Routes>
          <Footer/>
          
      
    </div>
  );
}

export default App;
