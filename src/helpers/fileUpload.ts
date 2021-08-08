import * as sharp from "sharp";
import * as fs from "fs";
import * as path from "path";
import { Constants } from "../config/constants";
import { Log } from "./logger";

export class FileUpload {
  private logger = Log.getLogger();

  public imageValidation = async (images: any) => {
    let otherFile: boolean = false;
    let fileName: string = "";
    for (let i = 0; i < images.length; i++) {
      const extension = (path.extname(images[i].name)).toLowerCase();
      if (Constants.IMAGES_EXTENTIONS.indexOf(extension) === -1) {
        otherFile = true;
        fileName = images[i].name;
      }
    }
    return { otherFile, fileName }
  }

  public updalodImages = async (images: any) => {
    const attachments = [];
    for await (let image of images) {
      const imagePath = `${process.cwd()}/${Constants.IMAIGE_ROOT_FOLDER}/${Constants.IMAIGE_SUB_FOLDER1}/${image.name}`;
      const tempimagePath = `${process.cwd()}/${Constants.TEMP_FOLDER}/${image.name}`;
      let thumbName = image.name.split(".");
      delete thumbName[thumbName.length - 1];
      thumbName = thumbName.join("");
      const thumbPath = `${process.cwd()}/${Constants.IMAIGE_ROOT_FOLDER}/${Constants.IMAIGE_SUB_FOLDER1}/${thumbName}${Constants.THUMBNAIL_PREFIX}${path.extname(image.name)}`;
      await image.mv(tempimagePath, async (err) => {
        if (err) {
          this.logger.error("ERROR : ", err);
          return false;
        }
        await sharp(tempimagePath).resize(Constants.THUMBNAIL_RESIZE_DIMENSIONAL).toFile(thumbPath);
        fs.copyFile(tempimagePath, imagePath, (err) => {
          if (err) {
            this.logger.error("ERROR : ", err);
            return false;
          }
          fs.unlink(tempimagePath, err => {
            if (err) {
              this.logger.error("ERROR : ", err);
              return false;
            }
          });
        });
      });
      attachments.push({ imagePath, thumbPath });
    }
    return attachments;
  }

}
