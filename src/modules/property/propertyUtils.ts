import * as My from "jm-ez-mysql";
import * as _ from "lodash";
import * as moment from "moment";
import { Constants } from "../../config/constants";
import { ATTECHMENT_TABLE, PROPERTY_TABLE, Tables } from "../../config/tables";
import { Utils } from "../../helpers/utils";

export class PropertyUtils {
    public async addProperty(property: Json) {
        property.images = JSON.stringify(property.images);
        return My.insert(Tables.PROPERTY, property);
    }

    public async getAreas(searchString?: string) {
        let where = searchString ? ` ${PROPERTY_TABLE.AREA} ${Utils.getSearchString(searchString)} ` : Constants.COMMON_WHERE;
        where += ` GROUP BY area ORDER BY ${PROPERTY_TABLE.AREA}`;
        const selectParams = [PROPERTY_TABLE.AREA];
        return My.findAll(Tables.PROPERTY, selectParams, where);
    }

    public async getProperty(filters: any, limit: number[]) {
        let data = [];
        let where = filters.area ? ` area ${Utils.getSearchString(filters.area)} ` : ` 1 = 1 `;
        const filrersCondition = this.getFilterQueries(where, filters, data);
        where = filrersCondition.where;
        data = filrersCondition.data;
        const addWhere = ` GROUP BY prpt.${PROPERTY_TABLE.ID} ORDER BY createdAt DESC limit ? offset ? `;
        data = [...data, ...limit]
        const selectParams = [`prpt.*`,
            `CONCAT('[',
                IF(attchment.id != 'NULL',GROUP_CONCAT(DISTINCT JSON_OBJECT('thumbPath', attchment.${ATTECHMENT_TABLE.THUMBPATH}, 'imagePath', attchment.${ATTECHMENT_TABLE.IMAGEPATH})),''),
            ']'
            ) AS images`,

        ];
        const tables = ` ${Tables.PROPERTY} as prpt
            INNER JOIN ${Tables.ATTECHMENTS} as attchment ON JSON_CONTAINS(prpt.images, CAST(attchment.id as JSON), '$')`;
        const uniqueBy = [`DISTINCT prpt.${PROPERTY_TABLE.ID}`]
        let result = await My.findAllWithCount(tables, uniqueBy, selectParams, where, addWhere, data);
        const property = _.map(result.result, (item) => {
            item.images = item.images ? JSON.parse(item.images).map((item) => {
                return {
                    imagePath: `${process.env.MEDIA_PATH}${item.imagePath}`,
                    thumbPath: `${process.env.MEDIA_PATH}${item.thumbPath}`,
                }
            }) : [];
            return item;
        });
        return { property, count: result.count };
    }

    public async getPropertyDetails(id: number) {
        const where = ` prpt.${PROPERTY_TABLE.ID} = ? GROUP BY prpt.${PROPERTY_TABLE.ID} `;
        const data = [id]
        const selectParams = [`prpt.*`,
            `CONCAT('[',
                IF(attchment.id != 'NULL', GROUP_CONCAT(DISTINCT JSON_OBJECT('thumbPath', attchment.${ATTECHMENT_TABLE.THUMBPATH}, 'imagePath', attchment.${ATTECHMENT_TABLE.IMAGEPATH})), ''),
                ']'
            ) AS images`,
        ];
        const tables = ` ${Tables.PROPERTY} as prpt
            INNER JOIN ${Tables.ATTECHMENTS} as attchment ON JSON_CONTAINS(prpt.${PROPERTY_TABLE.IMAGES}, CAST(attchment.${ATTECHMENT_TABLE.ID} as JSON), '$')`;
        const result = await My.first(tables, selectParams, where, data);
        result.images = result.images ? JSON.parse(result.images).map((item) => {
            return {
                imagePath: `${process.env.MEDIA_PATH}${item.imagePath}`,
                thumbPath: `${process.env.MEDIA_PATH}${item.thumbPath}`,
            }
        }) : [];
        return result;
    }

    public getFilterQueries = (where: string, filters: any, data: any) => {
        if (filters.createdAt) {
            const createdAt = moment(filters.createdAt).format(Constants.DATE_FORMAT);
            where += ` AND date(prpt.createdAt) = ? `;
            data.push(createdAt);
        }
        if (filters.minPrice) {
            where += ` AND prpt.price >= ? `;
            data.push(filters.minPrice);
        }
        if (filters.maxPrice) {
            where += ` AND prpt.price <= ? `;
            data.push(filters.maxPrice);
        }
        if (filters.bedroom) {
            where += ` AND prpt.bedroom = ? `;
            data.push(filters.bedroom);
        }
        if (filters.bathroom) {
            where += ` AND prpt.bathroom = ? `;
            data.push(filters.bathroom);
        }
        if (filters.isFavourite) {
            where += ` AND prpt.isFavourite = ? `;
            data.push(filters.isFavourite);
        }
        return { where, data }
    }

    public async increaseViewCount(id: number) {
        return My.query(`UPDATE ${Tables.PROPERTY} SET ${PROPERTY_TABLE.VIEW_COUNT} = ${PROPERTY_TABLE.VIEW_COUNT} + 1 WHERE ${PROPERTY_TABLE.ID} = ? `, [id]);
    }

    public async makeFavouriteProperty(id: number, isFavourite) {
        const where = ` ${PROPERTY_TABLE.ID} = ? `;
        const data = [id]
        const updateData = { isFavourite };
        return My.update(Tables.PROPERTY, updateData, where, data);
    }
}
