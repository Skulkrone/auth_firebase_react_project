import {Routes, Route} from 'react-router-dom'
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import SignUpModal from './Components/SignUpModal';
import Private from './Pages/Private/Private';
import PrivateHome from './Pages/Private/PrivateHome/PrivateHome';
import SignInModal from './Components/SignInModal';


function App() {
  return (
    <>
    <SignUpModal></SignUpModal>
    <SignInModal></SignInModal>
    <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/private" element={<Private />}>
          <Route path="/private/private-home" element={<PrivateHome />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
