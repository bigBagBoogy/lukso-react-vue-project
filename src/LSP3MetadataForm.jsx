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
        .post('/submit-LSP3', lsp3Profile) // Adjust the API endpoint as needed
        .then((response) => {
          console.log('LSP3 metadata submitted:', response.data);
          // You can handle success responses here, e.g., show a success message to the user.
        })
        .catch((error) => {
          console.error('Error submitting LSP3 metadata:', error);
          // Handle errors, e.g., show an error message to the user.
        });
    };

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
      // Handle profileImage, nftProfileImage, and backgroundImage
  const files = ['profileImage', 'backgroundImage'];
  for (const fileInput of files) {
    if (formData[fileInput]) {
      // Handle file upload here
      // You can use FormData to send the file to the backend
      const file = formData[fileInput];
      const formData = new FormData();
      formData.append('file', file);
      // Send the formData (images) to the backend using Axios
      // or to ipfs using web3.storage
      // Example:
      // axios.post('/upload-file-endpoint', formData).then((response) => {
      //   console.log(`Uploaded ${fileInput} successfully: ${response.data}`);
      // }).catch((error) => {
      //   console.error(`Error uploading ${fileInput}: ${error}`);
      // });
    }
  }

  // Handle nftProfileImage (text input)
  if (formData['nft-profileImage']) {
    lsp3Profile.nftProfileImage = formData['nft-profileImage'];
  }

  // Now, you can call the onSubmit function with the LSP3 metadata object
  onSubmit(lsp3Profile);
};

    // Call the onSubmit function with the LSP3 metadata object
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
          <label htmlFor="avatar-url">Avatar URL:</label>
          <input
            type="text"
            id="avatar-url"
            name="avatar-url"
            value={formData['avatar-url']}
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
            id="nft-profileImage"
            name="nft-profileImage"
            placeholder="paste nft address here"
            value={formData['nft-profileImage']}
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