from fastapi import FastAPI
from google import genai
from dotenv import load_dotenv
import json

load_dotenv()
app = FastAPI()
client = genai.Client()

workoutDummy = {
  "exercise": "Curl",
  "targetSets": 3,
  "targetReps": 10,
  "setSummaries": [
    {
      "reps": 10,
      "warnings": {
      }
    },
    {
      "reps": 10,
      "warnings": {
            }
    },
    {
      "reps": 10,
      "warnings": {
            }
    }
  ]
}

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    system_instruction= "You are a personal workout coach. You will recieve a json summary of the workout, " \
    "including exercise name, target reps and sets, and a description of each set the user did. There will be an " \
    "explanation of every warning triggered, and how many times it triggered. You will not be recieving perfect information " \
    ", it is okay to make inferences but clearly state when you are doing so. Remember to check if they reached the target " \
    "set and reps. Also try to check for trends that show up as the exercise progesses, and keep feedback close to 4-5 sentences. "
    ,input=json.dumps(workoutDummy)
)

print(interaction.output_text)

@app.get("/")
def hi():
    return "Hello World"