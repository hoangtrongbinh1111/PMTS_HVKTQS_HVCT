import React, { Suspense, useEffect } from 'react'

// ** Router Import
import Router from './router/Router'
import { switchDotTuyenSinhByName } from './api/DotTuyenSinh'

const App = () => {
  const dbName_ = localStorage.getItem('dbName')
  useEffect(() => {
    if (dbName_) {
      const res = switchDotTuyenSinhByName({
        dbName: dbName_,
      }).then(res => {
      console.log("")
    }).catch(err => {
      console.log(err)
    })
  }
}, [dbName_])
  return (
    <Suspense fallback={null}>
      <Router />
    </Suspense>
  )
}

export default App
