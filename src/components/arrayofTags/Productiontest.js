import React from 'react'
import { useState, useContext, useEffect } from 'react';



const Productiontest = () => {

    const [url, Seturl] = useState("")


    useEffect(()=>{

        const url = process.env.REACT_APP_ENV === 'production' ? 'https://stackdevhelp-backend.herokuapp.com' : 'http://localhost:4200' 
        Seturl(url) 
      })
    

  return (
    <div> <h1>here is your environment </h1>
        <h1>why {url}</h1>

     </div>
  )

}
export default Productiontest