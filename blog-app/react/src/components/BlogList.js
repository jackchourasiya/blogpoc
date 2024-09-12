import { useEffect, useState } from 'react';
import axios from 'axios';
import Navsection from './Navbar';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';

const BlogList = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const tokens = localStorage.getItem("token");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/blogs', {
          headers: { Authorization: `Bearer ${tokens}` }
        });
        setBlogs(response.data);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Error fetching blogs');
      }
    };
    fetchBlogs();
  }, [tokens]);

  const checkstatus = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/blogs/${id}`, {
        headers: { Authorization: `Bearer ${tokens}` }
      });

      const isLocked = response.data.msg.isLocked;
      if (isLocked) {
        navigate(`/blogs/${id}`); // Redirect to the blog page
      } else {
        alert('Another user is currently editing this blog.');
      }
      console.log('checkstatusres-', response.data.msg.isLocked)

    } catch (err) {
      setError('');
    }
  }

  return (
    <>
      <Navsection />
      {blogs.length > 0 ? (
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Blogs Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => (
              <tr key={blog._id}>
                <td>{index}</td>
                <td>{blog.title}</td>
                <td><button onClick={() => checkstatus(blog._id)}>Edit here...</button></td>
                {/* <td><Link to={`/blogs/${blog._id}`} >Click here...</Link></td> */}
              </tr>
            ))}

          </tbody>
        </Table>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontWeight: 'bold' }}>No blogs available</p>
          Create Blog <Link to={'/blogpost'} >Click here...</Link>
        </div>
      )}
    </>
  );
};

export default BlogList;
