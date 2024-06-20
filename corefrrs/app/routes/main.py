from fastapi import APIRouter

from app.routes.face_recognition import face_recognition_routes

api_router = APIRouter()
api_router.include_router(face_recognition_routes.router, prefix="/face-recognition")

@api_router.get("/")
def read_root():
    return "Welcome to corefr healthtechs"
