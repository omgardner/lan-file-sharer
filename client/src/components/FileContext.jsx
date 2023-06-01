import { createContext, useReducer } from "react";

export const FileListContext = createContext()
export const FileListDispatchContext = createContext(null)

export function FileListProvider({children}) {
    const [fileMetadataArr, dispatch] = useReducer(fileListReducer, [])

    return (
        <FileListContext.Provider value={fileMetadataArr}>
          <FileListDispatchContext.Provider value={dispatch}>
            {children}
          </FileListDispatchContext.Provider>
        </FileListContext.Provider>
      );


}


export function fileListReducer(fileMetadataArr, action) {
    console.log("inside fileListReducer")
    console.log(fileMetadataArr, action)
    switch (action.type) {
        case 'uploaded': {
            return [...fileMetadataArr, ...action.uploadedFileMetadataArr]
        }
        case 'deleted': {
            console.log("debug deleted")
            console.log(action.deletedFilename)
            console.log(fileMetadataArr)
            return fileMetadataArr.filter((fileMetadata) => fileMetadata.filename !== action.deletedFilename)
        }
        case 'reloaded': {
            return action.fileMetadataArr
        }
        default: {
            throw Error('Unknown action in the fileMetadataArr reducer.');
        }
    }
}