import React from 'react'
import { useState, useContext, useEffect } from 'react';
import UserContext from '../UserContext'



const Productiontest = () => {

  
    const {getEnvUrl} = useContext(UserContext)


 
    

  return (
    <div> <h1>here is your environment </h1>
        <h1> {getEnvUrl}</h1>

     </div>
  )

}
export default Productiontest