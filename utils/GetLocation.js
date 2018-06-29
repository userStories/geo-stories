import React from 'react'

export const GetLocation = () => {
  let nav = navigator.geolocation.getCurrentPosition(position => position,)
  return nav
}

// export GetLocation;