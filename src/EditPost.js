
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'


const EditPost = ({posts,editBody,setEditBody,editTitle,setEditTitle ,handleEdit}) => {

  
  const { id } = useParams()
  const post = posts.find(post => (post.id).toString()===id)
  useEffect(()=>{
    if(post){
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  },[post,setEditBody,setEditTitle])
  return (
    <main className='Newpost'>
      {editTitle &&
      <>
        <h2>edit post</h2>
        <form className='newPostForm' 
        onSubmit={(e)=>e.preventDefault()}> 
        
          <label htmlFor="postTitle">Title:</label>
          <input
            id='postTitle' 
            type="text"
            required
            value={editTitle}
            onChange={(e) => 
              setEditTitle(e.target.value)
            } 
          />

          <label htmlFor="postBody">Post:</label>
          <textarea
            id='postBody' 
            required
            value={editBody}
            onChange={(e) => 
              setEditBody(e.target.value)
            } 
          />

          <button type='submit' onClick={()=>handleEdit(post.id)}>submit</button>
        </form>
      </>
}

{!editTitle &&
  <>
    <h2>post not found</h2>
    <p>well, that's disappointing</p>
    <p>
      <Link to='/'>visit our homepage</Link>
    </p>
  </>}



    </main>
  )
}

export default EditPost