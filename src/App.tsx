
import {BrowserRouter, Route, Routes} from "react-router-dom"
import React, {Suspense} from "react";
const  Dashboard =React.lazy(()=>import("./Pages/Dashboard/Dashboard"))
function App()
{
  return(
    <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
           <Routes>
               <Route index element={<Dashboard/>}/>
               <Route path="/Dashboard" element={<Dashboard/>}/>
           </Routes>
       </Suspense>
    </BrowserRouter>
  );
}

export default App;
