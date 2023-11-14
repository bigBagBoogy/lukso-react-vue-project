// LSP3FEmetaDataFormFE.jsx

import React, { useState } from 'react';
import { createUniversalProfile } from './DeployUPfe';
import {DeployLSP7Contract} from './LSP7Deploy.jsx';


const LSP3MetadataForm = ({ onSubmit }) => {
    
  const [formData, setFormData] = useState({
    name: '',
    description: '',    
    links: '',
    tags: '',
    avatarUrl: '',
    profileImage: '',
    nftProfileImage: '', 
    backgroundImage: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    console.log("got to here! a")
      // Check if UP browser extension is connected
      if (typeof ethereum !== 'undefined') {
    try {
        const myLSP3MetaData = await buildLSP3Metadata(formData);
      console.log('LSP3 metadata:', myLSP3MetaData);
      console.log("got to here! b")
    // call DeployUP() function
    await createUniversalProfile(myLSP3MetaData);

    } catch (error) {
      console.error('Error submitting LSP3 metadata:', error);
      // Handle errors, e.g., show an error message to the user.
    } 
    } else {
        // UP extension is not connected
        console.error('Please connect to the UP browser extension.');
      }
  };
  
/////////////////////
/// build LSP3    ///
/////////////////////
const buildLSP3Metadata = async (formData) => {
  // Implement the logic to construct the LSP3 metadata object from formData
  const lsp3Profile = {
    name: formData.name,
    description: formData.description,    
    links: formData.links.split(';').map((link) => {
      const [title, url] = link.split(',').map((item) => item.trim());
      return { title, url };
    }),
    tags: formData.tags.split(',').map((tag) => tag.trim()),
    avatarUrl: formData['avatarUrl'],
  };

  if (formData['nftProfileImage']) {
    lsp3Profile.nftProfileImage = formData['nftProfileImage'];
  }

  let production = false;

  const loadImage = async (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve({ width: img.width, height: img.height });
      img.onerror = reject;
      img.src = url;
    });
  };

  // Load profileImage and backgroundImage
  if (!production) {
    console.log("not production. fetching image from ipfs");

    const profileImageUrl = 'https://universalpage.dev/api/ipfs/QmavcM6xYwxdV1iFeMoh4SSMrFnzVMrrpxAAD3Ue78Wjc5';
    const backgroundImageUrl = 'https://universalpage.dev/api/ipfs/QmavcM6xYwxdV1iFeMoh4SSMrFnzVMrrpxAAD3Ue78Wjc5';

    const [profileImageDims, backgroundImageDims] = await Promise.all([
      loadImage(profileImageUrl),
      loadImage(backgroundImageUrl),
    ]);

    lsp3Profile.profileImage = [
      {
        width: profileImageDims.width,
        height: profileImageDims.height,
        verificationFunction: '',
        verificationData: '', // You can add verification data here if needed
        url: profileImageUrl,
      },
    ];

    lsp3Profile.backgroundImage = [
      {
        width: backgroundImageDims.width,
        height: backgroundImageDims.height,
        verificationFunction: '',
        verificationData: '', // You can add verification data here if needed
        url: backgroundImageUrl,
      },
    ];
  } else {
    if (formData['profileImage']) {
      const img = new Image();
      img.onload = async function () {
        const width = img.width;
        const height = img.height;
        console.log("Image dimensions:", width, height);

        // You need to declare profileImageUrl before using it
        let profileImageUrl = await getProfileImageUrl(formData['profileImage']);
        lsp3Profile.profileImage = [
          {
            width: width, // Use the actual width
            height: height, // Use the actual height
            verificationFunction: '',
            verificationData: '', // You can add verification data here if needed
            url: profileImageUrl, // Use the URL you get from IPFS
          }
        ];
      };
      img.src = URL.createObjectURL(formData['profileImage']);
    }
  }
  
  return lsp3Profile; // Return the LSP3 metadata object
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
        <DeployLSP7Contract/>
      </form>
    </div>
  );  
};


export { LSP3MetadataForm };
