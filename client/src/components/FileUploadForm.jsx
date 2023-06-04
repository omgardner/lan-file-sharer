// initial code from: https://codefrontend.com/file-upload-reactjs/
import { TextareaAutosize, Typography, Box, Grid, Button, Card, TextField, Input, styled } from '@mui/material';
import { ChangeEvent, useContext, useEffect, useReducer, useState } from 'react';
import { SERVER_URL } from '../config';
import { FileListDispatchContext } from './FileContext';







// DEBUG
const CustomTextarea = styled("textarea")(
  ({ theme }) => `
  resize: none;
  border: none;
  outline: none;  

  ::placeholder {
    text-align: center;
    opacity: 0.6;
    font-family: ${theme.typography.fontFamily};
    
  };
  `
)




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
    // the placeholder text for the textarea is faked, so some custom logic is needed to imitate the textarea being reset
    document.getElementById("txtInput").hidden = true
    document.getElementById("txtInputPlaceholder").hidden = false

    // resetting the value of the state variables
    setInputTagFileList([])
    setDroppedFileList([])
    setFileQueueCount(0)
  }



  function handleInputTextChange(event) {
    const newInputText = event.target.value

    // Nullish coalescing operator, if the left hand side of ?? is null or undefined then return the right hand side
    setInputText(newInputText ?? "")
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
  }



  function handleTextareaFocus() {
    const txtInputEle = document.getElementById("txtInput")
    const txtInputPlaceholderEle = document.getElementById("txtInputPlaceholder")
    txtInputEle.hidden = false
    txtInputPlaceholderEle.hidden = true
    txtInputEle.focus()
  }

  function handleTextareaUnfocus() {
    console.log("handleTextareaUnfocus")
    console.log(inputText)
    const txtInputEle = document.getElementById("txtInput")
    const txtInputPlaceholderEle = document.getElementById("txtInputPlaceholder")

    const isEmpty = inputText.length === 0

    // if it's not empty, keep showing the textarea and hide the placeholder
    // if it's not empty, hide the textarea and show the placeholder
    txtInputEle.hidden = isEmpty
    txtInputPlaceholderEle.hidden = !isEmpty
  }


  return (

    <Grid container columns={12}
      onDrop={handleDroppedFilesChange}
      onDragOver={onDragOver}
      height="130px"

    >
      <Grid item xs={5} padding={2} height="100%">
        <Card
          sx={{
            width: '100%', height: "100%",
            display: "flex", justifyContent: "center", alignItems: "center"
          }}
          onClick={handleTextareaFocus}
        >
          <CustomTextarea
            id="txtInput"
            hidden={true}
            onInput={handleInputTextChange}
            onBlur={handleTextareaUnfocus}
            style={{ width: "100%", height: "100%" }}

          ></CustomTextarea>
          <Typography id="txtInputPlaceholder" variant="subtitle1" sx={{ textAlign: "center", opacity: 0.6 }}>Paste or Type Some Text</Typography>
        </Card>

      </Grid>
      <Grid item xs={5} padding={2} height="100%">
        <Card sx={{ height: "100%", width: "100%", backgroundColor: "#FFFFFF" }}>
          <label htmlFor="uploaded_files" style={{ width: '100%', height: '100%', display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="subtitle1" sx={{ textAlign: "center", opacity: 0.6 }}>Upload Some Files</Typography>
          </label>
          <input
            id="uploaded_files"
            type="file"
            name="uploaded_files"
            multiple
            onChange={handleInputFilesChange}
            style={{ display: 'none' }}
          />
        </Card>
      </Grid>

      <Grid item xs={2} padding={2} height="100%">
        <Card sx={{ height: "100%", width: "100%", backgroundColor: "#eeeeee", display: "flex", flexDirection: "column" , justifyContent: "center", alignItems: "center" }}> 
        
        {inputText.length > 0 ? (<Typography>Text Queued</Typography>) : (<Typography style={{ opacity: 0 }}>No Text Queued</Typography>)}
        <Button variant="contained" onClick={handleSubmit} >Upload Data</Button>
        {fileQueueCount > 0 ? (<Typography>{fileQueueCount} File(s) Queued</Typography>) : (<Typography style={{ opacity: 0 }}>No Files Queued</Typography>)}
          
        </Card>
      </Grid>

    </Grid>




  );
}

export default FileUploadForm;
