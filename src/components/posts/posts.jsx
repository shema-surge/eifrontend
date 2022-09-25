
import { useEffect, useRef, useState } from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'

import './posts.css'
import SmallPost from '../smallpost/SmallPost'

const cookies = new Cookies()

export default function Posts() {
    const [posts, setPosts] = useState([])

    console.log(posts)

    const shouldLog = useRef(true)

    useEffect(() => {

        async function fetchPosts() {
            const token = cookies.get('token')
            const res = await axios({
                method: 'GET',
                url: 'http://localhost:3500/api/posts',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setPosts(res.data.posts)
        }

        if(shouldLog.current){
            console.log('hello')
            shouldLog.current = false
            fetchPosts()
        }

    }, [])

    return (
        <ul className="posts">
            {posts.map((post)=>(
                <SmallPost key={post._id} post={post}/>
            ))}
        </ul>
    )
}