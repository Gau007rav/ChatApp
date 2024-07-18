import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import { useEffect, useState,useContext } from "react";
import { getSender } from "../../Config/ChatLogic";
import { ChatContext } from "../../context/chatProvider";
//import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Button } from "@chakra-ui/button";
import GroupChatModal from "../mixedComponents/GroupChatModel";
//import { ChatState } from "../../context/chatProvider";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, SetChats } = useContext(ChatContext);

  const toast = useToast();

  const fetchChats = async () => {
    
    try {
      let config = {
        method:"GET",
        headers: {
          "Content-type": "application/json",
            Authorization: `Bearer Bearer ${user.token}`,
        },
       
      };
      let res = await fetch("http://localhost:9000/api/chat" ,config)
      let data = await res.json();
      console.log(data)
      SetChats(data)
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.message,
        status: "failed to load the chat",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
 
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
      fetchChats();
    // eslint-disable-next-line
  }, [ fetchAgain]);

  return (
    <>
      <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
        <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
          </GroupChatModal>
        </Box>
        <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="white"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              > 
              <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
              </Box>
              ))}
              </Stack>
              ) : (
                <ChatLoading />
              )}
        </Box>
        </Box>
        
    </>
   
  );
};

export default MyChats;