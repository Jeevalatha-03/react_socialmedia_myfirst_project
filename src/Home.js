

import Feed from './Feed'


const Home = ({searchResults ,isLoading,fetchError}) => {
  
  return (
    <main className="Home">
      {isLoading && <p className='statusMsg'>Loading Posts...</p>}
      {!isLoading && fetchError && <p className='statusMsg' style={{color:"red"}}>{fetchError}</p>}
      {!isLoading && !fetchError && 
      (searchResults.length ? 
        <Feed posts={searchResults}/>
       : 
        <p className='statusMsg' style={{ marginTop:"2rem"}}>
          No Posts to display.
        </p>)}
      
    </main>
  )
}

export default Home