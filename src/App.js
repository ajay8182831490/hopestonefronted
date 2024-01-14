// App.js
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Home from './componets/Home';
import Login from './componets/Login';
import Signup from './componets/Signup';
import About from './componets/About';
import Navbar from './componets/Navbar';
import Createblog from './componets/Createblog';
import Myblog from './componets/Myblog';
import Myaccount from './componets/Myaccount';
import Verify from './componets/Verify';
import UpdatesPost from './componets/UpdatesPost';
import BlogRead from './componets/BlogRead';
import ForgetPassword from './componets/ForgetPassword';

import Updateuser from './componets/Updateuser';
import UpdatePassword from './componets/UpdatePassword';
import Footer from './componets/Footer';
import ResetPasswordPage from './componets/ResetPasswordPage'
import DeleteAccount from './componets/DeleteAccount';




function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <div className="container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/About' element={<About />} />
            <Route path='/Createblog' element={<Createblog />} />
            <Route path='/Myblog/*' element={<Myblog />} />
            <Route path='/Myblog/Update/:postId' element={<UpdatesPost />} />
            <Route path='/Myblog/read/:postId' element={<BlogRead />} />
            <Route path='/Myaccount' element={<Myaccount />} />
            <Route path='/Verify' element={<Verify />} />
            <Route path='/forgetPassword' element={<ForgetPassword />} />
            <Route path="/resetPassword/" element={<ResetPasswordPage />} />
            <Route path='/updateUser' element={<Updateuser />} />
            <Route path='/updatePassword' element={<UpdatePassword />} />
            <Route path='/deleteAccount' element={<DeleteAccount />} />



          </Routes>

        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
