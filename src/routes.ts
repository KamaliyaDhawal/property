import * as express from "express";
import * as l10n from "jm-ez-l10n";
import { PropertyRoute } from "./modules/property/propertyRoute";

export class Routes {
  public path() {
    const router = express.Router();

    router.use("/property", PropertyRoute);

    router.all("/*", (req, res) => {
      return res.status(404).json({
        error: l10n.t("ERR_URL_NOT_FOUND"),
      });
    });
    return router;
  }
}
