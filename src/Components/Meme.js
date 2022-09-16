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
            url = memeArray[randomNumber].url;
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
        var trimmedCanvas = trimCanvas(canvas);
        var url = trimmedCanvas.toDataURL();
        var link = document.createElement('a');
        link.download = 'meme.png';
        link.href = url;
        link.click();
    }

    function trimCanvas(c) {
        var ctx = c.getContext('2d'),
            copy = document.createElement('canvas').getContext('2d'),
            pixels = ctx.getImageData(0, 0, c.width, c.height),
            l = pixels.data.length,
            i,
            bound = {
                top: null,
                left: null,
                right: null,
                bottom: null
            },
            x, y;
        
        // Iterate over every pixel to find the highest
        // and where it ends on every axis ()
        for (i = 0; i < l; i += 4) {
            if (pixels.data[i + 3] !== 0) {
                x = (i / 4) % c.width;
                y = ~~((i / 4) / c.width);
    
                if (bound.top === null) {
                    bound.top = y;
                }
    
                if (bound.left === null) {
                    bound.left = x;
                } else if (x < bound.left) {
                    bound.left = x;
                }
    
                if (bound.right === null) {
                    bound.right = x;
                } else if (bound.right < x) {
                    bound.right = x;
                }
    
                if (bound.bottom === null) {
                    bound.bottom = y;
                } else if (bound.bottom < y) {
                    bound.bottom = y;
                }
            }
        }
        
        // Calculate the height and width of the content
        var trimHeight = bound.bottom - bound.top,
            trimWidth = bound.right - bound.left,
            trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight);
    
        copy.canvas.width = trimWidth;
        copy.canvas.height = trimHeight;
        copy.putImageData(trimmed, 0, 0);
    
        // Return trimmed canvas
        return copy.canvas;
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