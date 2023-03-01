import React from 'react'
import { Provider } from 'react-redux';
import store from './reduce'

import { RouterProvider } from "react-router-dom";
import { AliveScope } from 'react-activation'
import { Router } from "@/router";

function App() {

  return (
    <Provider store={store}>
      <AliveScope>
        <RouterProvider router={Router} />
      </AliveScope>
    </Provider>
  )
}

export default App