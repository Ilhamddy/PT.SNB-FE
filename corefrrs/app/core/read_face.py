import face_recognition

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
    face = face_recognition.face_encodings(image)
    if(len(face) > 1):
        raise Exception("wajah lebih dari 1")

    results = face_recognition.compare_faces(face_references, face[0])

    return results