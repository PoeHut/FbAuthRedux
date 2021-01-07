export const updateUser = (user) => {
   return {
        type: 'SET_USER',
        payload: user
   }
}

export const reducer = (state=null, action) => {
    switch(action.type) {
        case 'SET_USER':
            return action.payload
        default: 
            return state
    }
}