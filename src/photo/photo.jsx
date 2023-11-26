import React, { useRef, useState } from 'react'

export default function Photos() {
    const fileRef = useRef(null)

    const [images, setImages] = useState([]);

    const fileToDataUrl = file => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();

            fileReader.addEventListener('load', evt => {
                resolve(evt.currentTarget.result);
            });

            fileReader.addEventListener('error', evt => {
                reject(new Error(evt.currentTarget.error));
            });

            fileReader.readAsDataURL(file);
        });
    }

    const handlerClick = async () => {
        const files = [...fileRef.current.files]
        const urls = await Promise.all(files.map(o => fileToDataUrl(o)));
        urls.forEach((el, index) => files[index].src = el)
        console.log(files)
        setImages([...images, ...files])
    }

    const handlerRemoveClick = (image) => {
        images.splice(images.indexOf(image), 1);
        setImages([...images])
    }

    return (
        <div className='container'>
            <div className='select-photo'>Click To Celect</div>
            <label className='z-index' >
                <input type="file" accept="image/*" multiple ref={fileRef} onChange={handlerClick} />
            </label>
            <div className='image-list'>
                {
                    images.map((el, index) => <Photo item={el} key={index} remove={handlerRemoveClick} />)
                }
            </div>
        </div>
    )
}

function Photo({ item, remove }) {

    return (
        <div className='image'>
            <div className='image-container'>
                <img src={item.src} alt={item.name} />
            </div>

            <button className='remove' onClick={() => remove(item)}>X</button>
        </div>
    )
}


