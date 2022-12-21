import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Link,
  Input,
  Text,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import useInput from "../hooks/useInput";
import { postRequest } from "../services/makeHTTPRequest";
import { useMutation } from "@tanstack/react-query";

const Login = () => {
  const [show, setShow] = useState(false);
  const [emailValue, emailBind] = useInput("");
  const [passwordValue, passwordBind] = useInput("");

  const loginUser = useMutation({
    mutationFn: postRequest,
    onSuccess: (response) => {
      console.log(response);
      localStorage.setItem("user", JSON.stringify(response.data));
      window.location.href = "/create";
    },
  });

  const loginUserFunction = (e) => {
    e.preventDefault();
    loginUser.mutate({
      url: "au/login",
      body: { email: emailValue, password: passwordValue },
    });
  };

  const authError = loginUser.error?.response.data.error;
  let incorrectEmail;
  let incorrectPassword;

  const compareAuthErrors = () => {
    if (authError?.localeCompare("Incorrect email") === 0) {
      incorrectEmail = authError;
    }
    if (authError?.localeCompare("Incorrect password") === 0) {
      incorrectPassword = "Incorrect password";
    }
  };
  compareAuthErrors();

  const handleClick = () => setShow(!show);
  return (
    <Container maxW="5xl">
      <Box
        as="form"
        mt={{ base: "20%", md: "20%", lg: "5%" }}
        maxW="400px"
        mx="auto"
        onSubmit={loginUserFunction}
      >
        <FormControl mb={4} isInvalid={incorrectEmail}>
          <FormLabel>Email</FormLabel>
          <Input type="email" {...emailBind} />

          {incorrectEmail && (
            <FormErrorMessage>{incorrectEmail}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl mb={10} isInvalid={incorrectPassword}>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              {...passwordBind}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                variant="ghost"
                _active={{ bgColor: "none" }}
                onClick={handleClick}
              >
                {show ? <ViewOffIcon /> : <ViewIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>

          {incorrectPassword && (
            <FormErrorMessage>{incorrectPassword}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl mb={4}>
          <Button
            display="inline-block"
            w="100%"
            type="submit"
            colorScheme="blue"
          >
            Log in account
          </Button>
        </FormControl>
        <Text>
          Doesnt have an account?
          <Link as={RouterLink} to="/signup" ps={2} textDecoration="underline">
            Sign up
          </Link>
        </Text>
      </Box>
    </Container>
  );
};

export default Login;
