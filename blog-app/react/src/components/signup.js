import { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link  } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

function Signup() {
  const navigate = useNavigate(); // Initialize the navigate function

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage]   = useState('');
  const [errors, setErrors]     = useState([]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
        // Sending registration request to the server
        const response = await axios.post(
            'http://localhost:5000/register',
            { username, password },
            { headers: { 'Content-Type': 'application/json' } }
        );


        setErrors([]);
        setMessage(response.data.msg); // Assuming the success message is in response.data.msg
        setUsername('');
        setPassword('');
        navigate('/login');
        } catch (error) {
        if (error.response) {
            if (error.response.status === 400) {
            setMessage(error.response.data.msg || 'Invalid input');
            setErrors([{ msg: error.response.data.msg || 'Invalid input' }]);
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
    <div style={{ marginRight: '32%', marginLeft: '30%' }}>
        <h1>Sign Up</h1>
        <Form >
            <Form.Group className="mb-3" controlId="formBasicusername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text"  placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="text" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>
            <Button variant="primary" onClick={handleLogin}>
              Signup
            </Button>
            <p>For Signup, click <Link to="/login">here</Link>.</p>
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
  );
}

export default Signup;
