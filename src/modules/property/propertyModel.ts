import { IsNotEmpty, IsPositive, MinLength, MaxLength } from "class-validator";
import * as l10n from "jm-ez-l10n";
import { Constants } from "../../config/constants";
import { PROPERTY_TABLE } from "../../config/tables";
import { Model } from "../../model";

l10n.setTranslationsFile("en", "src/language/translation.en.json");

export class PropertyModel extends Model {
    @MinLength(
        Constants.PROPERTY_MODEL.NAME_MIN_LENGHT,
        { message: l10n.t("ERR_MINI_LENGTH", { field: PROPERTY_TABLE.NAME, min: Constants.PROPERTY_MODEL.NAME_MIN_LENGHT }) }
    )
    @MaxLength(
        Constants.PROPERTY_MODEL.NAME_MAX_LENGHT,
        { message: l10n.t("ERR_MAX_LENGTH", { field: PROPERTY_TABLE.NAME, max: Constants.PROPERTY_MODEL.NAME_MAX_LENGHT }) }
    )
    @IsNotEmpty()
    public name: string;

    @MinLength(
        Constants.PROPERTY_MODEL.DESCRIPTION_MIN_LENGHT,
        { message: l10n.t("ERR_MINI_LENGTH", { field: PROPERTY_TABLE.DESCRIPTION, min: Constants.PROPERTY_MODEL.DESCRIPTION_MIN_LENGHT }) }
    )
    @IsNotEmpty()
    public description: string;

    @MinLength(
        Constants.PROPERTY_MODEL.ADDRESS_MIN_LENGHT,
        { message: l10n.t("ERR_MINI_LENGTH", { field: PROPERTY_TABLE.ADDRESS, min: Constants.PROPERTY_MODEL.ADDRESS_MIN_LENGHT }) }
    )
    @IsNotEmpty()
    public address: string;

    @MinLength(
        Constants.PROPERTY_MODEL.AREA_MIN_LENGHT,
        { message: l10n.t("ERR_MINI_LENGTH", { field: PROPERTY_TABLE.AREA, min: Constants.PROPERTY_MODEL.AREA_MIN_LENGHT }) }
    )
    @MaxLength(
        Constants.PROPERTY_MODEL.AREA_MAX_LENGHT,
        { message: l10n.t("ERR_MAX_LENGTH", { field: PROPERTY_TABLE.AREA, max: Constants.PROPERTY_MODEL.AREA_MAX_LENGHT }) }
    )
    @IsNotEmpty()
    public area: string;

    @IsNotEmpty()
    @IsPositive()
    public price: number;

    @IsNotEmpty()
    @IsPositive()
    public bedroom: number;

    @IsNotEmpty()
    @IsPositive()
    public bathroom: number;

    @IsNotEmpty()
    public carpetArea: string;

    constructor(body: any) {
        super();
        const {
            name,
            description,
            address,
            area,
            price,
            bedroom,
            bathroom,
            carpetArea
        } = body;

        this.name = name;
        this.description = description;
        this.address = address;
        this.area = area;
        this.price = +price ? +price : 0;
        this.bedroom = bedroom ? +bedroom : 0;
        this.bathroom = bathroom ? +bathroom : 0;
        this.carpetArea = carpetArea;
    }
}

export class IsFavouriteModel extends Model {
    @IsNotEmpty()
    public isFavourite: number;

    constructor(body: any) {
        super();
        const {
            isFavourite,
        } = body;

        this.isFavourite = isFavourite;
    }
}

