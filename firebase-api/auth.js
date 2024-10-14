import { createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import { auth, db } from "../configs/FirebaseConfig";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import { useToast } from "react-native-toast-notifications";

// Exportable sign-up function
export const signUpWithEmail = async (email, password, fullName) => {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store additional user details (fullName) in Firestore
    const userDocRef = doc(db, "users", user.uid); // Assuming users collection
    await setDoc(userDocRef, {
      uid: user.uid,
      email: user.email,
      fullName: fullName, 
      createdAt: new Date(),
    });

    return user;
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      throw new Error("This email is already registered. Please log in or use a different email.");
    } else {
      console.error("Error during sign-up:", error.message);
      throw error; // Re-throw other errors
    }
  }
};

// Exportable sign-in function
export const signInWithEmail = async (email, password) => {
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      return user;
    } catch (error) {
      console.error('Error signing in:', error.message, error.code);
      throw error;
    }
};

export const getUserDataFromFirestore = async (uid) => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      return userDoc.data(); 
    } else {
      throw new Error("User does not exist");
    }
  } catch (error) {
    console.error("Error fetching user data from Firestore:", error.message);
    throw error;
  }
};

