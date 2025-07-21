
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Wissenswertes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the new index page
    navigate('/wissenswertes', { replace: true });
  }, [navigate]);

  return null;
};

export default Wissenswertes;
