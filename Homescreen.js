import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Rooms from '../components/Rooms';

export default function Homescreen() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/taj/getallrooms');
        console.log(response, 'response');
        setRooms(response.data);
      } catch (error) {
        console.log('Error in home screen', error);
      }
    };

    fetchData();
  }, []); 

  const handleButtonClick = async (e) => {
    e.preventDefault();
    const fileInput = document.querySelector('input[type="file"]');
    const selectedFile = fileInput.files[0];

    if (selectedFile) {
      console.log('Selected file:', selectedFile);

      const formData = new FormData();
      formData.append('fileupload', selectedFile);

      try {
        const response = await axios.post('http://localhost:5000/multer/multer', formData);
        console.log(response);
        const response2 = await axios.put('http://localhost:5000/taj/create', {image: response.data.name});

      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      console.log('No file selected');
    }
  };

  return (
    <>
      <form>
        <h1>This is home screen</h1>
        <input type='file' />
        <button onClick={handleButtonClick}>Click</button>
        <img src={'http://localhost:5000/getpic/asad.png'} />
      </form>
    </>
  );
}
