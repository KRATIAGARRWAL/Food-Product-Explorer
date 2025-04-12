import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import Footer from "./common/Footbar";
import Navbar from "./common/Navbar";
import Footer from "./common/Footbar";

const App=()=>{
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navbar />} />

            </Routes>
            <Footer/>
        </Router>
    )
}

export default App;