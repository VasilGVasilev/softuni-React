import logo from './logo.svg';
import './App.css';
import Footer from './Footer';
import { Header } from './Header';

function App() {
  return (
    <div className="App">
      <Header text='This shows how hot module replacement works without full reload' />
      <Footer/>
    </div>
  );
}

export default App;
