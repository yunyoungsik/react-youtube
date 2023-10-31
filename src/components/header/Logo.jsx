import React from 'react'

import { SiNetflix } from 'react-icons/si'
import { Link } from 'react-router-dom'

const logo = () => {
  return (
    <h1 className='header__logo'>
      <Link to='/'>
        <em>
          <SiNetflix />
        </em>
        <span>Molabogi Youtube</span>
      </Link>
    </h1>
  )
}

export default logo