import { createContext,  useState } from "react";

/** FileListProvider combines a reducer and a context together, in order to let any component dispatch an update to the displayed download file list. */


export const DragAndDropFileListContext = createContext(null)
export const SetDragAndDropFileListContext = createContext(null)

export function DragAndDropFileListProvider({children}) {
    const [dragAndDropFileList, setDragAndDropFileList] = useState([])
    
    return (
        <DragAndDropFileListContext.Provider value={dragAndDropFileList}>
          <SetDragAndDropFileListContext.Provider value={setDragAndDropFileList}>
            {children}
          </SetDragAndDropFileListContext.Provider>
        </DragAndDropFileListContext.Provider>
      );


}

// export function fileListReducer(fileMetadataArr, action) {
//     console.log(action)
//     switch (action.type) {
//         case 'uploaded': {
//             return [...fileMetadataArr, ...action.uploadedFileMetadataArr]
//         }
//         case 'deleted': {
//             return fileMetadataArr.filter((fileMetadata) => fileMetadata.filename !== action.deletedFilename)
//         }
//         case 'reloaded': {
//             return action.fileMetadataArr
//         }
//         default: {
//             throw Error('Unknown action in the fileMetadataArr reducer.');
//         }
//     }
// }