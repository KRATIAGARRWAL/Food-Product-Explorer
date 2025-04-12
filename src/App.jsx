import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import Footer from "./common/Footbar";
import Navbar from "./common/Navbar";
import Footer from "./common/Footbar";
import Home from "./pages/homepage";

const App=()=>{
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home/>} />

            </Routes>
            <Footer/>
        </Router>
    )
}

export default App;