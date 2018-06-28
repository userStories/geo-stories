import React from 'react'

const GetLocation = () => {
  navigator.geolocation.getCurrentPosition(
    position => {
      console.log('CurrentPosition:', position)
      return(position)
    },
    (error) => { console.log(error) }
  )
}

export default GetLocation;