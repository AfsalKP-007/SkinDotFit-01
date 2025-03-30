Category = require("../../models/categorySchema");

const categoryInfo = async (req, res) => {
  
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 4;
    const skip = (page - 1) * limit;
    const searchQuery = req.query.search ? req.query.search.trim() : "";

    let filter = { status: true };

    if (searchQuery) {
      filter.name = { $regex: new RegExp(searchQuery, "i") }; 
    }

    const categoryData = await Category.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);


    if (req.xhr) {
      return res.render("partials/category-list", { cat: categoryData });
    }    

    const totalCategories = await Category.countDocuments(filter);
    const totalPages = Math.ceil(totalCategories / limit);

    res.render("category", {
      cat: categoryData,
      currentPage: page,
      totalPages: totalPages,
      totalCategories: totalCategories,
      searchQuery: searchQuery,
    });

  } catch (error) {
    console.error(error);
    res.redirect("/pageerror");
  }
};

const addCategory = async (req, res) => {
  try {
    const { name, description, offer } = req.body;

    const existingCategory = await Category.findOne({ name: new RegExp(`^${name}$`, "i") });

    if (existingCategory) {
      return res
        .status(400)
        .json({ status: "duplicate", error: "Category Name already exists" });
    }

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return res.status(400).json({ status: "nameError", error: "Category name is required" });
    }

    if (offer !== undefined && ( offer < 0 || offer > 100)  ) {
        return res.status(400).json({ status: "offerError", error: "Offer value must be between 0 and 100" });      
    }
    const newCategory = new Category({
      name,
      description,
      offer
    });

    await newCategory.save();
    return res.json({ success: true, message: "Category added successfully" });

  } catch (error) {
    return res.status(500).json({ status: error });
  }
};

const editCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    
    let offer = parseInt( req.body.offer)
   
    if (isNaN(offer))
      offer = 0

    // Check if the category name already exists (excluding the current one)
    const existingCategory = await Category.findOne({ name, _id: { $ne: id } });

    if (existingCategory) {
      return res.json({ status: "duplicate" });
    }

    // Update the category
    await Category.findByIdAndUpdate(id, { name, description, offer });

    res.json({ success: true });
  } catch (error) {
    console.error("Edit Category Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Update status to false instead of deleting
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { status: false },
      { new: true } // Returns updated category
    );

    if (!updatedCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    res.json({ success: true, message: "Category Deleted successfully" });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  categoryInfo,
  addCategory,
  editCategory,
  deleteCategory,
};
