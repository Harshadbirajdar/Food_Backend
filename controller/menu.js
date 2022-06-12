const BigPromise = require("../middleware/BigPromise");
const formidable = require("formidable");
const cloudinary = require("cloudinary").v2;
const Menu = require("../model/menu");
const uplaodImage = require("../util/uploadImage");
const logger = require("../logger");

exports.addMenu = BigPromise(async (req, res, next) => {
  const form = new formidable.IncomingForm({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return next(err);
    }
    if (!files.image) return next(new Error("Please upload an image"));

    let image = [],
      menu;

    try {
      if (files.image.length !== undefined) {
        await files.image.forEach(async (file) => {
          let result = await uplaodImage(file.filepath, "food");
          image.push(result);
        });
      } else {
        image.push(await uplaodImage(files.image.filepath, "food"));
      }
    } catch (error) {
      logger.error(error);
      return next(new Error("Something went wrong with the image"));
    }

    let imageUrl = image.map((image) => image.secure_url);

    try {
      menu = await Menu.create({ ...fields, image: imageUrl });
    } catch (err) {
      image.forEach(async (image) => {
        await cloudinary.uploader.destroy(image.public_id);
      });
      return next(new Error(err));
    }

    return res.status(200).json({
      success: true,
      menu,
    });
  });
});

exports.getAllMenu = BigPromise(async (req, res, next) => {
  const { page, limit } = req.query;
  let cureentPage = page ? parseInt(page) : 0;
  let cureentLimit = limit ? parseInt(limit) : 10;
  let skip = cureentPage * limit;

  const menus = await Menu.find().skip(skip).limit(cureentLimit);

  const totalMenu = await Menu.countDocuments();

  return res.json({ totalMenu, menus });
});
