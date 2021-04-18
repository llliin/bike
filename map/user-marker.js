import Marker from './marker';

export default class UserMarker extends Marker {
  constructor(lng, lat) {
    super();
    this.longitude = lng;
    this.latitude = lat;
    this.iconPath = '/images/location.png';
    this.width = 19;
    this.height = 34;
  }
}
