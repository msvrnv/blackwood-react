import './App.css'
import Navbar from "./components/Navbar.tsx";
import {HashRouter} from "react-router-dom";

function App() {

  return (
      <HashRouter>
          <div className="mx-auto my-5 max-w-[1152px] max-lg:m-5">
              <Navbar />
          </div>
      </HashRouter>
  )
}

export default App
