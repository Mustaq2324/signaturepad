import React, { useRef, useState, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import html2canvas from 'html2canvas';

const fontOptions = [
  'Arial',
  'Times New Roman',
  'Courier New',
  'Georgia',
  'Verdana',
  'Comic Sans MS',
  'Impact',
  'Trebuchet MS',
  'Palatino',
  'Lucida Sans Unicode',
  // Add more fonts as needed
];

const SignaturePad = ({ onSave }) => {
  const signatureRef = useRef();
  const [penColor, setPenColor] = useState('black'); // Initial pen color
  const [fontName, setFontName] = useState('Arial'); // Initial font name
  const [typedText, setTypedText] = useState('');

  const handleSave = async () => {
    const canvas = signatureRef.current.getCanvas();
    const signatureImage = canvas.toDataURL('image/png');
    onSave(signatureImage);
  };
  

  const handleReset = () => {
    signatureRef.current.clear();
    setTypedText('');
  };

  const handleColorChange = (event) => {
    setPenColor(event.target.value);
  };

  const handleFontChange = (event) => {
    setFontName(event.target.value);
  };

  const handleTextChange = (event) => {
    setTypedText(event.target.value);
  };

  useEffect(() => {
    // Use the SignatureCanvas API to draw the text on the canvas
    const canvas = signatureRef.current.getCanvas();
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the text on the canvas with the current font and color
    context.font = `24px ${fontName}`;
    context.fillStyle = penColor;
    context.fillText(typedText, 10, 30);
  }, [penColor, fontName, typedText]);

  return (
    <div className="flex flex-col items-center justify-center pb-10 h-[100vh] ">
         <h1 className='text-3xl mb-3 font-bold'>React Signature Pad</h1>
      <div className="bg-white  rounded-md shadow-md mx-auto pb-10 p-4">
      <SignatureCanvas
  ref={signatureRef}
  penColor={penColor}
  canvasProps={{
    height: 200,
    className: 'border border-gray-300 rounded-md mx-auto w-[300px] lg:w-full',
    style: { fontFamily: fontName, backgroundColor: 'transparent' },
  }}
/>

        <div className="flex flex-col justify-center gap-6 lg:flex-row items-center space-x-4 mt-4">
          <input
            type="color"
            value={penColor}
            onChange={handleColorChange}
            className="w-10 h-10 border border-gray-300 rounded-full"
          />
          <select
            value={fontName}
            onChange={handleFontChange}
            className="border border-gray-300 p-2 rounded"
          >
            {fontOptions.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Type your text"
            value={typedText}
            onChange={handleTextChange}
            className="border border-gray-300 p-2 rounded flex-grow"
          />
        </div>
        <div className="flex  justify-center   mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleSave}
          >
            Save Signature
          </button>
          <button
            className="bg-gray-300 text-black px-4 py-2 ml-2 rounded hover:bg-gray-400"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignaturePad;
