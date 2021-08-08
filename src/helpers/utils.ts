import { Constants } from "../config/constants";
import { Log } from "../helpers/logger";

export class Utils {

  public static getSearchString = (searchString: string) => {
    return `LIKE '%${searchString.replace(/'/g, "\\'")}%'`;
  }

  public static getCurrentlyAddedDataId = (firstId: number, totalEntries: number) => {
    const attchments = [firstId]
    for (let i = 1; i < totalEntries; i++) {
      firstId = firstId + 1;
      attchments.push(firstId);
    }
    return attchments;
  }

  public static getLimits(page: number, limit: number) {
    const pages = page ? +page : Constants.DEFAULT_PAGE;
    return [limit, pages > 1 ? (pages - 1) * limit : 0];
  }

  public static dbStringToObject = (result: any, key: string) => {
    if (result[key]) {
      result[key] = JSON.parse(result[key]);
    } else {
      result[key] = [];
    }
    return result[key];
  }

  private static logger: any = Log.getLogger();

}
