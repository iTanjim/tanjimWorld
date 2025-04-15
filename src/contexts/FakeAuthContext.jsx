import { createContext, useContext } from "react";

const AuthContext = createContext();

const initialState = {
    user: null,
    isAuthenticated: false
}
function reducer(state, action){
    switch(action.type){
        case 'login':
            return {...state, user:action.payload, isAuthenticated: true}
        case 'logout':
            return {...state, user:null, isAuthenticated}
        default: 
         throw new Error("Unknown action");
    }
}

function AuthProvider({children}){

    const [{user, isAuthenticated}, dispatch] = useReducer(reduceVertices, initialState)

    function login(email, password){

    }
    function logout(){}

    return <AuthContext.Provider value = {{user, isAuthenticated, login, logout}}>
        {children}
    </AuthContext.Provider>
}

function useAuth(){
    const context = useContext(AuthContext);
    if(context === undefined) throw new Error('Authcontext was used outside the AuthProvider');
}