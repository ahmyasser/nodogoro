/**
 * Interface represent the object in the Database
 */

interface ICoordinate{
  lng: string;
  lat: string;
}
export interface ILocation {
  _id: string;
  coordinate: ICoordinate
  temp: number;
  user: string;
}

export interface ILocationInputDTO {
  coordinate: ICoordinate
  temp: number;
  user: string;
}
