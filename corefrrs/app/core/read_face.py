import face_recognition
from functools import reduce
from app.utils.api import error_response, ErrorObject, ERROR_FACE_NOT_FOUND
from fastapi import status


def compare_images(uri_references: list[str], uri: str):
    image_references = list(
        map(
            lambda uri_reference: face_recognition.load_image_file(uri_reference),
            uri_references
        )
    )
    image = face_recognition.load_image_file(uri)

    face_references = list(
        map(
            lambda i: face_recognition.face_encodings(i), 
            image_references
        )
    )
    face_references = [
        x
        for xs in face_references
        for x in xs
    ]
    faces_hasil = face_recognition.face_encodings(image)
    if(len(faces_hasil) == 0):
        error_response(ErrorObject(ERROR_FACE_NOT_FOUND, "wajah tidak ditemukan"), status.HTTP_400_BAD_REQUEST)
    
    def compare(f):
        compared = face_recognition.compare_faces(face_references, f)
        data = reduce(lambda prev, cur: {
            "total": prev["total"] + 1,
            "jumlah_match":  prev["jumlah_match"] + (1 if cur else 0)
        }, compared, {
            "total": 0,
            "jumlah_match":  0
        })
        return data
    
    results = list(
        map(
            compare,
            faces_hasil
        )
    )
    most_match = reduce(
        lambda prev, cur: cur["jumlah_match"] if cur["jumlah_match"] > prev else prev, 
        results, 
        0
    )

    return most_match > 0