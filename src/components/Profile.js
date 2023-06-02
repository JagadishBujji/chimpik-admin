import React, { useState } from 'react';
import Dropzone from 'react-dropzone';

const ProfileCard = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleImageUpload = (acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
  };

  return (
    <>
      {selectedFile && (
        <div>
          {/* <p>Profile</p> */}
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Selected file"
            style={{ borderRadius: '50%', width: '200px', height: '200px', margin: 'auto', border: '3px solid #000' }}
          />
        </div>
      )}
      <Dropzone onDrop={handleImageUpload}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} style={{ position: 'relative' }}>
            <input {...getInputProps()} />
            <p>
              <img
                src="../images/dslr-camera.png"
                alt=""
                style={{ width: '50px', height: '50px', position: 'absolute', bottom: '25px', right: '50px' }}
              />
            </p>
          </div>
        )}
      </Dropzone>
    </>
  );
};

export default ProfileCard;
