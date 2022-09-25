import { AiOutlineSearch,AiOutlineBell } from 'react-icons/ai'
import './topbar.css'
import logoUrl from '../../assets/logo.jpeg'

export default function Topbar() {
    return (
        <div className="topbarContainer">
            <div className="leftContainer">
                <a href="" className="topbarlogo">EI</a>
                <div className="searchContainer">
                    <input type="search" name="" id="" className='searchInput' />
                    <AiOutlineSearch className='searchButton'/>
                </div>
            </div>



            <div className="rightContainer">
                <a href="/new" className="newPost">New Post</a>
                <a href=""><AiOutlineBell className='notifications'/></a>
                <a href="" className='profileLink'><img src={logoUrl} alt="" className="profilePic" /></a>
            </div>



        </div>
    )
}