import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navsection from './Navbar';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import BlogList from './BlogList';

function BlogEdit() {
  const navigate = useNavigate();
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [pagestatus, setpagestatus] = useState('');


  const token = localStorage.getItem("token");

  const editpage = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/blogs_status/${blogId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error('Error updating blog status:', error);
    }
  };

  const Cancelhandler = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/blogs_edit_cancel/${blogId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      navigate('/blogs');
      console.log(response.data);
    } catch (error) {
      console.error('Error updating blog status:', error);
    }
  }

  const Actioncancel = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/blogs_edit_cancel/${blogId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error('Error updating blog status:', error);
    }
  }
  
  const handleTabClose = (event) => {
    event.preventDefault();
    event.returnValue = ""; // Standard way to prompt the user with a confirmation message
  };

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/blogs/${blogId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('response-', response)
      setBlog(response.data.msg.title);
      setContent(response.data.msg.content);
      setpagestatus(response.data.msg.isLocked);
    } catch (err) {
      setError('');
    }
  };

  useEffect(() => {
    editpage();
    fetchBlog();
    // Attach the event listener
    window.addEventListener("unload", Actioncancel);

    // Cleanup the event listener on component unmount

    return () => {
      console.log("here testing ")
      // window.removeEventListener("beforeunload", Cancelhandler);
      Actioncancel();
    }

    // Cleanup on unmount: unlock blog
  }, [blogId, token]);


  const handleSave = async () => {
    try {
      if (content.trim() === '') {
        alert('Content is required.');
      }
      else {
        const response = await axios.put(
          `http://localhost:5000/blogs/${blogId}/edit`,
          { content },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        // Set message and navigate on success
        setMessage(response.data.msg);
        navigate('/blogs');
      }
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <>
      <Navsection />
      <div style={{ marginRight: '32%', marginLeft: '30%' }}>
        <Form>
          <h1>{blog}</h1>
          <FloatingLabel controlId="floatingTextarea2" label="Content" style={{ marginBottom: '10px' }}>
            <Form.Control
              as="textarea"
              style={{ height: '100px' }}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </FloatingLabel>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="primary" onClick={Cancelhandler} style={{ marginLeft: '10px' }}>
            Cancel
          </Button>
        </Form>

        {message && (
          <Alert key="primary" variant="primary">
            {message}
          </Alert>
        )}
      </div>
    </> 
  )
}

export default BlogEdit;