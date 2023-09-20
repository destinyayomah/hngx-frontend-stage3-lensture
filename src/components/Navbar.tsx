import { Box, Button, HStack, Image, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Show, Spinner, Text } from "@chakra-ui/react"
import logo from '../assets/logo.png';
import { EmailIcon, LockIcon } from '@chakra-ui/icons'
import { useState } from "react";

interface Props {
    loggedIn: Boolean,
    signIn: (email: string, password: string) => void,
    logout: () => void,
    showSpinner: Boolean,
    onClose: () => void,
    onOpen: () => void,
    isOpen: boolean
}

const Navbar = ({ loggedIn, signIn, logout, showSpinner, onOpen, onClose, isOpen }: Props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return <>
        <HStack justifyContent='space-between' width='90%' padding='15px 0'>
            <HStack>
                <Image src={logo} width='60px' height='60px' />
                <Show above="sm">
                    <Text fontSize='36' fontWeight='600' color='white'>Lensture</Text>
                </Show>
            </HStack>

            {!loggedIn && <Button
                color='white'
                borderRadius='30px'
                bgGradient='linear(to-r, #E1662C, #D04D22)'
                _hover={{ bg: '#E89067', color: '#E8E8E8' }}
                onClick={onOpen}
            >
                Sign In
            </Button>}

            {loggedIn && <Button
                color='#D04D22'
                borderRadius='30px'
                bg='transparent'
                border='1px solid #D04D22'
                _hover={{ bg: '#D04D22', color: 'white' }}
                onClick={logout}
            >
                Logout
            </Button>}
        </HStack>

        <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent bgGradient='linear-gradient(to-r, #E1662C, #FF9330)' borderRadius='30px'>
                <ModalCloseButton />
                <ModalHeader display='block' textAlign='center' fontSize='42px' color='white'>
                    <Text>SIGN IN</Text>
                    <Box width='30px' height='5px' bg='white' margin='0 auto'></Box>
                </ModalHeader>
                <ModalBody>
                    <Text color='white' width='100%' textAlign='center'>Enter your login details to use drag and drop feature.</Text>
                    <InputGroup marginTop='30px'>
                        <InputLeftElement>
                            <EmailIcon color='white' />
                        </InputLeftElement>
                        <Input
                            color='white'
                            placeholder="Email"
                            _placeholder={{ color: 'white' }}
                            _focus={{ boxShadow: 'none', borderColor: 'white' }}
                            onChange={(e) => setEmail(e.currentTarget.value)}
                        />
                    </InputGroup>

                    <InputGroup marginTop='15px'>
                        <InputLeftElement>
                            <LockIcon color='white' />
                        </InputLeftElement>
                        <Input
                            color='white'
                            placeholder="Password"
                            _placeholder={{ color: 'white' }}
                            _focus={{ boxShadow: 'none', borderColor: 'white' }}
                            onChange={(e) => setPassword(e.currentTarget.value)}
                            type="password"
                        />
                    </InputGroup>

                    <Button marginTop='30px' width='100%' onClick={() => signIn(email, password)} isDisabled={showSpinner ? true : false} >
                        {showSpinner && <Spinner />} Login
                    </Button>

                </ModalBody>

                <ModalFooter></ModalFooter>
            </ModalContent>
        </Modal>
    </>
}

export default Navbar;