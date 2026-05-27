from pydantic import BaseModel, Field


class HouseBase(BaseModel):
    title: str = Field(min_length=3, max_length=255)
    description: str
    house_type: str
    location: str
    city: str
    price: float
    bedrooms: int = 1
    bathrooms: int = 1
    image_url: str
    nearby: str = ""


class HouseCreate(HouseBase):
    pass


class HouseRead(HouseBase):
    id: int

    class Config:
        from_attributes = True
