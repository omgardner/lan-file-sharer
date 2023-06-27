import { createContext, useReducer } from "react";

/** FileListProvidercombines a reducer and a context together, in order to let any component dispatch an update to the displayed download file list. */


export const FileListContext = createContext(null)
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
    console.log(action)
    switch (action.type) {
        case 'uploaded': {
            return [...fileMetadataArr, ...action.uploadedFileMetadataArr]
        }
        case 'deleted': {
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