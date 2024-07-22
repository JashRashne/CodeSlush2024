import React, { useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const OAuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const queryParams = new URLSearchParams(location.search);
      const code = queryParams.get('code');
      console.log("Authorization Code:", code);

      if (code) {
        try {
          const response = await axios.get(`http://localhost:8000/steps?code=${code}`);
          console.log(response.data);
          navigate('/');
        } catch (error) {
          console.error('Error fetching data:', error);
          alert('Error fetching data. Please check the console for more details.');
        }
      } else {
        alert('Authorization code is missing.');
      }
    };

    fetchData();
  }, [location.search, navigate]);

  return <div>Processing your login... Please wait.</div>;
};

export default OAuthCallback;
