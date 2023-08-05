import { SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signup = async (email, password) => {
        try {
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            setCurrentUser(userCredential.user);
            return userCredential.user; // Return the user object after signup.
        } catch (error) {
            console.error('Error signing up:', error);
            throw error; // Rethrow the error to handle it at the component level if needed.
        }
    };

    const login = async (email, password) => {
        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            setCurrentUser(userCredential.user);
            return userCredential.user; // Return the user object after login.
        } catch (error) {
            console.error('Error signing in:', error);
            throw error; // Rethrow the error to handle it at the component level if needed.
        }
    }

    const value = {
        currentUser,
        signup,
        login
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}