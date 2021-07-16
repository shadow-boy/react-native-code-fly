
import { Response, Request } from "express";
import { JsonController, Post, Req, Res } from "routing-controllers";
import DBManager from "../database/DBManager";
import Photo from "../entity/Photo";
import { PhotoMetadata } from "../entity/PhotoMetadata";

@JsonController('/photo')
export default class PhotoController {

    @Post("/add")
    async add(@Req() req: Request, @Res() res: Response) {
        let connection = await DBManager.share()

        let photo = new Photo();
        photo.name = "Me and Bears";
        photo.description = "I am near polar bears";
        photo.fileName = "photo-with-bears.jpg";
        photo.views = 1;
        photo.isPublished = true;

        // create a photo metadata
        let metadata = new PhotoMetadata();
        metadata.height = 640;
        metadata.width = 480;
        metadata.compressed = true;
        metadata.comment = "cybershoot";
        metadata.orientation = "portrait";
        metadata.photo = photo; // this way we connect them

        let photoRepository = connection.getRepository(Photo);
        let metadataRepository = connection.getRepository(PhotoMetadata)


        await photoRepository.save(photo);

        let metaDataEntity = await metadataRepository.save(metadata);


        //    let [photos,count] = await  photoRepository.findAndCount()
        let query = new Photo()
        query.description = photo.description

        let meta = await metadataRepository.findOne(3)
        let photo_query = await photoRepository.find()
        console.log("Photo has been saved");
        let photoRelation = await photoRepository.find({ relations: ["metadata"] })

        let many = await connection
            .getRepository(Photo)
            .createQueryBuilder("photo") // first argument is an alias. Alias is what you are selecting - photos. You must specify it.
            .leftJoinAndSelect("photo.metadata", "metadata")
            .where("photo.isPublished = true")
            .where("metadata.id > 3")
            // .andWhere("(photo.name = :photoName OR photo.name = :bearName)")
            .orderBy("photo.id", "DESC")
            .setParameters({ photoName: "Me and Bears", bearName: "Mishka" })
            .getMany();

        return many

    }
}

