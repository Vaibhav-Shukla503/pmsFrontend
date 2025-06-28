import { Routes, Route, Navigate, Router,BrowserRouter } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignUp from './components/signup';
import Seller from './components/Seller';
import FileUpload from './components/FileUpload';
import Logout from './components/Logout';


function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/seller/*" element={<Seller />} />
      <Route path="/fileupload" element={<FileUpload />} />
      <Route path='/Logout' element={<Logout />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
