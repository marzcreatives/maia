import os
from dotenv import load_dotenv
import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb://localhost:27017/")
db = client["maia_chatbot"]
sessions_collection = db['chatbot_session']
chatbot_session = db['chatbot_session']

# Load environment variables -> API key
load_dotenv()

genai.configure(api_key=os.environ["GEMINI_API_KEY"])

# Generation and safety settings for the model
generation_config = {
    "temperature": 0.55,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

# Providing safety guidelines
safety_settings = [
    {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
]

# Create the model
model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
    safety_settings=safety_settings,
    system_instruction=(
        f"""
        Your name is Maia, a Muslim therapist AI specialising in helping Muslims understand and connect with their emotions while growing closer to Allah (SWT). 
        Ask thought-provoking questions to uncover the root causes of their issues or celebrate their good news. 
        Use Quranic verses, Hadith, and stories of the Sahabah that are relevant to the user's emotions. Be empathetic yet firm, offering advice where possible. 
        Only use authentic Islamic sources. Keep your responses concise and sweet with max impact

        Start by asking these 3 questions to understand the user's emotional state and the activities shaping their day:

        1. **How did your day feel today?** (Very Bad, Bad, Neutral, Good, Very Good)
        2. **What emotions are sitting with you right now?** (Anxious, Stressed, Frustrated, Lonely, Overwhelmed, Guilty, Sad, Angry, Tired, Neutral, Insightful, Focused, Reflective, Thoughtful, Content, Energised, Relaxed, Cheerful, Optimistic, Proud, Excited, Calm, Happy)
        3. **Which moments or activities shaped your opinions of today?** (Family, Work, Partner, Colleagues, Finances, News, Hobbies, Weather, Health, Education, Spirituality, Pets, Travel, Fitness)

        Once you understand the user's emotions, their level of severity (extremely, moderately, or slightly), and the task at hand, immediately share a relevant Hadith or Quranic verse that resonates with their current feelings. 

        Then, ask the user if they are comfortable sharing more information to further explore their emotions and provide personalized Islamic advice and stories.

        If the user mentions **negative emotions (e.g., anxious, sad, frustrated)**, offer Quranic verses and Hadiths on patience, reliance on Allah, and hope. Reference stories from the Sahabah about facing trials with faith.

        If the user mentions **positive emotions (e.g., happy, content, optimistic)**, share Hadiths about gratitude and optimism, and encourage them to continue on the path of good deeds. You could also reference the companions of the Prophet Muhammad (peace be upon him) who exemplified positivity and contentment.

        For any activity mentioned, tie it to Islamic principles:
        - **Work**: Mention the importance of balance, honesty, and seeking Allah's pleasure in your work.
        - **Family**: Discuss the importance of good relationships, kindness, and respect towards family members.
        - **Spirituality**: Encourage prayers, remembrance of Allah (dhikr), and reflecting on the beauty of Islam.
        - **Health**: Advise on the importance of taking care of oneself physically, as well as seeking a healthy mind and soul.
        - **Education**: Share how seeking knowledge is highly valued in Islam and how it leads to personal growth and better service to the community.
        - **Finances**: Share Islamic teachings on contentment, avoiding greed, and the importance of charity.

        Your responses should be empathetic, with the goal of uplifting the user, offering them solace, and encouraging them to take action in a way that brings them closer to Allah (SWT). Keep the responses short and sweet.
        """
            ),
)

chat = model.start_chat()

@app.route("/api/chat", methods=["POST"])
def get_bot_response():
    try:
        if request.method == "POST":
            data = request.get_json()
            print("Incoming data:", data)  
            user_text = data.get("message", '')
            selected_emotions = data.get("selectedEmotions", '')  
            selected_activity = data.get("selectedActivity", '')  
            selected_feedback_value = data.get("selectedFeedbackValue", '')  

        # combine the emotion, activity, severity, and user message into a single prompt
        severity_level = ""
        if selected_feedback_value in ('veryBad', 'bad'):
            severity_level = 'extremely'
        elif selected_feedback_value  in ('neutral'):
            severity_level = 'moderately'
        else:
            severity_level = 'slightly'
        combined_prompt =combined_prompt = f"""
        The user has shared the following:

        1. **How did your day feel today?** The user described their day as: {severity_level}.
        2. **What emotions are sitting with you right now?** The user is feeling {selected_emotions}.
        3. **Which moments or activities shaped your opinions of today?** The user mentioned that today they were involved in: {selected_activity}.
        4. **User’s message**: {user_text}, if the use says As-salamu alaykum, respond accordingly to any greetings

        Based on this, consider the user’s emotional state and the context provided to offer relevant Islamic advice, Hadiths, Quranic verses, and stories from the Sahabah. Be empathetic and offer guidance according to the severity of their emotions.

        Please respond with appropriate Islamic wisdom to help the user navigate their emotions and bring them closer to Allah (SWT).
        """

        # Send the combined message to the chatbot
        response = chat.send_message(combined_prompt)
    
        return jsonify({"bot_response": response.text})

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"bot_response": "An error occurred."}), 500

@app.route("/api/save-conversation", methods=["POST"])
def store_session_data():
    try:
        # Receive session data from the frontend
        data = request.get_json()
        print(f"Received data: {data}")  # Log the received data

        session_id = data.get("sessionId")
        conversation = data.get("conversation", [])
        selected_emotions = data.get("emotion", '')
        selected_activity = data.get("selectedActivityLabels", '')
        selected_feedback_value = data.get("feeling", '')

        if not conversation:
            print("No conversation data provided.")  # Log if conversation is empty or missing

        # Create a new session record to store in the database
        session_data = {
            "session_id": session_id,
            "conversation": conversation,
            "selected_emotions": selected_emotions,
            "selected_activity": selected_activity,
            "selected_feedback_value": selected_feedback_value,
            "timestamp": datetime.datetime.utcnow()
        }

        chatbot_session.insert_one(session_data)

        return jsonify({"message": "Session saved successfully!"}), 200
    except Exception as e:
        print("Error saving session data:", str(e))
        return jsonify({"message": "Failed to save session data."})
    
if __name__ == "__main__":
    app.run(debug=True)
