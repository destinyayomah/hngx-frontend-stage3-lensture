import { VStack, useDisclosure } from '@chakra-ui/react'
import './App.css'
import Navbar from './components/Navbar'
import Search from './components/Search'
import { useState } from 'react';
import PictureList from './components/PictureList';
import { database } from './services/firebaseConfig';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { mapFirebaseAuthErrorToMessage } from './utils/firebaseErrorHandler';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const signIn = (email: string, password: string) => {
    setShowSpinner(true);

    signInWithEmailAndPassword(database, email, password).then(() => {
      setLoggedIn(true);
      setShowSpinner(false);
      onClose();
    }).catch((err) => {
      alert(mapFirebaseAuthErrorToMessage(err));
      setShowSpinner(false);
    });
  };

  const LogOut = () => {
    signOut(database).then(() => {
      setLoggedIn(false);
    }).catch(err => {
      alert(err.message);
    });
  };

  const handleInputChange = (query: string) => setSearchQuery(query);

  return <>
    <VStack bg='black' minHeight='100vh' paddingBottom='50px'>
      <Navbar
        loggedIn={loggedIn}
        signIn={signIn}
        logout={LogOut}
        showSpinner={showSpinner}
        onOpen={onOpen}
        onClose={onClose}
        isOpen={isOpen}
      />
      <Search handleInputChange={handleInputChange} />
      <PictureList loggedIn={loggedIn} searchQuery={searchQuery} />
    </VStack>
  </>
}

export default App
