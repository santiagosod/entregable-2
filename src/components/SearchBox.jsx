import React, { useState } from 'react'



const SearchBox = ({query, search, setQuery}) => {

  return (
        <div className="search-box">
          <input 
            type="text" 
            className='search-bar' 
            placeholder='Search...'
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
  )
}

export default SearchBox