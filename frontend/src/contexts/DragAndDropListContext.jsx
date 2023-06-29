import { createContext,  useState } from "react";

/** 
 * DragAndDropFileListProvider provides context values for when a file is dragged from a GUI file browser and dropped into the web browser 
 * 
 * The contexts are used by the FileDragAndDropDialog and FileUploadForm components.
 * */


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
