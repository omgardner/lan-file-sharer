// initial code from: https://codefrontend.com/file-upload-reactjs/
import { Typography } from '@mui/material';
import { ChangeEvent, useState } from 'react';

function FileUploadForm() {
  const url = "http://localhost:5000/upload"

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData()

    const inputFilesElement = document.getElementById("files");

    for (const file of inputFilesElement.files) {
      formData.append("uploaded_files", file);
    }

    console.log(inputFilesElement.files)

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


  return (
    <form method="POST" enctype="multipart/form-data" onSubmit={handleSubmit}>
      <input type="file" name="uploaded_files" multiple id="files" />
      <input type="submit" />
    </form>
  );
}





export default FileUploadForm;
