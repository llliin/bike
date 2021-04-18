import Marker from './marker';

export default class BikeMarker extends Marker {
  constructor(lng, lat) {
    super();
    this.longitude = lng;
    this.latitude = lat;
    this.iconPath = '/images/bike.png';
    this.width = 37.5;
    this.height = 43.5;
  }
}
