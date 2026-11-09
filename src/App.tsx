import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Pages/Layout'
import Home from './Pages/Home'
import About from './Pages/About'

const App = () => {
  const routes=createBrowserRouter([{path:"/",
    element:<Layout/>,
    children:[
      {
        index:true,
        element:<Home/>
      },{
        path:"/about",
        element:<About/>
      }
    ]
  }])
  return (
    <div>
      <RouterProvider router={routes}/>
    </div>
  )
}

export default App