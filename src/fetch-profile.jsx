import React, { useState, useEffect } from "react";

const FetchProfile = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchProfileFromBackend() {
      try {
        // const address = "0x9139def55c73c12bcda9c44f12326686e3948634"; // lukso example
        const address = "0x163CF6D68Fb7287e032Eb7d1a797E737174985c1"; // Heavy metal Group
        const response = await fetch(
          `http://localhost:5000/fetch-profile/${address}`
        );
        
        console.log("Response Status:", response.status);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const returnedProfileObject = await response.json();
        console.log("Full Response from backend:", returnedProfileObject);

        setData(returnedProfileObject);
        ///// continue here Maarten! ///////
        const ipfsUrl = "https://universalpage.dev/api/ipfs/" + JSON.stringify(returnedProfileObject.profileData.profileData[1]?.value.url).replace(/["']/g, "").replace("ipfs://", "");
        fetch(ipfsUrl)
          .then(response => response.json())
          .then(ipfsProfile => {
    // Access elements of the JSON object here
         console.log(ipfsProfile);
         console.log('name:', ipfsProfile.LSP3Profile.name);
         console.log('description 2:', ipfsProfile.LSP3Profile.description);
    // Continue with your code
  })
  .catch(error => console.error('Error fetching ipfsProfile:', error));
  ///////////  end   end    end   ///////////////

      } catch (error) {
        console.error("Error fetching profile from backend:", error);
      }
  
    }

    // Call the function to fetch the data when the component mounts
    fetchProfileFromBackend();
  }, []);

  return (
    <div>
      {data ? (
        <div>
          {/* <p>Profile from the backend:</p> */}
          {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
          <p>Profile data: {JSON.stringify(data.profileData.issuedAssetsDataKey.name
)}</p>
<p>SupportedStandards in LSP3Profile: {JSON.stringify(data.profileData.profileData[0].value)}</p>

<p>ipfs Profile: {"https://universalpage.dev/api/ipfs/" + JSON.stringify(data.profileData.profileData[1]?.value.url).replace(/["']/g, "").replace("ipfs://", "")}</p>

          
  {/* <pre>{JSON.stringify(data.profileData, null, 2)}</pre>

  <h2>Issued Assets Data</h2>
  <pre>{JSON.stringify(data.issuedAssetsDataKey, null, 2)}</pre>

  <h2>Received Assets Data</h2>
  <pre>{JSON.stringify(data.receivedAssetsDataKey, null, 2)}</pre>

  <h2>Universal Receiver Data</h2>
  <pre>{JSON.stringify(data.universalReceiverDataKey, null, 2)}</pre> */}

        
        </div>
      ) : (
        <p>Loading profile data...</p>
      )}
    </div>
  );
};

export { FetchProfile };
