// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { useState } from 'react';
// import Login from './components/Login';
// import BlogList from './components/BlogList';
// import BlogEdit from './components/BlogEdit';
// import BlogPage from './components/blogpage';

// function App() {
//   const [token, setToken] = useState(null);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login setToken={setToken} />} />
//         <Route path="/blogs" element={<BlogList />} />
//         <Route path="/blogpost" element={<BlogPage />} />
//         <Route path="/blogs/:blogId" element={<BlogEdit />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import { useState } from 'react';
// import Login from './components/Login';
// import BlogList from './components/BlogList';
// import BlogEdit from './components/BlogEdit';
// import BlogPage from './components/blogpage';

// function App() {
//   const [token, setToken] = useState(null);

//   return (
//     <Router>
//       <Routes>
//         {/* Public Route for Login */}
//         <Route path="/" element={<Login setToken={setToken} />} />

//         {/* Protected Routes */}
//         <Route
//           path="/blogs"
//           element={token ? <BlogList /> : <Navigate to="/" />}
//         />
//         <Route
//           path="/blogpost"
//           element={token ? <BlogPage /> : <Navigate to="/" />}
//         />
//         <Route
//           path="/blogs/:blogId"
//           element={token ? <BlogEdit /> : <Navigate to="/" />}
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import BlogList from './components/BlogList';
import BlogEdit from './components/BlogEdit';
import BlogPage from './components/blogpage';
import ProtectedRoute from './components/ProtectedRoute ';
import Signup from './components/signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} />
        
        {/* Protect these routes */}
        <Route path="/blogs" element={
          <ProtectedRoute>
            <BlogList />
          </ProtectedRoute>
        } />
        <Route path="/blogpost" element={
          <ProtectedRoute>
            <BlogPage />
          </ProtectedRoute>
        } />
        <Route path="/blogs/:blogId" element={
          <ProtectedRoute>
            <BlogEdit />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
