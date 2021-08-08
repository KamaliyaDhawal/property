import { Router } from "express";
import { Constants } from "../../config/constants";
import { Validator } from "../../validate";
import { PropertyController } from "./propertyController";
import { PropertyMiddleware } from "./propertyMiddleware";
import {
    IsFavouriteModel,
    PropertyModel,
} from "./propertyModel";

const router: Router = Router();
const v: Validator = new Validator();
const propertyController = new PropertyController();
const propertyMiddleware = new PropertyMiddleware();

router.post("/",
    v.validate(PropertyModel),
    propertyMiddleware.imageValidation,
    propertyMiddleware.updalodImages,
    propertyController.addProperty
);

router.get("/areas",
    propertyController.getAreas
);

router.get("/",
    propertyController.getProperty
);

router.get("/:id",
    propertyController.getPropertyDetails
);

router.post("/:propertyId/favourite",
    v.validate(IsFavouriteModel),
    propertyController.makeFavouriteProperty
);

router.get(`/getImages${process.cwd()}/${Constants.IMAIGE_ROOT_FOLDER}/${Constants.IMAIGE_SUB_FOLDER1}/:path`, propertyController.getImages);

export const PropertyRoute: Router = router;

