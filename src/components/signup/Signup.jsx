import { useState } from 'react'
import axios from 'axios'
import logoUrl from '../../assets/logo.jpeg'
import './signup.css'

export default function Signup(){

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confPassword,setConfPassword] = useState('')
    const [errorMsg,setErrorMsg] = useState('')

    function handleSubmit(e){
        e.preventDefault()

        if(password!=confPassword){
            setErrorMsg('Passwords do not match.')
            return
        }

        axios({
            method:'POST',
            url:'http://localhost:3500/api/users/signup',
            data:{
                name,
                email,
                password
            }
        }).then((response)=>{
            console.log(response.data)
            if(errorMsg) setErrorMsg('')
        }).catch((err)=>{
            console.log(err.status)
            setErrorMsg(err.message)
        })
        
        
    }
    
    return(
        <div className="signupWrapper">
            <div className="signupContainer">
                <img src={logoUrl} alt="" className="logo" />
                <form action="" className="signupForm" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Full name" name="" className='signupInput' onChange={e=>setName(e.target.value)} required/>
                    <input type="email" placeholder="Email" name="" className='signupInput' onChange={e=>setEmail(e.target.value)} required/>
                    <input type="password" placeholder="Password" name="" className='signupInput' onChange={e=>setPassword(e.target.value)} required/>
                    <input type="password" placeholder="Confirm password" name="" className='signupInput' onChange={e=>setConfPassword(e.target.value)} required/>
                    <input type="submit" value="Sign up" className='signupButton'/>
                </form>
                <a href="/login" className="signup">Already have an account</a>
                <p className="passwordMatch">{errorMsg}</p>
            </div>
        </div>
    )
}