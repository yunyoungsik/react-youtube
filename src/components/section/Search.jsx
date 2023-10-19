import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

const Search = () => {
    return (
        <div id='search'>
            <div className="search__inner">
                <label htmlFor="searchInput">검색</label>
                <div className="search__inner__input">
                    <input
                        type="search"
                        id='searchInput'
                        placeholder='검색어를 입력해주세요.'
                        autoComplete='odff'
                        className='search__Input'
                    />
                    <div className="search__btn">
                        <AiOutlineSearch />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search