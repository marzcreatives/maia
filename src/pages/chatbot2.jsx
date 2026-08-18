/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Box, Typography, TextField } from "@mui/material";
import HeaderMain from "../components/Landing/headerMain";
import Footer from "../components/footer";
import { useLocation } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import "../components/ChatBot/chatbot.css";

export default function Chatbot2() {
  const location = useLocation();
  console.log("location", location);
  const [userInput, setUserInput] = useState("");
  const [startTimestamp, setStartTimestamp] = useState(
    new Date().toISOString()
  );
  const [sessionId, setSessionId] = useState(
    () => "session-" + Math.random().toString(36).substr(2, 9)
  );
  const [conversation, setConversation] = useState([
    {
      user: "",
      chatbot: "As-salamu alaykum! Want to talk about yesterday?",
    },
  ]);
  const selectedActivityLabels = location?.state?.selectedActivityLabels || [];
  const selectedEmotions = location?.state?.selectedEmotions || [];
  const selectedFeedbackValue = location?.state?.selectedFeedbackValue || null;
  const [responseSent, setResponseSent] = useState(false);

  useEffect(() => {
    const savedConversation = sessionStorage.getItem("conversation");
    if (savedConversation) {
      setConversation(JSON.parse(savedConversation));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("conversation", JSON.stringify(conversation));
  }, [conversation]);

  const [waitingForUserResponse, setWaitingForUserResponse] = useState(false);

  const sendMessage = async () => {
    if (userInput.trim()) {
      const newUserMessage = { user: userInput, chatbot: "" };
      setConversation((prevConversation) => [
        ...prevConversation,
        newUserMessage,
      ]);

      if (!waitingForUserResponse) {
        setTimeout(() => {
          const chatbotResponse = {
            user: "",
            chatbot: `Wa alaikum assalam. I'm so sorry to hear you had an extremely stressful day and are feeling angry and tired.  That sounds incredibly difficult. Remember Allah (SWT) says in the Quran:  "And seek help through patience and prayer; and indeed, it is difficult except for the humbly submissive [to Allah ]" (Quran 2:45). The companions of the Prophet (peace be upon him) faced immense hardships with unwavering faith.  Their resilience can inspire us. Can you tell me more about what happened at work yesterday?  Perhaps sharing and reflecting on the situation can help process your feelings and find a path forward, InShaAllah. Remember, even in anger and tiredness, turning to Allah (SWT) in prayer and seeking His help is crucial.`,
          };
          setConversation((prevConversation) => [
            ...prevConversation,
            chatbotResponse,
          ]);

          // Set flag to wait for user's next input
          setWaitingForUserResponse(true);
        }, 2000);
      } else {
        setTimeout(() => {
          const chatbotResponse = {
            user: "",
            chatbot: "You're very welcome!",
          };
          setConversation((prevConversation) => [
            ...prevConversation,
            chatbotResponse,
          ]);

          // Reset the flag
          setWaitingForUserResponse(false);
        }, 1500);
      }
      setUserInput(""); // Clear the input field after sending message
    }
  };

  return (
    <>
      <HeaderMain />
      <Box className="chatBox">
        {conversation.map((message, index) => (
          <Box
            key={index}
            sx={{
              textAlign: message.user ? "right" : "left",
              margin: "10px 5px",
              padding: "8px",
              borderRadius: "8px",
              backgroundColor: message.user ? "#E3DDD6" : "#7E736E",
              color: message.user ? "#000" : "#fff",
              alignSelf: message.user ? "flex-end" : "flex-start",
              maxWidth: "70%",
            }}
          >
            <Typography variant="body1">
              {message.user || message.chatbot}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box className="inputBox">
        <TextField
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          variant="outlined"
          size="small"
          fullWidth
          placeholder="Type a message..."
        />
        <button className="send-button" onClick={sendMessage}>
          {<SendIcon />}
        </button>
      </Box>
      <Footer />
    </>
  );

  //   const saveConversationToDatabase = async () => {
  //     const conversationData = {
  //       sessionId,
  //       startTimestamp,
  //       selectedActivityLabels: location?.state?.selectedActivityLabels,
  //       selectedEmotions: location?.state?.selectedEmotions,
  //       selectedFeedbackValue: location?.state?.selectedFeedbackValue,
  //       conversation: conversation,
  //     };
  //     console.log("Sending conversation data:", conversationData);
  //   };

  //   useEffect(() => {
  //     const handleBeforeUnload = async (event) => {
  //       await saveConversationToDatabase();
  //       event.preventDefault();
  //       event.returnValue = "";
  //     };
  //     window.addEventListener("beforeunload", handleBeforeUnload);
  //     return () => {
  //       saveConversationToDatabase();
  //       window.removeEventListener("beforeunload", handleBeforeUnload);
  //     };
  //   }, [
  //     conversation,
  //     sessionId,
  //     startTimestamp,
  //     location?.state?.selectedActivityLabels,
  //     location?.state?.selectedEmotions,
  //     location?.state?.selectedFeedbackValue,
  //     saveConversationToDatabase,
  //   ]);

  //   return (
  //     <>
  //       <HeaderMain />
  //       <Box className="chatBox">
  //         {conversation.map((message, index) => (
  //           <Box
  //             key={index}
  //             sx={{
  //               textAlign: message.user ? "right" : "left",
  //               margin: "10px 5px",
  //               padding: "8px",
  //               borderRadius: "8px",
  //               backgroundColor: message.user ? "#E3DDD6" : "#7E736E",
  //               color: message.user ? "#000" : "#fff",
  //               alignSelf: message.user ? "flex-end" : "flex-start",
  //               maxWidth: "70%",
  //             }}
  //           >
  //             <Typography variant="body1">
  //               {message.user || message.chatbot}
  //             </Typography>
  //           </Box>
  //         ))}
  //       </Box>
  //       <Box className="inputBox">
  //         <TextField
  //           value={userInput}
  //           onChange={(e) => setUserInput(e.target.value)}
  //           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
  //           variant="outlined"
  //           size="small"
  //           fullWidth
  //           placeholder="Type a message..."
  //         />
  //         <button className="send-button" onClick={sendMessage}>
  //           {<SendIcon />}
  //         </button>
  //       </Box>
  //       <Footer />
  //     </>
  //   );
}
