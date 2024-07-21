import React, { useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const OAuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      // Parse the query parameters from the URL
      const queryParams = new URLSearchParams(location.search);
      const code = queryParams.get('code');
      console.log("Authorization Code:", code);

      if (code) {
        try {
          // Send the authorization code to your backend
          const response = await axios.get(`http://localhost:8000/steps?code=${code}` );
          console.log(response.data);
          // Redirect to the desired page after processing
          navigate('/');
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [location.search, navigate]);

  return <div>Processing your login... Please wait.</div>;
};

export default OAuthCallback;
