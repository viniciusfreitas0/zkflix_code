import React from 'react';
import './Header.css'
import zkflix from '../componentes/img/zkflix.png'

export default ({black}) => {
    return(
        <header className={black ? 'black' : ''}>
     <div className='header--logo'>
       <a href="/">
         <img className='teste' src={zkflix} /></a>
         </div>
         <div className='header--user'>
         <a href="">
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="" srcset="" />
         </a>
         </div>
     
     
        </header>
    )
}