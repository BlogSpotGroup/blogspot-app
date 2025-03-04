import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import Loader from "../components/Loader";


const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const getAuthors = async () => {
      setIsLoading(true);
      try {
           const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users`)
           setAuthors(response.data)
      } catch (error) {
        console.log(error)
      }
       // Delay hiding the loader for 2 seconds (2000ms)
    setTimeout(() => {
      setIsLoading(false);
    }, 2000)
      }

      getAuthors();
    }, [])

    if(isLoading){
      return <Loader/>
    }

  return (
    <section className="authors">
      {authors.length > 0 ? (
        <div className="container authors__container">
          {authors.map(({_id: id, avatar, name, posts }) => (
            <Link key={id} to={`/posts/users/${id}`} className="author">
                <div className= "author__avatar">
              <img src={`${import.meta.env.VITE_ASSETS_URL}/uploads/${avatar}`} alt={`Image of ${name}`} />
              </div>
              <div className="author__info">
              <h4>{name}</h4>
              <p>{posts} {posts === 1 ? "post" : "posts"}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <h2 className="center">No users/authors found.</h2>
      )}
    </section>
  );
};

export default Authors;
