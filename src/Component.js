import React, { useEffect, useRef, useState } from 'react'
import Chip from './Chip'
import { USERS } from './services/constant'

export default function Component() {
    const [chips, setChips] = useState([])
    const [users, setUsers] = useState(USERS)
    const [inp, setInp] = useState('')
    const [showList, setShowList] = useState(false)
    const [lastChip, setLastChip] = useState('')
    const ref = useRef(null)
    //handle input change and addition or deletion of chip
    useEffect(() => {
        if(!inp.length) {
            setUsers(USERS.filter(ul => !chips.some(ch => ch.email === ul.email)))
        } else {
            let userList = USERS.filter(user => user.name.toLowerCase().includes(inp.toLowerCase()) || user.email.toLowerCase().includes(inp.toLowerCase()))
            userList = userList.filter(ul => !chips.some(ch => ch.email === ul.email))
            setUsers(userList)
        }  
    },[chips,inp])

    //handle outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
              setShowList(false)
            } else {
                setShowList(true)
            }
          }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the listener on unmount
            document.removeEventListener("mousedown", handleClickOutside);
          };
    },[ref])

   //handle backspace
    useEffect(() => {
        function handleBackSpace(e) {
            if (e.key === 'Backspace') {
                if(!chips.length || inp.length > 0) return
                if(lastChip?.cnt === 1) {
                    deleteChip(lastChip.chip);
                } else {
                    setLastChip({
                        chip:chips[chips.length-1],
                        cnt: 1
                      })
                } 
            } 
          }
        document.addEventListener("keydown", handleBackSpace);
        return () => {
            // Unbind the listener on unmount
            document.removeEventListener("keydown", handleBackSpace);
          };
    })

    //delete chip
    const deleteChip = user => {
        setChips(prev_chips => prev_chips.filter(el => el.email !== user.email))
        setLastChip({})
    }

    const colors = {
        0: 'bg-red-500',
        1: 'bg-blue-500',
        2: 'bg-green-500',
        3: 'bg-sky-500',
        4: 'bg-gray-500',
        5: 'bg-yellow-500'
    }
    const Item = ({user}) => {

        //add chip
        const addChip = user => {
            setChips(prev_chips => ([...prev_chips,user]))
            setLastChip({})
            setShowList(false)
        }
        return (
            <div onClick={() => addChip(user)} className='w-full p-2 flex gap-3 cursor-pointer hover:bg-gray-200'>
                <div className={`w-6 h-6 rounded-full ${colors[Math.floor(Math.random()*5)]}`}></div>
                <p className='text-sm'>{user.name}</p> 
                <p className='text-sm text-gray-400'>{user.email}</p>
            </div>
        )
    }
    
  return (
    <div className='w-full p-8 h-60 bg-gray-100'>
       <div className=' flex flex-wrap gap-2 border-b-2 bg-red p-2'>
            {
                chips.map(chip => (
                    <Chip user={chip} deleteChip={deleteChip} lastChip={lastChip}/>
                ))
            } 
            <div ref={ref} className='relative'>
                <input  type='text' placeholder='enter user' className='outline-none p-2 w-80 bg-transparent' value={inp} onChange={(e) =>  setInp(e.target.value)}/>
                {
                    showList && !!users.length && 
                        <div className="absolute w-96 top-10 shadow-sm border max-h-[300px] overflow-auto bg-white z-50 ">
                            {
                                users.map(user => <Item user={user}/>)
                            }   
                        </div>
                }
            </div>  
        </div>
    </div>
  )
}
