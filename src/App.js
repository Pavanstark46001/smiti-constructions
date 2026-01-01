import logo from './logo.svg';
import './App.css';
import SplineLayout from './components/SplineLayout';
import Canvas from './components/Canvas';
import Header from './components/Header';
import Banner from './components/Banner';
import Services from './components/Services';

function App() {
  return (
    <div >
      <Header />
      <Banner />
      {/* <SplineLayout /> */}
      <Services />
      <Canvas />

    </div>
  );
}

export default App;
