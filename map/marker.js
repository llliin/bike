let mId = 0;
export default class Marker {
  static Label = class {
    content = '';
    color = '#22ac38';
    fontSize = 14;
    bgColor = '#fff';
    borderRadius = 30;
    borderColor = '#22ac38';
    borderWidth = 1;
    padding = 3;
  };

  static Callout = class {
    content = '';
    fontSize = 14;
  };

  iconPath = '';
  id = mId++;
  latitude = 0;
  longitude = 0;
  width = 0;
  height = 0;
  label = null;
  callout = null;

  constructor(lng, lat, iconPath, width, height) {
    this.longitude = lng;
    this.latitude = lat;
    this.iconPath = iconPath;
    this.width = width || 10;
    this.height = height || 10;
  }

  toJSON() {
    return { ...this };
  }

}
