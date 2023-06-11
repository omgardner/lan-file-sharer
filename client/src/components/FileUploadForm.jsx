import { Typography, Grid, Button, Card } from '@mui/material';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../config';


function FileUploadForm() {
  /** Component contains all UI elements for uploading files and text to the server
   *  
   * It is heavily modified from the starting code, sourced from: https://codefrontend.com/file-upload-reactjs/
   */
  

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

    // files from the file-browser menu, when clicking on the file upload card
    for (const file of inputTagFileList) {
      formData.append("uploaded_files", file);
    }

    // drag & drop files, when ... dragging a file from the desktop or a GUI file explorer and dropping the files into the file upload card 
    for (const file of droppedFileList) {
      formData.append("uploaded_files", file);
    }

    // adds text to the form as well if there is any
    if (inputText.length > 0) {
      formData.append("uploaded_text", inputText)
    }

    // AJAX HTTP POST request
    fetch(SERVER_URL + "/upload",
      {
        method: "POST",
        body: formData
      }
    ).then(() => {
        // returns the metadata for the files that have been added, so that the file list can be updated locally without another /api call

        // the placeholder text for the textarea is faked, so some custom logic is needed to imitate the textarea being reset
        document.getElementById("txtInput").value = ""

        // changing the value doesn't trigger the onInput event, so we're manually setting the new state
        setInputText("")

        document.getElementById("txtInput").hidden = true
        document.getElementById("txtInputPlaceholder").hidden = false

        // resetting the value of the state variables
        setInputTagFileList([])
        setDroppedFileList([])
        setFileQueueCount(0)
      })
      .catch((error) => {
        console.error('Error:', error);
      })


  }



  function handleInputTextChange(event) {
    const newInputText = event.target.value

    // Nullish coalescing operator, if the left hand side of ?? is null or undefined then return the right hand side
    setInputText(newInputText ?? "")
  }

  function handleDroppedFilesChange(event) {
    // stops the dragged file from redirecting the page once dropped
    event.preventDefault()

    setDroppedFileList(event.dataTransfer.files ?? [])
  }

  function onDragOver(event) {
    // stops the dragged file from redirecting the page once dropped
    event.preventDefault()
  }

  function handleInputFilesChange(event) {
    // this prevents bugs when event.target.files is undefined
    setInputTagFileList(event.target.files ?? [])
  }

  function handleTextareaFocus() {
    // the entire goal behind this is to imitate a textinput's placeholder text but to style the text however I want (horizontally and vertically centered)
    const txtInputEle = document.getElementById("txtInput")
    const txtInputPlaceholderEle = document.getElementById("txtInputPlaceholder")

    // when the card is clicked, hide the placeholder text and show the textarea
    txtInputEle.hidden = false
    txtInputPlaceholderEle.hidden = true
    txtInputEle.focus()
  }

  function handleTextareaUnfocus() {
    // the entire goal behind this is to imitate a textinput's placeholder text but to style the text however I want (horizontally and vertically centered)
    const txtInputEle = document.getElementById("txtInput")
    const txtInputPlaceholderEle = document.getElementById("txtInputPlaceholder")

    // when the text area is no longer selected, iff there is no text then hide the textarea and show the placeholder text
    const isEmpty = inputText.length === 0
    txtInputEle.hidden = isEmpty
    txtInputPlaceholderEle.hidden = !isEmpty
  }


  return (

    <Grid container columns={12}
      onDrop={handleDroppedFilesChange}
      onDragOver={onDragOver}
      height="150px"
    >
      <Grid container item xs={6} md={9} >
        <Grid item xs={12} md={6} padding={1} >
          <Card
            sx={{
              width: '100%', height: "100%",
              display: "flex", justifyContent: "center", alignItems: "center"
            }}
            onClick={handleTextareaFocus}
          >
            <textarea
              id="txtInput"
              hidden={true}
              onInput={handleInputTextChange}
              onBlur={handleTextareaUnfocus}
              style={{ width: "100%", height: "100%", resize: "none", border: "none", outline: "none" }}
            ></textarea>
            <Typography id="txtInputPlaceholder" variant="subtitle1" sx={{ textAlign: "center", opacity: 0.6 }}>Paste or Type Some Text</Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} padding={1} >
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
      </Grid>

      <Grid item xs={6} md={3} padding={1} height="100%">
        <Card sx={{ height: "100%", width: "100%", backgroundColor: "#eeeeee", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          {inputText.length > 0 ? (<Typography>Text Queued</Typography>) : (<Typography style={{ opacity: 0 }}>No Text Queued</Typography>)}
          <Button variant="contained" onClick={handleSubmit} sx={{ margin: 1 }} disabled={inputText.length === 0 && fileQueueCount === 0}>Upload Data</Button>
          {fileQueueCount > 0 ? (<Typography>{fileQueueCount} File(s) Queued</Typography>) : (<Typography style={{ opacity: 0 }}>No Files Queued</Typography>)}
        </Card>
      </Grid>
    </Grid>
  );
}

export default FileUploadForm;
