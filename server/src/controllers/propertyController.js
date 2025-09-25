import prisma from "../config/db.js";

export const createProperty = async (req, res) => {
  try {
    const { title, description, price, type, beds, baths, area, location, userId } = req.body;
    
    // Cloudinary URLs come from req.files
    const images = req.files.map(file => file.path);

    const property = await prisma.property.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        type,
        beds: parseInt(beds),
        baths: parseInt(baths),
        area: parseInt(area),
        location,
        images,
        userId: parseInt(userId),
      },
    });

    res.json(property);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating property" });
  }
};

import prisma from "../config/db.js";

export const createProperty = async (req, res) => {
  try {
    const { title, description, price, type, beds, baths, area, location } = req.body;

    const images = req.files.map(file => file.path);

    const property = await prisma.property.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        type,
        beds: parseInt(beds),
        baths: parseInt(baths),
        area: parseInt(area),
        location,
        images,
        userId: req.user.id, // comes from auth middleware
      },
    });

    res.json(property);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating property" });
  }
};
