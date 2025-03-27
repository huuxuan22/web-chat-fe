import { createUserWithEmailAndPassword, GoogleAuthProvider,FacebookAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "./firebase"
export const doCreateUserWithEmailAndPasssword =async (emal,password) => {
    return createUserWithEmailAndPassword(auth,emal,password);
}
export const doSignInWithGoogle = async () => {
    const provider =new  GoogleAuthProvider();
    const result = await signInWithPopup(auth,provider);
    // result user
    return result.user;
}
export const doSignInWithFaceBook = async () => {
    const provider = new FacebookAuthProvider();
    const result = await signInWithPopup(auth,provider);
    return result.user;
}
export const doSignOut = () => {
    return auth.signOut();
}
