    import { BrowserRouter, Route, Routes } from "react-router-dom"
    import { Home } from "./pages/Home"
    import { NotFound } from "./pages/Notfound"

    export const Routing = () =>{
        return(
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/exchange-rates" element={<NotFound/>}/>
                <Route path="/error" element={<NotFound/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
            </BrowserRouter>
        )
    }