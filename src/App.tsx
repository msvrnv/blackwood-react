import './App.css'
import Navbar from "./components/Navbar.tsx";
import {HashRouter, Route, Routes} from "react-router-dom";
import HomePage from "./routes/HomePage.tsx";
import CollectionsListPage from "./routes/CollectionsListPage.tsx";
import CollectionPage from "./routes/CollectionPage.tsx";
import ProductPage from "./routes/ProductPage.tsx";
import Footer from "./components/Footer.tsx";

function App() {
    return (
        <HashRouter>
            <div
                className="top-0 left-0 w-full z-[9999] bg-black text-white text-center text-sm py-1 px-2 pointer-events-none">
                All materials are works of fiction and intended for entertainment purposes only.
            </div>
            <div className="mx-auto my-5 max-w-[1152px] max-lg:m-5">
                <Navbar/>
                <Routes>
                    <Route path="/" element={ <HomePage /> } />
                    <Route path="/collections" element={ <CollectionsListPage /> }/>
                    <Route path="/collections/:collectionId" element={<CollectionPage />} />
                    <Route path="/product/:productId" element={<ProductPage />} />
                </Routes>
                <Footer />
            </div>
        </HashRouter>
    )
}

export default App
