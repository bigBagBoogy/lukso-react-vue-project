import React, { useState, useEffect } from 'react';

const FetchAssetData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Function to fetch data from your backend
    async function fetchDataFromBackend() {
      try {
        const response = await fetch('http://localhost:5000/assets'); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching assets from backend:', error);
      }
    }

    // Call the function to fetch the data when the component mounts
    fetchDataFromBackend();
  }, []);

  return (
    <div>      
      {data ? (
        <div>
          <p>Assetdata from the backend:</p>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading assetdata...</p>
      )}
    </div>
  );
}

export { FetchAssetData };
