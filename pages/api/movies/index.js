import dbMiddleware from "../utils/middleware/dbMiddleware";
import Movie from "../models/movies";
import authMiddleware from "../utils/middleware/jwtAuth";
import validateMovieInput from "../validation/movieCreateValidation";

export const config = {
  api: {
    bodyParser: true,
  },
};

const handleErrors = (res, status, message) => {
  res.status(status).json({ success: false, message });
};

const handleSuccess = (res, status, message, data = null) => {
  res.status(status).json({ success: true, message, data });
};

async function createMovie(req, res) {
  try {
    const { error, value } = validateMovieInput({
      title: req.body.title,
      publishingYear: parseInt(req.body.publishingYear),
      poster: req.body.poster
    });

    if (error) {
      handleErrors(res, 400, error.details[0].message);
      return;
    }

    const newMovie = new Movie({
      title: value.title,
      publishingYear: value.publishingYear,
      poster: value.poster,
      user_id: req.user.userId,
    });

    await newMovie.save();
    handleSuccess(res, 201, "Movie created successfully", newMovie);
  } catch (error) {
    handleErrors(res, 500, "Internal Server Error");
  }
}



async function listMovies(req, res) {
  try {

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;

    // Only fetch movies created by the logged-in user
    const userId = req.user.userId; // Assuming the user ID is available in the decoded token
    const movies = await Movie.find({ user_id: userId }).sort({ _id: -1 }).skip(skip).limit(pageSize);
    const totalCount = await Movie.countDocuments({ user_id: userId });

    res.status(200).json({ success: true, data: movies, totalCount: totalCount });
  } catch (error) {
    console.error(error);
    handleErrors(res, 500, "Internal Server Error");
  }
}



// Apply authentication middleware dynamically
const applyAuthMiddleware = (handler) => authMiddleware(handler);

const handlers = {
  POST: applyAuthMiddleware(createMovie),
  GET: applyAuthMiddleware(listMovies),
};

export default async function handler(req, res) {
  await dbMiddleware(req, res, async () => {
    const method = req.method.toUpperCase();
    const selectedHandler = handlers[method];

    if (selectedHandler) {
      selectedHandler(req, res);
    } else {
      handleErrors(res, 405, 'Method Not Allowed');
    }
  });
}





