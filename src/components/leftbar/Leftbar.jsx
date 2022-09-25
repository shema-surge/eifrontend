import axios from 'axios'
import { useState } from 'react'
import { useEffect, useRef } from 'react'
import Cookies from 'universal-cookie'
import './leftbar.css'

const cookies = new Cookies()

export default function Leftbar() {

    const [tags,setTags] = useState([])

    const shouldLog = useRef(true)

    useEffect(()=>{
        function fetchTags(){

            const token = cookies.get('token')
            axios({
                method:'GET',
                url:'http://localhost:3500/api/tags',
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            }).then((res)=>{
                setTags(res.data.tags)
            }).catch((err)=>{
                console.log(err)
            })
        }

        if(shouldLog.current){
            fetchTags()
            shouldLog.current=false
        }
    },[])


    return (
        <div className="poptagContainter">

            <p className='top'>Popular Tags</p>
            {tags.map((tag)=>(
                <a href="" key={tag._id} className='poptag'>{tag.name}</a>
            ))}
            
        </div>

    )
}