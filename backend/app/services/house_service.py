from sqlalchemy.orm import Session
from app.models.house import House
from app.schemas.house import HouseCreate


def create_house(db: Session, payload: HouseCreate) -> House:
    house = House(**payload.model_dump())
    db.add(house)
    db.commit()
    db.refresh(house)
    return house


def list_houses(db: Session, city: str | None = None, house_type: str | None = None):
    query = db.query(House)
    if city:
        query = query.filter(House.city.ilike(f"%{city}%"))
    if house_type:
        query = query.filter(House.house_type.ilike(f"%{house_type}%"))
    return query.order_by(House.id.desc()).all()
