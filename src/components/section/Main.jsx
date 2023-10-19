import React from 'react'
import Search from './Search'

const main = (props) => {
    return (
        <main id='main' roll='main'>
            <Search />
            {props.children}
        </main>
    )
}

export default main