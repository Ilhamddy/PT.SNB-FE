from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

ERROR_FACE_NOT_FOUND = "ERROR_FACE_NOT_FOUND"
ERROR_UNKNOWN = "ERROR_UNKNOWN"

def success_response(data: any = "success", status: int = 200):
    return {
        "status": status,
        "data": data,
        "status": "success"
    }


class ErrorObject():
  def __init__(self, name = ERROR_UNKNOWN, message = 'Error'):
    self.name = name
    self.message = message


class ErrorObjectFull():
  def __init__(self, eObject: ErrorObject, status):
    self.name = eObject.name
    self.message = eObject.message
    self.status = status

def error_response(error: ErrorObject = ErrorObject(), status: int = status.HTTP_500_INTERNAL_SERVER_ERROR):
    raise HTTPException(status, ErrorObjectFull(error, status).__dict__)

