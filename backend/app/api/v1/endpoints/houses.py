from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.schemas.house import HouseCreate, HouseRead
from app.services.house_service import create_house, list_houses

router = APIRouter(prefix="/houses", tags=["houses"])


@router.get("", response_model=list[HouseRead])
def get_houses(city: str | None = None, house_type: str | None = None, db: Session = Depends(get_db)):
    try:
        return list_houses(db, city=city, house_type=house_type)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Failed to fetch houses: {exc}") from exc


@router.post("", response_model=HouseRead, status_code=201)
def post_house(payload: HouseCreate, db: Session = Depends(get_db)):
    try:
        return create_house(db, payload)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Failed to create house: {exc}") from exc
