import { Box } from "@chakra-ui/layout";
import { useState,useContext } from "react";
import Chatbox from "./userAvatar/Chatbox";
import MyChats from "./userAvatar/MyChats";
import SideDrawer from "../components/mixedComponents/SideDrawer";
//import { ChatState } from "../context/chatProvider";
import { ChatContext } from "../context/chatProvider";
const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = useContext(ChatContext);
  console.log(user)
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
       {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chatpage;