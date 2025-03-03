import { useContext, useEffect } from 'react';
import { UserContext } from '../context/userContext.jsx';
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

const DeletePost = ({ postId: id }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const { currentUser } = useContext(UserContext);
    const token = currentUser?.token;

    
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]); 

    const removePost = async () => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/posts/${id}`, {
                withCredentials: true, 
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 200) {
                if (location.pathname === `/myposts/${currentUser.id}`) {
                    navigate(0); 
                } else {
                    navigate('/'); 
                }
            }
        } catch (error) {
            console.log("Couldn't delete post.");
        }
    };

    return (
        <Link className='btn sm danger' onClick={removePost}>Delete</Link> 
    );
};

export default DeletePost;
