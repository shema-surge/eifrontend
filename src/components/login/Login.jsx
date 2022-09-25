import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie';
import logoUrl from '../../assets/logo.jpeg'
import './login.css'

const cookies = new Cookies()

export default function Login(){

    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const[errorMsg,setErrorMsg] = useState(false)


    const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault()

        console.log(email,password)

        axios({
            method:'POST',
            url:'http://localhost:3500/api/users/login',
            data:{
                email,
                password
            }
        }).then((response)=>{
            cookies.set('token',response.data.token,{path:'/',maxAge:60*60})
            console.log(response.data)
            if(errorMsg) setErrorMsg('')
            navigate("/new")
        }).catch((err)=>{
            console.error(err)
            if(!errorMsg) setErrorMsg(err.message)
        })

    }
    
    return(
        <div className="loginWrapper">
            <div className="loginContainer">
                <img src={logoUrl} alt="" className="logo" />
                <form action="" className="loginForm" onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email" name="" id="" className='loginInput' onChange={e=>setEmail(e.target.value)} required/>
                    <input type="password" placeholder="Password" name="" id="" className='loginInput' onChange={e=>setPassword(e.target.value)} required/>
                    <input type="submit" value="Login" className='loginButton'/>
                </form>
                <a href="/signup" className="signup">Create an account?</a>
                <p className="loginFailure">{errorMsg}</p>
            </div>
        </div>
    )
}