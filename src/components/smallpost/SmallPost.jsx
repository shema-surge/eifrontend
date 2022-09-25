import dayjs from 'dayjs'

import './smallpost.css'
import imgUrl from '../../assets/Screenshot.png'
import avatar from '../../assets/logo.jpeg'
import { AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai'

export default function SmallPost(props) {
    return (<div className="smallPost">
        <a href=""><img src={props.post.coverImg} alt="" className="cover" /></a>
        <div className="profile">
            <a href=""><img src={avatar} alt="" className="accountImg" /></a>
            <div className="postDetails">
                <a href="" className='accountName'>{props.post.author.name}</a>
                <a href="" className='postDate'>{dayjs(props.post.date).format('MMM DD')}</a>
            </div>
        </div>
        <a href="" className="postTitle">{props.post.title}</a>
        <ul className="postTags">
            {props.post.tags.map((tag)=>(
                <li key={tag._id}><a href="" className="postTag">{tag.name}</a></li>
            ))}
        </ul>

        <div className="reactions">
            <a href=""><div className="likes">
                <AiOutlineHeart className='like' />
                <p className="likeNum">{`${props.post.likes.length} likes`}</p>
            </div></a>
            <a href=""><div className="comments">
                <AiOutlineMessage className='comment' />
                <p className="commentNum">{`${props.post.comments.length} comments`}</p>
            </div></a>


        </div>

    </div>)
}