import './writepost.css'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';


import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import {BsXLg,BsPlusSquareFill} from 'react-icons/bs'
import logoUrl from '../../assets/logo.jpeg'

import { initializeApp } from 'firebase/app'
import { deleteObject, getDownloadURL, getStorage, ref ,uploadBytes} from "firebase/storage";
import axios from 'axios';


const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
}


const firebaseConfig = {
  apiKey: "AIzaSyD9f6yI2f1M1EpkFQjNZLHUyLLwVm5MRks",
  authDomain: "moonshot-3ed94.firebaseapp.com",
  projectId: "moonshot-3ed94",
  storageBucket: "moonshot-3ed94.appspot.com",
  messagingSenderId: "633706716666",
  appId: "1:633706716666:web:d988c2e18f715506db9843",
  measurementId: "G-4VB90H5MTZ"
};

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)


export default function WritePost(){

    const [displayImg,setDisplayImg] = useState('none')
    const [displayBtn,setDisplayBtn] = useState('inline-block')
    const [imageUrl,setImageUrl] = useState('')
    const [img,setImg] = useState('')
    const [title,setTitle] = useState('')
    const [tagInput,setTagInput] = useState('')
    const [list,setList] = useState([])
    const [body,setBody] = useState('')

    async function uploadFile(imageName,file){
      const imgRef = ref(storage,`CoverImages/${imageName}`)
      await uploadBytes(imgRef,file)
      setImageUrl(await getDownloadURL(imgRef))
    }

    function handleUpload(e){
      let image = nanoid()
      uploadFile(image,e.target.files[0])
      setImg(image)
      setDisplayImg('flex')
      setDisplayBtn('none')
    }

    async function deleteFile(imageName){
      deleteObject(ref(storage,`CoverImages/${imageName}`)).then(()=>{
        console.log('Image deleted')
      }).catch((err)=>{
        console.error(err)
      })
    }

    function replaceUpload(e){
      let newImage = nanoid()
      uploadFile(newImage,e.target.files[0])
      deleteFile(img)
      setImg(newImage)
    }

    function handleRemoveImg(){
      deleteFile(img)
      setDisplayImg('none')
      setDisplayBtn('inline-block')
    }

    function handleTitle(e){
      setTitle(e.target.value)
    }

    function handleTagInput(e){
      setTagInput(e.target.value)
    }

    function handleAddTag(){
      if(list.length>=4 || list.includes("#"+tagInput) || tagInput.includes(' ') || tagInput==='') return
      setList(list.concat("#"+tagInput))
    }

    function handleClose(tag){
      setList(list.filter(t=>t!==tag))
    }

    useEffect(()=>{
      console.log(list)
    },[list])

    function submitPost(){

      const token = cookies.get('token')

      console.log(token)

      const postConfig = {
        method:'POST',
        url:'http://localhost:3500/api/posts',
        data:{
          title:title,
          coverImg:imageUrl,
          tags:list,
          body:body
        },
        headers:{
          'Authorization':`Bearer ${token}`
        }
      }


      axios(postConfig).then(res=>{
        console.log('Post submitted')
        console.log(res)
      }).then(err=>{
        console.log(err)
      })
      
    }

    return(
        <>
            <div className="topbar">
                <div className="titleContainer">
                    <img src={logoUrl} alt="" className="logo" />
                    <span className="title">Create Post</span>
                </div>
                <div className="closeContainer">
                    <BsXLg className='closeIcon'/>
                </div>
            </div>

            <div className="postContainer">
              <div className="post">
                
              <div className="coverImgContainer" style={{display:displayImg}}>
                <img src={imageUrl} alt="" className="coverImg" />
                <div className="coverImgButtons">
                    <input type="file" id="replaceCoverImg" onChange={replaceUpload} hidden/>
                    <label htmlFor="replaceCoverImg" className="changeCoverImg">Change</label>
                    <label className="removeCoverImg" onClick={handleRemoveImg}>Remove</label>
                </div> 
              </div>

              <div className="addCoverImgContainer">
              <input type="file"  id="addCoverImg" onChange={handleUpload} hidden/>
              <label htmlFor="addCoverImg" className="addCoverImg" style={{display:displayBtn}}>Add a cover image</label>
              </div>
              
              <div className="titleInputContainer">
                <input type="text" placeholder="New post title here..." name="" id="" className="titleInput" onChange={handleTitle}/>
              </div>


              <div className="tagContainer">
                <ul className="tags">

                  {list.map(tag=>(
                      <li key={nanoid(5)} className="tag">
                        <div className="tagContent">
                            <span className="tagName">{tag}</span>
                            <BsXLg className='removeTag' onClick={()=>handleClose(tag)}/>
                        </div>
                      </li>
                  ))}

                </ul>
                <div className="addTagContainer">
                  <input type="text" placeholder='Add up to 4 tags...' className="tagInput" onChange={handleTagInput}/>
                  <label htmlFor='tagInput' onClick={handleAddTag}><BsPlusSquareFill className='addTag'/></label>
                </div>

              </div>
            <ReactQuill className='quillEditor' modules={modules} theme='snow' onChange={setBody}/>
              </div>
            <div className="saveContainer">
                <button className="publish">Publish</button>
                <button className="saveDraft" onClick={submitPost}>Save draft</button>
            </div>
            </div>
        </>
    )
}