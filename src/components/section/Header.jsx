import React from 'react'
import { SiNetflix } from 'react-icons/si'
import { BsFillPlayFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'


const Header = () => {
    return (
        <header id='header' role='banner'>
            <h1 className='header__logo'>
                <Link to='/'>
                    <em>
                        <SiNetflix />
                    </em>
                    <span>Netflix All Youtube</span>
                </Link>
            </h1>
            <nav className='header__menu'>
                <ul className='menu'>
                    <li className='active'>
                        <Link to='/'><BsFillPlayFill />넷플릭스 몰아보기</Link>
                    </li>
                    <li>
                        <Link to='/'><BsFillPlayFill />넷플릭스 소개영상</Link>
                    </li>
                    <li>
                        <Link to='/'><BsFillPlayFill />넷플릭스 유튜버</Link>
                    </li>
                </ul>
            </nav>
            <div className='header__sns'></div>
        </header>
    )
}

export default Header