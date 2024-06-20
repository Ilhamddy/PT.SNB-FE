from fastapi import APIRouter, HTTPException, status

def success_response(data: any = "success", status: int = 200):
    return {
        "status": status,
        "data": data,
        "status": "success"
    }

def error_response(data: any = "error", status: int = status.HTTP_500_INTERNAL_SERVER_ERROR):
    raise HTTPException(status, data)