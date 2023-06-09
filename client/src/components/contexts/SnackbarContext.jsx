import { createContext, useReducer } from "react";

/** SnackbarProvider lets any component display a snackbar / toast message. Very useful for providing the status of things such as an upload or deletion. */
export const SnackbarDataContext = createContext(null)
export const SnackbarDispatchContext = createContext(null)

export function SnackbarProvider({children}) {
    const [snackbarData, dispatch] = useReducer(snackbarReducer, [])

    return (
        <SnackbarDataContext.Provider value={snackbarData}>
          <SnackbarDispatchContext.Provider value={dispatch}>
            {children}
          </SnackbarDispatchContext.Provider>
        </SnackbarDataContext.Provider>
      );


}

export function snackbarReducer(snackbarData, action) {
    console.log("inside snackbarReducer")
    switch (action.type) {
        case 'uploaded': {
            return null
        }
        case 'deleted': {
            return null
        }
        case 'reloaded': {
            return null
        }
        default: {
            throw Error('Unknown action in the snackbar reducer.');
        }
    }
}