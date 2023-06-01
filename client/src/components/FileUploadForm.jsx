// initial code from: https://codefrontend.com/file-upload-reactjs/
import { TextareaAutosize, Typography, Box, Grid, Button } from '@mui/material';
import { ChangeEvent, useContext, useEffect, useReducer, useState } from 'react';
import { SERVER_URL } from '../config';
import { FileListDispatchContext } from './FileContext';


function FileUploadForm() {
  const dispatch = useContext(FileListDispatchContext)


  // note: since an empty FileList can't be constructed I've used an empty array as the default state value instead. This is sufficient for my use case because both support 
  //  (a) the .length property and 
  //  (b) iteration using a for...of loop
  const [inputTagFileList, setInputTagFileList] = useState([])
  const [droppedFileList, setDroppedFileList] = useState([])
  const [fileQueueCount, setFileQueueCount] = useState(0)
  const [inputText, setInputText] = useState("")

  // change the file count anytime either of the file lists get changed
  useEffect(() => {
    setFileQueueCount(inputTagFileList.length + droppedFileList.length)

  }, [handleInputFilesChange, handleDroppedFilesChange])

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
    // note: i'm starting to see the benefit of using typescript across this whole component
    if (typeof inputText !== 'undefined' && inputText.length > 0) {
      formData.append("uploaded_text", inputText)
    }


    // AJAX HTTP POST request
    fetch(SERVER_URL + "/upload",
      {
        method: "POST",
        body: formData
      }
    )
      .then((result) => result.json())
      .then((data) => {
        // returns the metadata for the files that have been added, so that the file list can be updated locally without another /api call
        console.log('Successful upload, updating the file list');
        dispatch({ type: 'uploaded', uploadedFileMetadataArr: data })
      })
      .catch((error) => {
        console.error('Error:', error);
      })

    // // reset the form
    document.getElementById("txtInput").value = ""

    // the form gets reset but the state variables need to be updated as well (since the onchange event doesn't trigger from the reset)
    setInputText("")
    setInputTagFileList([])
    setDroppedFileList([])
    setFileQueueCount(0)
  }



  function handleInputTextChange(event) {
    // Nullish coalescing operator, if the left hand side of ?? is null or undefined then return the right hand side
    setInputText(event.target.value ?? "")
  }

  function handleDroppedFilesChange(event) {
    // stops the dragged file from redirecting the page once dropped
    event.preventDefault()

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
    <Box
      onDrop={handleDroppedFilesChange}
      onDragOver={onDragOver}
      sx={{ display: 'flex', flexDirection: 'row', padding: 2 }}>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', padding: 2 }}>
        <textarea
          id="txtInput"
          onInput={handleInputTextChange}
          placeholder='Paste or Type Some Text'
          style={{ resize: 'none' }}
        ></textarea>
        <Box minWidth={64} minHeight={64} sx={{ backgroundColor: "#999999" }}>
          <label htmlFor="uploaded_files" style={{ width: '100%', height: '100%', display: 'inline-block', textAlign: "center" }}>Upload Some Files</label>
        </Box>

        <input
          id="uploaded_files"
          type="file"
          name="uploaded_files"
          multiple
          onChange={handleInputFilesChange}
          style={{ display: 'none' }}
        />
      </Box>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 2 }}
      >
        {fileQueueCount > 0 ? (<p>{fileQueueCount} File(s) Queued</p>) : (<></>)}
        <Button variant="contained" onClick={handleSubmit} >Upload Data</Button>
        {inputText.length > 0 ? (<p>Text Queued</p>) : (<></>)}
      </Box>
    </Box>
  );
}


//<input type="text" placeholder='Paste Some Text' id="inputText" onChange={handleInputTextChange}/>


export default FileUploadForm;






/* <Grid container>
      <form method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
        <Box
          id="target"
          onDrop={handleDroppedFilesChange}
          onDragOver={onDragOver}
          sx={{ display: 'flex', flexDirection: 'row' }}
          xs={4}
        >

          <textarea
            onInput={handleInputTextChange}
            placeholder='Paste or Type Some Text'
            style={{ resize: 'none' }}
          ></textarea>
          <input type="file" name="uploaded_files" multiple onChange={handleInputFilesChange} />
        </Box>

        <Box
          sx={{ display: 'flex', flexDirection: 'column' }}
          xs={6}
        >
          {fileQueueCount > 0 ? (<p>{fileQueueCount} File(s) Queued</p>) : (<></>)}
          <input type="submit" value="Upload Data" />
          {inputText.length > 0 ? (<p>Text Queued</p>) : (<></>)}
        </Box>
      </form>
    </Grid> */