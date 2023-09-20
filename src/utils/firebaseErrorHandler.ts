import { FirebaseError } from "firebase/app";

export const mapFirebaseAuthErrorToMessage = (error: FirebaseError) => {
    switch (error.code) {
        case 'auth/user-not-found':
            return 'User not found. Please check your email or sign up.';
        case 'auth/invalid-login-credentials':
            return 'Incorrect password. Please try again.';
        case 'auth/invalid-email':
            return 'Invalid email address. Please provide a valid email.';
        case 'auth/missing-password':
            return 'password is required';
        default:
            return 'An error occurred. Please try again later.';
    }
}