import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {

    const [visible, setVisible] = useState(false);

    function toggleMenu() {
        setVisible(!visible);
    }

    return (
        <>
        <header>
            <button className='mobile-nav-toggle' aria-controls='primary-navigation' aria-expanded={false} onClick={toggleMenu}>
                {visible 
                ? <FontAwesomeIcon icon={faXmark} size={'2xl'}/> 
                : <FontAwesomeIcon icon={faBars} size={'2xl'}/>}
            </button>
            
            {/* {//! CONSIDER PUTTING THE UL, LI STUFF INTO IT'S OWN COMPONENT TO CLEAN THIS UP} */}
            <nav>
                {visible
                ?   <ul id='primary-navigation' className='primary-navigation flex' >
                        <li>
                            <Link to="/valorant" onClick={toggleMenu}>Home</Link>
                        </li>
                        <li>
                            <Link to="/valorant/weapons" onClick={toggleMenu}>Weapons</Link>
                        </li>
                        <li>
                            <Link to="/valorant/maps" onClick={toggleMenu}>Maps</Link>
                        </li>
                    </ul>

                :   <></>
            }
            </nav>
        </header>
        </>
        
    )
}
