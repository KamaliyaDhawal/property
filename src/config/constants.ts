export class Constants {
    public static readonly DATE_FORMAT = "YYYY-MM-DD";
    public static readonly TIMEZONE = "Asia/Kolkata";
    public static readonly SUCCESS = "SUCCESS";
    public static readonly SUCCESS_CODE = 200;
    public static readonly ERROR_CODE = 400;
    public static readonly INTERNAL_SERVER_ERROR_CODE = 500;
    public static readonly ERROR = "ERROR";
    public static readonly BAD_DATA = "BAD_DATA";
    public static readonly CODE = "CODE";
    public static readonly COMMON_WHERE = " 1 = 1 ";
    public static readonly DB_DEFAULTS = {
        CHARSET: "utf8mb4",
        COLLATION: "utf8mb4_unicode_ci",
    };
    public static readonly DEFAULT_PAGE = 1;
    public static readonly THUMBNAIL_PREFIX = "_thumb";
    public static readonly THUMBNAIL_RESIZE_DIMENSIONAL = {
        width: 220,
        height: 220
    };
    public static readonly IMAIGE_ROOT_FOLDER = "property_Image";
    public static readonly IMAIGE_SUB_FOLDER1 = "101";
    public static readonly TEMP_FOLDER = "temp";
    public static readonly IMAGES_EXTENTIONS = [".jpeg", ".jpg", ".png", ".gif"];
    public static readonly DEFAULT_LIMITS = 10;

    public static readonly PROPERTY_MODEL = {
        NAME_MIN_LENGHT: 2,
        NAME_MAX_LENGHT: 50,
        DESCRIPTION_MIN_LENGHT: 6,
        ADDRESS_MIN_LENGHT: 4,
        AREA_MIN_LENGHT: 2,
        AREA_MAX_LENGHT: 50,
    };
}
