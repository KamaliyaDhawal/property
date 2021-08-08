import * as dotenv from "dotenv";
import { Response } from "express";
import { existsSync } from "fs";
import _ = require("lodash");
import { Constants } from "../../config/constants";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { Utils } from "../../helpers/utils";
import { PropertyUtils } from "./propertyUtils";

dotenv.config();

export class PropertyController {
  private propertyUtils: PropertyUtils = new PropertyUtils();

  public addProperty = async (req: any, res: Response) => {
    const { name, description, address, area, price, bedroom, bathroom, carpetArea, images } = req.body;
    const result: any = await this.propertyUtils.addProperty({ name, description, address, area, price, bedroom, bathroom, carpetArea, images });
    const rb: ResponseBuilder = ResponseBuilder.data(result, req.t("PROPERTY_ADD_SUCCESS"));
    res.status(Constants.SUCCESS_CODE).json({ msg: rb.msg, id: rb.result.insertId });
  }

  public getAreas = async (req: any, res: Response) => {
    const { searchString } = req.query;
    const result: any = await this.propertyUtils.getAreas(searchString);
    const rb: ResponseBuilder = ResponseBuilder.data(result, req.t("AREA_GET_SUCCESS"));
    res.status(Constants.SUCCESS_CODE).json({ msg: rb.msg, result });
  }

  public getProperty = async (req: any, res: Response) => {
    const { area, createdAt, minPrice, maxPrice, bedroom, bathroom, isFavourite, page = Constants.DEFAULT_PAGE, limit = Constants.DEFAULT_LIMITS } = req.query;
    const filters = { area, createdAt, minPrice, maxPrice, bedroom, bathroom, isFavourite }
    const limits = Utils.getLimits(+page, +limit);
    const result: any = await this.propertyUtils.getProperty(filters, limits);
    const rb: ResponseBuilder = ResponseBuilder.paginateData(result.property, result.count, req.t("PROPERTY_GET_SUCCESS"));
    res.status(Constants.SUCCESS_CODE).json(rb);
  }

  public getPropertyDetails = async (req: any, res: Response) => {
    const { id } = req.params;
    const result: any = await this.propertyUtils.getPropertyDetails(+id);
    const message = result.length > 0 ? req.t("PROPERTY_GET_SUCCESS") : req.t("PROPERTY_DETAIL_GET_EMPTY_SUCCESS");
    this.propertyUtils.increaseViewCount(id);
    const rb: ResponseBuilder = ResponseBuilder.data(result, message);
    res.status(Constants.SUCCESS_CODE).json({ msg: rb.msg, ...result });
  }

  public makeFavouriteProperty = async (req: any, res: Response) => {
    const { propertyId } = req.params;
    const { isFavourite } = req.body;
    const result: any = await this.propertyUtils.makeFavouriteProperty(+propertyId, isFavourite);
    const message = isFavourite === 1 ? req.t("PROPERTY_ADDED_FAVOURITE_SCUCEESS") : req.t("PROPERTY_REMOVE_FAVOURITE_SUCCESS");
    const rb: ResponseBuilder = ResponseBuilder.data(result, message);
    res.status(Constants.SUCCESS_CODE).json({ msg: rb.msg });
  }

  public getImages = async (req: any, res: Response) => {
    const { path } = req.params;
    const destination = `${process.cwd()}/${Constants.IMAIGE_ROOT_FOLDER}/${Constants.IMAIGE_SUB_FOLDER1}/${path}`;
    if (existsSync(destination)) {
      res.sendFile(destination);
    } else {
      const rb: ResponseBuilder = ResponseBuilder.badRequest(req.t("ERR_FILE_NOT_FOUND"));
      res.status(rb.code).json(rb);
    }
  }
}
