import React from 'react'


// container is just a box that wraps the children
const Container = ({children}) => {
  return <div className='w-full max-w-7xl mx-auto px-4 '>{children}</div>;
  
}

export default Container