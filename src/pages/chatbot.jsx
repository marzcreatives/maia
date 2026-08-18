/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Box, Typography, TextField } from "@mui/material";
import HeaderMain from "../components/Landing/headerMain";
import Footer from "../components/footer";
import { useLocation } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import "../components/ChatBot/chatbot.css";

export default function Chatbot() {
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
      chatbot: "Just checking in—want to chat about your day?",
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
            chatbot: `Wa alaykum as-salam! MashaAllah, it sounds like you've had a wonderful day filled with positive emotions!\nFeeling energised, excited, happy, and insightful is a beautiful blessing from Allah (SWT).\n\nThe Prophet Muhammad (peace be upon him) said:  “The believer’s shade on the Day of Resurrection will be his charity.” (Tirmidhi).  This reminds us that good deeds and positive feelings are intertwined. What specific activities brought you such joy and insight today? Sharing them might help us understand how to cultivate these positive feelings further, InShaAllah`,
          };
          setConversation((prevConversation) => [
            ...prevConversation,
            chatbotResponse,
          ]);

          // Set flag to wait for user's next input
          setWaitingForUserResponse(true);
        }, 2500);
      } else {
        setTimeout(() => {
          const chatbotResponse = {
            user: "",
            chatbot: `MashaAllah, that's wonderful!  Finding joy and peace in your hobbies is a beautiful thing.  Knitting sounds relaxing and allows you to connect with your creativity.  The Prophet Muhammad (peace be upon him) said:  “Indeed, Allah loves when one of you does a job perfectly.” (Baihaqi).Taking pride in your work, even a hobby, reflects a dedication to excellence which pleases Allah (SWT). How does knitting help you feel closer to Allah, and what other ways do you incorporate your faith into your daily life?`,
          };
          setConversation((prevConversation) => [
            ...prevConversation,
            chatbotResponse,
          ]);

          // Reset the flag
          setWaitingForUserResponse(false);
        }, 2000);
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
          style={{ whiteSpace: "pre-line" }}
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
