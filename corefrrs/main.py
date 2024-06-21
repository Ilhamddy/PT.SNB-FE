from fastapi import FastAPI
import os
from app.routes.main import api_router
from dotenv import load_dotenv

load_dotenv()
port = int(os.environ.get('PORT', 8000))
print(port)

app = FastAPI()

app.include_router(api_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=port)
