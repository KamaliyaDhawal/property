import { Response } from "express";
import * as My from "jm-ez-mysql";
import *as _ from "lodash";
import { Constants } from "../../config/constants";
import { Log } from "../../helpers/logger";
import { FileUpload } from "../../helpers/fileUpload";
import { Tables } from "../../config/tables";
import { Utils } from "../../helpers/utils";
import { ResponseBuilder } from "../../helpers/responseBuilder";

export class PropertyMiddleware {
    private logger = Log.getLogger();
    private fileUpload: FileUpload = new FileUpload();

    public imageValidation = async (req: any, res: Response, next: () => void) => {
        if (!req.files.images || req.files.images.length === 0 || req.files.images.length > 5) {
            return res.status(Constants.ERROR_CODE).send({ code: Constants.ERROR_CODE, msg: req.t("FILE_REQURED_ERROR") });
        } else {
            const images = req.files.images[0] != undefined ? req.files.images : [req.files.images];
            const { otherFile, fileName } = await this.fileUpload.imageValidation(images);
            if (otherFile) {
                const rb: ResponseBuilder = ResponseBuilder.badRequest(req.t("NOT_AN_IMAGE", { file: fileName }));
                return res.status(rb.code).json(rb);
            }
            next();
        }
    }

    public updalodImages = async (req: any, res: Response, next: () => void) => {
        const images = req.files.images[0] != undefined ? req.files.images : [req.files.images];
        const attachments = await this.fileUpload.updalodImages(images);
        if (images) {
            const data = await My.insertMany(Tables.ATTECHMENTS, attachments);
            if (data && data.insertId) {
                req.body.images = attachments.length > 1 ? await Utils.getCurrentlyAddedDataId(data.insertId, data.affectedRows) : [data.insertId];
                next();
            } else {
                this.logger.error("ERROR : ", data);
                const rb: ResponseBuilder = ResponseBuilder.badRequest(req.t("ERR_INTERNAL_SERVER"));
                res.status(rb.code).json(rb);
            }
        } else {
            const rb: ResponseBuilder = ResponseBuilder.badRequest(req.t("ERR_INTERNAL_SERVER"));
            return res.status(rb.code).json(rb);
        }
    }
}