
import {createContext,useContext,useState,useEffect} from "react";
import { useHistory } from "react-router-dom";
export let ChatContext = createContext();


let ChatProvider = ({children}) =>{
    let[user,setUser]=useState(null)
    let[chats,SetChats] = useState([])
    const [selectedChat, setSelectedChat] = useState();
    let history = useHistory()

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        console.log(userInfo)
        setUser(userInfo);
    
        if (!userInfo) {
            history.push("/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [history]);
    return(
    <ChatContext.Provider value={{user,setUser,chats,SetChats,selectedChat, setSelectedChat}}>
      {children}
    </ChatContext.Provider>
    )
}

//export const ChatState = () => {
 //   return useContext(ChatContext);
 // };
export default ChatProvider;