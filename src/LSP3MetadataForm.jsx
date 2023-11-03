// LSP3MetadataForm.jsx

import React, { useState } from 'react';
import axios from 'axios'; 

const LSP3MetadataForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    tags: '',
    links: '',
    avatarUrl: '',
    profileImage: '',
    nftProfileImage: '', 
    backgroundImage: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log('Submitted Data:', formData); // temporary logging
      // Transform the form data into the LSP3 metadata object
      const lsp3Profile = buildLSP3Metadata(formData);  
      // Send the LSP3 metadata object to the backend API
      axios
        .post('http://localhost:5000/submit-LSP3', lsp3Profile) // Adjust the API endpoint as needed
        .then((response) => {
          console.log('LSP3 metadata submitted:', response.data);
          // You can handle success responses here, e.g., show a success message to the user.
        })
        .catch((error) => {
          console.error('Error submitting LSP3 metadata:', error);
          // Handle errors, e.g., show an error message to the user.
        });
    };
/////////////////////
/// build LSP3    ///
/////////////////////
  const buildLSP3Metadata = (formData) => {
    // Implement the logic to construct the LSP3 metadata object from formData
    const lsp3Profile = {
      name: formData.name,
      description: formData.description,
      tags: formData.tags.split(',').map((tag) => tag.trim()),
      links: formData.links.split(';').map((link) => {
        const [title, url] = link.split(',').map((item) => item.trim());
        
        return { title, url };
      }),
      avatarUrl: formData['avatar-url'],
    }; 
// for now, we assume we got back the ipfs image url.
// so in pseudo code: async function getProfileImageUrl('profileImage') {
// const profileImageUrl = await sendToIpfs('profileImage');
// return profileImageUrl; }

let production = false;

if (!production) {
  let width, height;
  let profileImageUrl = 'https://universalpage.dev/api/ipfs/QmavcM6xYwxdV1iFeMoh4SSMrFnzVMrrpxAAD3Ue78Wjc5';
   // Create an image element
   const img = new Image();
   img.onload = function () {
     // The image has loaded, and its dimensions are now available
     width = img.width;
     height = img.height;
   };
  lsp3Profile.profileImage = [
    {
      width: width, // Use the actual width
      height: height, // Use the actual height
      verificationFunction: 'ipfs',
      verificationData: '', // You can add verification data here if needed
      url: profileImageUrl, // Use the URL you get from IPFS
    }
  ];
} else {
  if (formData['profileImage']) {
    const img = new Image();
    img.onload = async function () {
      const width = img.width;
      const height = img.height;

      // You need to declare profileImageUrl before using it
      let profileImageUrl = await getProfileImageUrl(formData['profileImage']);
      lsp3Profile.profileImage = [
        {
          width: width, // Use the actual width
          height: height, // Use the actual height
          verificationFunction: 'ipfs',
          verificationData: '', // You can add verification data here if needed
          url: profileImageUrl, // Use the URL you get from IPFS
        }
      ];
    };
    img.src = URL.createObjectURL(formData['profileImage']);
  }
}


  if (formData['nftProfileImage']) {
    lsp3Profile.nftProfileImage = formData['nftProfileImage'];
  } 


  if (!production) {
    let width, height;
    let backgroundImageUrl = 'https://universalpage.dev/api/ipfs/QmavcM6xYwxdV1iFeMoh4SSMrFnzVMrrpxAAD3Ue78Wjc5';
    const img = new Image();
    img.onload = function () {
      // The image has loaded, and its dimensions are now available
      width = img.width;
      height = img.height;
    };
    lsp3Profile.backgroundImage = [
      {
        width: width, // Use the actual width
        height: height, // Use the actual height
        verificationFunction: 'ipfs',
        verificationData: '', // You can add verification data here if needed
        url: backgroundImageUrl, // Use the URL you get from IPFS
      }
    ];
  } else {
    if (formData['backgroundImage']) {
      const img = new Image();
      img.onload = async function () {
        const width = img.width;
        const height = img.height;
  
        // You need to declare backgroundImageUrl before using it
        let backgroundImageUrl = await getBackgroundImageUrl(formData['backgroundImage']);
        lsp3Profile.backgroundImage = [
          {
            width: width, // Use the actual width
            height: height, // Use the actual height
            verificationFunction: 'ipfs',
            verificationData: '', // You can add verification data here if needed
            url: backgroundImageUrl, // Use the URL you get from IPFS
          }
        ];
      };
      img.src = URL.createObjectURL(formData['backgroundImage']);
    }
  }
  // Now, you can call the onSubmit function with the LSP3 metadata object
  onSubmit(lsp3Profile);
};

  

  return (
    <div>
      <form id="profile-form" className="form-container">
        <div className="input-container">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
  
        <div className="input-container">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
  
        <div className="input-container">
          <label htmlFor="tags">Tags (comma-separated):</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
          />
        </div>
  
        <div className="input-container">
          <label htmlFor="links">Links (title,url;title,url):</label>
          <input
            type="text"
            id="links"
            name="links"
            value={formData.links}
            onChange={handleChange}
          />
        </div>
  
        <div className="input-container">
          <label htmlFor="avatarUrl">Avatar URL:</label>
          <input
            type="text"
            id="avatarUrl"
            name="avatarUrl"
            value={formData['avatarUrl']}
            onChange={handleChange}
          />
        </div>
  
        <div className="input-container">
          <label htmlFor="profile-image">Profile Image:</label>
          <input
            type="file"
            id="profileImage"
            name="profileImage"
            onChange={handleChange}
          />
        </div>
  
        <div className="input-container">
          <label htmlFor="nft-profile-image">NFT Profile Image: *optional</label>
          <input
            type="text"
            id="nftProfileImage"
            name="nftProfileImage"
            placeholder="paste nft address here"
            value={formData['nftProfileImage']}
            onChange={handleChange}
          />
        </div>
  
        <div className="input-container">
          <label htmlFor="backgroundImage">backgroundImage:</label>
          <input
            type="file"
            id="backgroundImage"
            name="backgroundImage"
            onChange={handleChange}
          />
        </div>
  
        <button type="button" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );  
};


export { LSP3MetadataForm };