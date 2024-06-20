from fastapi import APIRouter
from pydantic import BaseModel
from app.core.read_face import compare_images

class UriImage(BaseModel):
    uriReferences: list[str]
    uriImage: str

router = APIRouter()

@router.get("/user")
def read_items():
    return {"user": "a"}


@router.post("/compare-face", status_code=200)
def upload_gambar(file: UriImage) -> list[bool]:
    hasil = compare_images(file.uriReferences, file.uriImage)
    return hasil