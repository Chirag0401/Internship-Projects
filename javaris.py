import pyttsx3
import datetime
import speech_recognition as sr
import wikipedia
import smtplib
import webbrowser as wb
import os
import pyautogui
import psutil
import pyjokes

engine = pyttsx3.init()

def speak(audio):
    engine.say(audio)
    engine.runAndWait()

def time():
    Time=datetime.datetime.now().strftime("%I:%M:%S")
    speak("the current time is")
    speak(Time)

def date():
    year= int(datetime.datetime.now().year)
    month= int(datetime.datetime.now().month)
    date = int(datetime.datetime.now().day)
    speak("the current date is")
    speak(date)
    speak(month)
    speak(year)

def wishme():
    speak("welcome back sir!")
    hour = datetime.datetime.now().hour

    if hour >= 6 and hour <= 12:
        speak("good morning")
    elif hour >= 12 and hour <= 18:
        speak("good afternoon")
    else :
        speak("good night")        
    speak("diwakar at your service.How can i help you")

def takecommand():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        r.pause_threshold = 1
        audio = r.listen(source)

    try:
        print("Recognizing...")
        query = r.recognize_google(audio,language='en=in')
        print(query)
    except Exception as e:
        print(e)
        speak("say that again please")

        return "None"        

    return query

def screenshot():
    img = pyautogui.screenshot()
    img.save("F:\DIWAKAR\ss.png")    


def cpu():
    usage= str(psutil.cpu_percent())
    speak("cpu is at"+ usage)

    #battery= psutil.sensors_battery
    #speak("battery is at")
    #speak(battery.percent)

def jokes():
    speak(pyjokes.get_joke())


def sendemail(to , content):
    server = smtplib.SMTP('smtp.gmail.com',587)
    server.ehlo()
    server.starttls()
    server.login("diwakarshah728@gmail.com","diwakar2113")
    server.sendemail("diwakarshah728@gmail.com",to ,connect)
    server.close()    

if __name__ == "__main__":
    wishme()

    while True:
        query = takecommand().lower()
        print(query)

        if "time" in query:
            time()
        elif "date" in query:
            date()
        elif "offline" in query:
            quit() 
        elif "wikipedia" in query:
            speak("searching...")
            query = query.replace("wikipedia","")
            result = wikipedia.summary(query,sentences= 2)
            speak(result)  
        elif "send email" in query:
            try:
                speak("what should i say?")
                content= takecommand()
                to = "chiragats3@gmail.com"
                sendemail(to,content)
                speak("the mail was sent successfully")
            except Exception as e:
                speak(e)
                speak("Unable to send email ")    

        elif "search in chrome" in query:
            speak("what should i search?")     
            chromepath="C:\Program Files (x86)\Google\Chrome\Application\chrome.exe %s"
            search = takecommand().lower()
            wb.get(chromepath).open_new_tab(search+ ".com")

        elif "logout" in query:
            os.system("shutdown - 1")

        
        elif "shutdown" in query:
            os.system("shutdown /s /t 1")

        
        elif "restart" in query:
            os.system("shutdown /r /t 1")

        elif "play songs" in query:
            songs_dir="F:\Aakash\MOVIES"   
            songs = os.listdir(songs_dir)
            os.startfile(os.path.join(songs_dir,songs[0])) 

        elif "remember that" in query:
            speak("what should i remember?")
            data= takecommand()
            speak("you said me to remember" + data)
            remember = open("data.txt","w")
            remember.write(data)
            remember.close

        elif " do you know anything" in query:
            remember = open("data.txt","r")
            speak("you said me to remember that"+remember.read())      

        elif "screenshot" in query:
            screenshot()
            speak("done!")

        elif "cpu" in query:
            cpu() 

        elif "joke" in query:
            jokes()       

