const formidable = require("formidable");
const BigPromise = require("../middleware/BigPromise");
const Category = require("../model/category");
const uplaodImage = require("../util/uploadImage");

exports.addCategory = BigPromise(async (req, res, next) => {
  const form = new formidable.IncomingForm();
  const user = req.user;
  let imageUrl;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return next(err);
    }
    if (!files.image) return next(new Error("Please upload an image"));
    try {
      imageUrl = await uplaodImage(files.image.filepath, "category");
    } catch (error) {
      console.log(error);
      return next(new Error("Something went wrong with the image"));
    }
    const { name } = fields;
    const category = await Category.create({
      name,
      image: imageUrl.secure_url,
      createdBy: user._id,
    });
    return res.status(200).json(category);
  });
});

exports.updateCategory = BigPromise(async (req, res, next) => {
  const user = req.user;
  const { name, categoryId } = req.body;
  const category = await Category.findByIdAndUpdate(
    categoryId,
    {
      name,
      updatedBy: user._id,
    },
    { new: true }
  );
  if (!category) {
    return next(new Error("Category not found"));
  }
  return res.status(200).json(category);
});

exports.getAllCategory = BigPromise(async (req, res, next) => {
  const categories = await Category.find();
  return res.status(200).json(categories);
});
