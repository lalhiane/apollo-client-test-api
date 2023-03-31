import { useQuery, gql } from "@apollo/client";

import { useState } from "react";

function App() {

  const [page, setPage] = useState(1);

  const PreviousPage = () => {

    setPage(page - 1);

  }

  const NextPage = () => {

    setPage(page + 1);

  }

  const AnimeList = gql`
 
  query Query {

    Page {

      media {

        id

        siteUrl

        title {

          english

          native

        }

        description

        coverImage {

          medium

        }

        bannerImage

        volumes

        episodes

      }

    }

  }`;

  const { loading, error, data } = useQuery(AnimeList);

  if (loading) return <>Loading...</>

  if (error) return <>{ JSON.stringify(error) }</>
  
  return (<>
    
    { console.log(data) }
    
    <div className="animes">{
    
      data.Page.media.map(anime => (

        <div key={anime.id}>

          <img src={anime.coverImage.medium} alt={anime.title.english} />

          <h2>Anime Title: {anime.title.english}</h2>
          
          <h4>Episods: {anime.episodes}</h4>
          
          <p>{anime.description}</p>

          <hr />

        </div>

      ))

    }</div>
    
    <div className="buttonContainer">
        
      {page != 1 && <button onClick={PreviousPage}>Previous Page</button>}
        
      <div className="pageText"> {page}</div>
        
      <button onClick={NextPage}>Next Page</button>
        
    </div>
  
  </>);


}

export default App
