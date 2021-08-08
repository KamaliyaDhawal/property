export class Tables {
  public static readonly PROPERTY = "properties";
  public static readonly ATTECHMENTS = "attechments";
}

export enum PROPERTY_TABLE {
  ID = 'id',
  NAME = 'name',
  DESCRIPTION = 'description',
  ADDRESS = 'address',
  AREA = 'area',
  PRICE = 'price',
  BEDROOM = 'bedroom',
  IS_FAVOURITE = 'isFavourite',
  BATHROOM = 'bathroom',
  IMAGES = 'images',
  VIEW_COUNT = 'viewCount',
  CARPET_AREA = 'carpetArea',
  CREATEDAT = 'createdAt',
  UPDATEDAT = 'updatedAt',
}

export enum ATTECHMENT_TABLE {
  ID = 'id',
  IMAGEPATH = 'imagePath',
  THUMBPATH = 'thumbPath',
  CREATEDAT = 'createdAt',
  UPDATEDAT = 'updatedAt',
}
