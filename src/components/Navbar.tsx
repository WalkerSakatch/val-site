import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {

    const [visible, setVisible] = useState(false);

    function toggleMenu(e: any) {
        const nav = document.querySelector('.primary-navigation')!;
        
        //Attribute comes as a string, so converting it to boolean for ease of use
        let visStr = nav?.getAttribute('data-visible');
        let visBool = (visStr === 'true');
        
        //For some reason setAttribute won't accept !visBool.toString as a string, so I did this because I want to write as little as possible
        let oppVisBool = !visBool
        
        nav.setAttribute('data-visible', oppVisBool.toString());
        setVisible(oppVisBool);
    }

    return (
        <>
        <header>
            <button className='mobile-nav-toggle' aria-controls='primary-navigation' aria-expanded={false} onClick={toggleMenu}>
                { visible 
                ? <FontAwesomeIcon icon={faXmark} size={'2xl'}/> 
                : <FontAwesomeIcon icon={faBars} size={'2xl'}/>}
            </button>
            
            {/* {//! CONSIDER PUTTING THE UL, LI STUFF INTO IT'S OWN COMPONENT TO CLEAN THIS UP} */}
            <nav>
                <ul id='primary-navigation' className='primary-navigation flex' data-visible="true">
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
            </nav>
        </header>
        </>
        
    )
}
