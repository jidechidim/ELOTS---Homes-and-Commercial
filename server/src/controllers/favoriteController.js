import prisma from "../config/db.js";

// Save property to favorites
export const addFavorite = async (req, res) => {
  try {
    const { propertyId } = req.body;

    // Check if already exists
    const exists = await prisma.favorite.findFirst({
      where: { userId: req.user.id, propertyId: parseInt(propertyId) },
    });
    if (exists) return res.status(400).json({ error: "Already in favorites" });

    const favorite = await prisma.favorite.create({
      data: { userId: req.user.id, propertyId: parseInt(propertyId) },
    });

    res.json(favorite);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error adding to favorites" });
  }
};

// Remove property from favorites
export const removeFavorite = async (req, res) => {
  try {
    const { propertyId } = req.body;

    await prisma.favorite.deleteMany({
      where: { userId: req.user.id, propertyId: parseInt(propertyId) },
    });

    res.json({ message: "Removed from favorites" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error removing favorite" });
  }
};

// Get all favorites for logged-in user
export const getFavorites = async (req, res) => {
  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId: req.user.id },
      include: { property: true }, // join with property details
    });

    res.json(favorites);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching favorites" });
  }
};
