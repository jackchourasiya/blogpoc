import { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import Navsection from './Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

function BlogPage() {
    const navigate = useNavigate();
    const [title, settitle]       = useState('');
    const [content, setcontent]   = useState('');
    const [message, setMessage]   = useState('');
    const [errors, setErrors]     = useState([]);

    const handleblog = async (e) => {
        e.preventDefault();
        const tokens = localStorage.getItem("token");
      
        try {
          // Sending login request to the server
          const response = await axios.post(
            'http://localhost:5000/createblog',
            { title, content },
            {
                headers: { Authorization: `Bearer ${tokens}` }
            }
          );
      
          setErrors([]);
          setMessage(response.data.msg); // Assuming the success message is in response.data.msg
          navigate('/blogs');
        } catch (error) {
          if (error.response) {
            // Error response from the server, check for status code
            if (error.response.status === 400) {
              // Invalid credentials (status 400)
              setMessage(error.response.data.msg );
              setErrors([{ msg: error.response.data.msg }]);
            } else {
              setMessage('An unexpected error occurred');
              setErrors([{ msg: 'An unexpected error occurred' }]);
            }
          } else {
            // If there's no response from the server (e.g., network error)
            setMessage('Network error, please try again later');
            setErrors([{ msg: 'Network error, please try again later' }]);
          }
        }
      };
  return (
    <>
        <Navsection />
        <div style={{ marginRight: '32%', marginLeft: '30%' }}>
            <h1>Create Blog...</h1>
            <Form >
                <Form.Group className="mb-3" controlId="formBasictitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text"  placeholder="Title" onChange={(e) => settitle(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicblog">
                    <Form.Label>Content</Form.Label>
                    <Form.Control type="text" placeholder="Content" onChange={(e) => setcontent(e.target.value)} required />
                </Form.Group>
                <Button variant="primary" onClick={handleblog}>
                    create
                </Button>
            </Form>

            {/* Display Errors if any */}
                {errors && errors.length > 0 && (
                <div>
                  <ul>
                      {errors.map((error, index) => (
                      <li key={index}>{error.msg}</li>
                      ))}
                  </ul>
                </div>
            )} 

            {/* Display message if no errors */}
            {message && errors.length === 0 && (
                <Alert key="primary" variant="primary">
                {message}
                </Alert>
            )}
        </div>    
    </>
  );
}

export default BlogPage;
