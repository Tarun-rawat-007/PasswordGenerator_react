
import { useState,useCallback,useEffect,useRef } from 'react'
import './App.css'
import Dashboard from './Dashboard'



function App() {
  const [length,setlength]=useState(8)
  const [numberAllowed,setNumberAllowed]=useState(false)
  const [charAllowed,setCharAllowed]=useState(false)
  const [password,setPassword]=useState("")

  // use ref hook variable
  const passwordRef=useRef(null)



  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="@#$&%!~"
    for (let i = 1; i <= length; i++) {
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setPassword(pass)
  } ,[length,numberAllowed,charAllowed,setPassword])


  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)   //copy to clip board
  },[password])


  useEffect(()=>{passwordGenerator()},[length,numberAllowed,charAllowed,passwordGenerator])



  return (
    <>
    <Dashboard></Dashboard>
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg p-7 my-8  text-white bg-gray-400  ">
    <h1 className='text-white text-center mb-3 text-2xl '>Password Generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-1 ">
      <input type='text' value={password} className='outline-none w-full py-1 px-5  text-black' placeholder='password'  readOnly ref={passwordRef}/>
      <button className='py-1 px-5 bg-blue-700 hover:bg-blue-400 ' onClick={copyPasswordToClipboard}>Copy</button>
    </div>
    <div className="flex text-sn gap-x-2 ">
      <div className="flex items-center gap-x-1 ">
      <input type="range" min={6} max={25} value={length} className='cursor-pointer' 
       onChange={(e)=>(setlength(e.target.value))}/>
      <label >Length:{length}</label>
      </div>
        <div className="flex items-center gap-x-1">
           <input type="checkbox"  defaultChecked={numberAllowed} id="numberInput"
                onChange={()=>{setNumberAllowed((prev)=>!prev);}}/>
                <label htmlFor="numberInput" >Numbers</label>
        </div>
         <div className="flex items-center gap-x-1">
           <input type="checkbox"  defaultChecked={charAllowed} id="CharacterInput"
                onChange={()=>{setCharAllowed((prev)=>!prev);}}/>
                <label htmlFor="numberInput" >Characters</label>
        </div>

      </div>
    </div>
  
    </>
  )
}

export default App
