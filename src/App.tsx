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
