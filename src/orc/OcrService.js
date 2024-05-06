import React, { useState,useEffect } from 'react';
import Tesseract from 'tesseract.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const styles = {
  container: {
    backgroundColor: 'none',
    padding: '5%',
    borderRadius: '5px',
  }
};

const OCRService = () => {

  const [image, setImage] = useState(null);
  const [recognizedText, setRecognizedText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        setRecognizedText(' ');
      } catch (error) {
        console.error('Error =>> ', error);
      }
    };

    init();
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const recognizeText = async () => {
    setRecognizedText(null);
    setLoading(true);
    Tesseract.recognize(
      image,
      'eng+mya',
      { logger: (m) => console.log(m) } 
    ).then(({ data: { text } }) => {
      setRecognizedText(text);
      setLoading(false);
    }).catch((error) => {
      console.error('OCR Error:', error);
      setLoading(false);
    });
  };

  const ClearText = () =>{
    setRecognizedText('');
  }
  return (
    <div style={styles.container}>
      <div>
        <h1>OCR Tool</h1>
        <br/>
        <input type="file" accept="image/*" onChange={handleImageChange} className="form-control" style={{width: '25%',position: 'absolute'}}/>
        &nbsp;
        <button onClick={recognizeText} disabled={!image || loading} className="btn btn-primary" style={{width: '15%',position: 'left'}}>
            {loading ? 'Recognizing...' : 'Recognize Text'}
        </button>
        &nbsp;
        <button onClick={ClearText} disabled={!recognizedText} className="btn btn-primary" style={{width: '20%',position: 'left'}}>
            Clear 
        </button>
      </div>
      {recognizedText && (
        <div className="mb-3">
          <br/>
          <br/>
          <h2>Recognized Text:</h2>           
            <textarea className="form-control" rows="10">{recognizedText}</textarea>
        </div>
      )}
    </div>
  );
};

export default OCRService;
