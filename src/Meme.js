import React from "react";
// import memesData from "./memesData";

export default function Meme() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "https://i.imgflip.com/1ur9b0.jpg",
  });

  const [allMemeImages, setAllMemeImages] = React.useState([]);

   React.useEffect(()=>{
    
     async function getMemes(){
        const res = await fetch("https://api.imgflip.com/get_memes")
        const data = await res.json()
        setAllMemeImages(data.data.memes)
     }
    
     getMemes()
     
   },[])

  function getMemeImage() {
    
    const randomNumber = Math.floor(Math.random() * allMemeImages.length);
    const url = allMemeImages[randomNumber].url
    // console.log(url);
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <main>
      <form className="form">
        <input
          type="text"
          placeholder="top-text"
          className="form--input"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />

        <input 
        type="text" 
        placeholder="bottom-text" 
        className="form--input"
        name="bottomText"
        value={meme.bottomText}
        onChange={handleChange} />

        <button type="button" className="form--button" onClick={getMemeImage}>
          click here to get new image '&#128444;'
        </button>
        <img src={meme.randomImage} className="meme--Image" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </form>
    </main>
  );
}
