// initial code from: https://codefrontend.com/file-upload-reactjs/
import { TextareaAutosize, Typography, Box } from '@mui/material';
import { ChangeEvent, useState } from 'react';



function handleSubmit(event) {
  event.preventDefault()

  const inputFilesElement = document.getElementById("inputFiles");
  const inputTextElement = document.getElementById("inputText");

  const formData = new FormData()

  // add the files 
  for (const file of inputFilesElement.files) {
    formData.append("uploaded_files", file);
  }
  // add the text 
  formData.append("uploaded_text", inputTextElement.value)


  const url = "http://localhost:5000/upload"
  fetch(url,
    {
      method: "POST",
      body: formData
    }
  ).then((result) => {
    console.log('Success:', result);

  })
    .catch((error) => {
      console.error('Error:', error);

    });
}




function FileUploadForm() {
  return (
      <form method="POST" enctype="multipart/form-data" onSubmit={handleSubmit}>
        <textarea placeholder='Paste Some Text' id="inputText" />
        <p>OR Upload Some Files:</p>
        <input type="file" id="inputFiles" name="uploaded_files" multiple />
        <input type="submit" value="Upload Data" />
      </form>
  );
}





export default FileUploadForm;
