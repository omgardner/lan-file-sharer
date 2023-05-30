// initial code from: https://codefrontend.com/file-upload-reactjs/
import { TextareaAutosize, Typography, Box } from '@mui/material';
import { ChangeEvent, useState } from 'react';









function FileUploadForm() {

  // note: since an empty FileList can't be constructed I've used an empty as the default state value. This is because both support 
  //  (a) the .length property and 
  //  (b) are iterable using a for...of loop

  const [inputTagFileList, setInputTagFileList] = useState([])
  const [droppedFileList, setDroppedFileList] = useState([])
  const [inputText, setInputText] = useState("")

  function handleSubmit(event) {
    // stops the page from being redirected
    event.preventDefault()

    // creates form data to be submitted with the AJAX HTTP POST request as it's body content
    const formData = new FormData()

    // add the files from both possible methods of adding files
    for (const file of inputTagFileList) {
      formData.append("uploaded_files", file);
    }

    for (const file of droppedFileList) {
      formData.append("uploaded_files", file);
    }


    // add the text if any
    // note: i'm starting to see the benefit of using typescript
    if (typeof inputText !== 'undefined' && inputText.length > 0) {
      formData.append("uploaded_text", inputText)
    }
    

    // AJAX HTTP POST request
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

      event.target.reset()

      // the form gets reset but the state variables need to be updated as well (since the onchange doesn't trigger from the reset)
      setInputText("")
      setInputTagFileList([])
      setDroppedFileList([])
  }



  function handleInputTextChange(event) {
    // Nullish coalescing operator, if the left hand side of ?? is null or undefined then return the right hand side
    setInputText(event.target.value ?? "")
  }

  function handleDroppedFilesChange(event) {
    // stops the dragged file from redirecting the page once dropped
    event.preventDefault()

    // sets a FileList
    // an empty FileList if none of the dragged items were files

    // Nullish coalescing operator
    setDroppedFileList(event.dataTransfer.files ?? [])
  }

  function handleInputFilesChange(event) {

    // Nullish coalescing operator
    // this prevents bugs when event.target.files is undefined
    setInputTagFileList(event.target.files ?? [])
  }

  function onDragOver(event) {
    // stops the dragged file from redirecting the page once dropped
    event.preventDefault()
    console.log("Hi there!")
  }




  return (
    <div
      id="target"
      onDrop={handleDroppedFilesChange}
      onDragOver={onDragOver}
    >
      <form method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
        <textarea 
        onInput={handleInputTextChange} 
        placeholder='Paste or Type Some Text'
        style={{resize: 'none'}}
        ></textarea>
        <p>OR Upload Some Files:</p>
        <input type="file" name="uploaded_files" multiple onChange={handleInputFilesChange}/>
        <input type="submit" value="Upload Data" />
      </form>
      <p>Total Files to be uploaded: {inputTagFileList.length + droppedFileList.length}</p>
      <p>Any text to be uploaded? {inputText.length > 0 ? 'yes' : 'no'}</p>
    </div>
  );
}


//<input type="text" placeholder='Paste Some Text' id="inputText" onChange={handleInputTextChange}/>


export default FileUploadForm;
