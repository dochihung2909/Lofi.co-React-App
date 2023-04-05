import DefaultLayout from '~/layouts/DefaultLayout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { storage } from '~/config/firebase'

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <DefaultLayout></DefaultLayout>
            </div>
        </BrowserRouter>
    )
}

export default App
