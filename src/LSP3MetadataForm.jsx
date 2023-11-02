// LSP3MetadataForm.jsx

import React, { useState } from 'react';

const LSP3MetadataForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    tags: '',
    links: '',
    avatarUrl: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log('Submitted Data:', formData); // temporary log
    // Transform the form data into the LSP3 metadata object
    // const lsp3Profile = buildLSP3Metadata(formData);

    // Call the onSubmit function with the LSP3 metadata object
    // onSubmit(lsp3Profile);
  };

  const buildLSP3Metadata = (formData) => {
    // Implement the logic to construct the LSP3 metadata object from formData
    // Similar to what we discussed earlier in a separate function
    // Return the constructed metadata object
  };

  return (
    <div>
         <form id="profile-form">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        /><br />

        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        /><br />

        <label htmlFor="tags">Tags (comma-separated):</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
        /><br />

        <label htmlFor="links">Links (title,url;title,url):</label>
        <input
          type="text"
          id="links"
          name="links"
          value={formData.links}
          onChange={handleChange}
        /><br />

        <label htmlFor="avatar-url">Avatar URL:</label>
        <input
          type="text"
          id="avatar-url"
          name="avatar-url"
          value={formData['avatar-url']}
          onChange={handleChange}
        /><br />

        <button type="button" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default LSP3MetadataForm;



export { LSP3MetadataForm };