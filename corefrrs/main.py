from fastapi import FastAPI
import os
from app.routes.main import api_router

port = os.environ.get('PORT', '8000')


app = FastAPI()

app.include_router(api_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=port)
    