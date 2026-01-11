import os
import requests
from dotenv import load_dotenv

load_dotenv()

key = os.getenv("GOOGLE_API_KEY")
print(f"Key loaded: {'Yes' if key else 'No'} ({key[:4]}...)" if key else "No key")

url = f"https://generativelanguage.googleapis.com/v1beta/models?key={key}"
print(f"Checking URL: {url.replace(key, '***')}")

try:
    r = requests.get(url)
    print(f"Status: {r.status_code}")
    # Print first few models
    data = r.json()
    if 'models' in data:
        print("Available 'Flash' Models:")
        found = False
        for m in data['models']:
            if 'flash' in m['name'].lower():
                print(f"- {m['name']}")
                found = True
        if not found:
            print("No 'flash' models found. Top 5:")
            for m in data['models'][:5]:
                print(f"- {m['name']}")
    else:
        print(f"Response: {r.text}")
except Exception as e:
    print(f"Error: {e}")
