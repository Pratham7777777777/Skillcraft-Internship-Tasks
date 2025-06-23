import React from 'react'

export const Footer = () => {
  // let footerStyle = {
  //   position: "relative",
  //   top: "70vh",
  //   width: "100%"
  // } You can add this in footer as well if we have to use it style={footerStyle} 
  return (
    <footer className='bg-dark text-light py-3 text-center' >
      <p className='text-center'>
      Copyright &copy; MyTodosList.com
      </p>
      </footer>
  )
}
