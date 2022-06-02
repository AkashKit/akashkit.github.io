/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useRef } from "react";
function Meme(){
    let url
    const canvas = useRef();
    const image = useRef();
    const textImage = useRef();
    const [count, setCount] = useState(1);
    let timer;
    const canvasImg = image.current;
    const img = image.current;
    // console.log(image.current);
    const [allMeme, setAllMeme] = useState([]) 
    const [meme, setMeme] = useState({
        topText : "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg",
        randomTextImage: "http://i.imgflip.com/1bij.jpg"
    })

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMeme(data.data.memes))
    }, [])
    // console.log(allMeme);
    function RandomImage(event){
        
        var memeArray = allMeme;
        // console.log(count);
        const randomNumber = Math.floor(Math.random() * memeArray.length);
        const old_url = meme['randomImage'];
        if (count == 1) {
            url = 'https://i.imgflip.com/8p0a.jpg';
            setMeme(prevMeme => {
                return {
                    ...prevMeme,
                    randomImage: url,
                    randomTextImage: old_url
                }
            });
        }else {
            url = memeArray[count].url;
            setMeme(prevMeme => {
                return {
                    ...prevMeme,
                    randomImage: url,
                    randomTextImage: old_url
                }
            });
            const ctx = canvas.current.getContext("2d");  
            ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);  
            var imga = img;    
            // console.log(imga);
            var hRatio = canvas.current.width / imga.width    ;
            var vRatio = canvas.current.height / imga.height  ;
            var ratio  = Math.min ( hRatio, vRatio );
            ctx.drawImage(imga, 0,0, imga.width, imga.height, 0,0,imga.width*ratio, imga.height*ratio);
            ctx.font = "40px Courier";
            ctx.fillText(meme.topText, 100, 75) // THIS IS THE PLACE TEXT IS EMBEDDED INTO THE PICTURE
            ctx.fillText(meme.bottomText, 100, 250); 
            // canvasImg.src = url;
        }
        setCount(count + 1);
    }

    function download(){
        var canvas = document.getElementById("canvas");
        var url = canvas.toDataURL("image/png");
        var link = document.createElement('a');
        link.download = 'meme.png';
        link.href = url;
        link.click();
        // debugger;
      }

    function handleChange(event){
        const target = event.target
        const value = target.value
        const name = target.name

        setMeme(prevMeme =>({
            ...prevMeme,
            [name] : value
        }))  
    }

    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const tablerow = ctx => {
        // ctx.drawImage(img, 0, 0);
        ctx.font = "40px Courier";
        ctx.fillText(meme.topText, 100, 75) // THIS IS THE PLACE TEXT IS EMBEDDED INTO THE PICTURE
        ctx.fillText(meme.bottomText, 100, 250); 
    } 

    useEffect(() => {       
        // const canvas = this.refs.canvas;
        const ctx = canvas.current.getContext("2d");      
        const img = textImage.current;
        var hRatio = canvas.current.width / img.width    ;
        var vRatio = canvas.current.height / img.height  ;
        var ratio  = Math.min ( hRatio, vRatio );
        ctx.drawImage(img, 0,0, img.width, img.height, 0,0,img.width*ratio, img.height*ratio);
        tablerow(ctx)
    }, [tablerow]);

    useEffect(() => {
        const timer = setTimeout(() => {
          RandomImage()
        }, 100);
        return () => clearTimeout(timer);
      }, []);

    return(
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input top"
                    value={meme.topText}
                    name="topText"
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input bottom"
                    value={meme.bottomText}
                    name="bottomText"
                    onChange={handleChange}
                />
                <button 
                    className="form--button"
                    onClick={RandomImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                {/* <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2> */}
                <canvas ref={canvas} width={640} height={425} className="meme--image" id="canvas" />
                <img
                ref={image}
                alt="CanvasImage"
                src={meme.randomImage}
                className="hidden meme--image"
                crossOrigin="anonymous" 
                />

                <img
                ref={textImage}
                alt="CanvasTextImage"
                src={meme.randomTextImage}
                className="hidden meme-text-image"
                crossOrigin="anonymous" 
                />
                <button onClick={download}>Download!</button>
            </div> 
            
        </main>
    )
}

export default Meme