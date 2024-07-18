import React, { useState } from 'react'
import axios from "axios"
import { useHistory } from "react-router-dom"
import {
    FormControl,
    FormLabel,
    Input,
    VStack, Button, InputGroup, InputRightElement,useToast
} from '@chakra-ui/react'
const Login = () => {

    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    const [show, setShow] = useState(false);
    let toast=useToast()
    let history = useHistory()
    const handleClick = () => setShow(!show);
    const submitHandler = async () => {
        
        if (!email || !password) {
          toast({
            title: "Please Fill all the Feilds",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          
          return;
        }
    
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
    
          const { data } = await axios.post(
            "http://localhost:9000/api/user/login",
            { email, password },
            config
          );
    
          toast({
            title: "Login Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          
          localStorage.setItem("userInfo", JSON.stringify(data));
          
          history.push("/chats");
        } catch (error) {
          toast({
            title: "Error Occured!",
            description: error.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
         
        }
      };



    return (
        <div>
            <VStack spacing="10px">
                <FormControl id="email" isRequired>
                    <FormLabel>Email Address</FormLabel>
                    <Input
                        value={email}
                        type="email"
                        placeholder="Enter Your Email Address"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
                <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup size="md">
                        <Input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={show ? "text" : "password"}
                            placeholder="Enter password"
                        />
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={handleClick}>
                                {show ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <Button
                    colorScheme="blue"
                    width="100%"
                    style={{ marginTop: 15 }}
                onClick={submitHandler}
                //isLoading={loading}
                >
                    Login
                </Button>
                <Button
                    variant="solid"
                    colorScheme="red"
                    width="100%"
                    onClick={() => {
                        setEmail("guest@example.com");
                        setPassword("123456");
                    }}
                >
                    Get Guest User Credentials
                </Button>
            </VStack>
        </div>
    )
}

export default Login

//pass : IC4fLGjkjjneVPLZ