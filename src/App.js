
import React from 'react';
import SignaturePad from './Components/Signaturepad';
const App = () => {
  const handleSave = (imageData) => {
    // Create a download link for the image
    const link = document.createElement('a');
    link.href = imageData;
    link.download = 'signature.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
     
      <SignaturePad onSave={handleSave} />
    </div>
  );
};

export default App;
