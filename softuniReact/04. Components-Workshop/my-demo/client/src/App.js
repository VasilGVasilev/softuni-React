import './App.css'
import { Header } from "./components/common/Header";
import { Footer } from './components/common/Footer';
import { Search } from './components/search/Search';
function App() {
    return (
        <div>
            <Header/>

            <main className='main'>
                <section className="card users-container">
                    <Search/>
                </section>
            </main>
            
            <Footer/>
        </div>
    );
}

export default App;
