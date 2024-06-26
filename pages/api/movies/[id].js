import Movie from "../models/movies";
import validateMovieInput from "../validation/movieUpdateValidation";
import authMiddleware from "../utils/middleware/jwtAuth";
import mongoose from "mongoose";
import dbMiddleware from "../utils/middleware/dbMiddleware";


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

async function updateMovie(req, res) {
  try {

    const { error, value } = validateMovieInput({
      title: req.body.title,
      publishingYear: parseInt(req.body.publishingYear),
      poster: req.body.poster,
    });

    if (error) {
      handleErrors(res, 400, error.details[0].message);
      return;
    }

    const movieId = req.query.id;
    const objectId = mongoose.Types.ObjectId.isValid(movieId)
      ? mongoose.Types.ObjectId.createFromHexString(movieId)
      : null;
    
    // Find the existing movie and check if the logged-in user created it
    const existingMovie = await Movie.findOne({ _id: objectId, user_id: req.user.userId });

    if (!existingMovie) {
      handleErrors(res, 404, "Movie not found or you don't have permission to update it");
      return;
    }

    // Update the movie details
    existingMovie.title = value.title;
    existingMovie.publishingYear = value.publishingYear;
    existingMovie.poster = value.poster;

    await existingMovie.save();

    handleSuccess(res, 200, "Movie updated successfully", existingMovie);
  } catch (error) {
    handleErrors(res, 500, "Internal Server Error");
  }
}



  async function getMovieById(req, res) {
    try {
      const movieId = req.query.id;
      const objectId = mongoose.Types.ObjectId.isValid(movieId)
        ? mongoose.Types.ObjectId.createFromHexString(movieId)
        : null;
      
      // Find the movie by ID and check if it belongs to the logged-in user
      const movie = await Movie.findOne({ _id: objectId, user_id: req.user.userId });
  
      if (!movie) {
        handleErrors(res, 404, "Movie not found or you don't have permission to view it");
        return;
      }
  
      handleSuccess(res, 200, "Movie retrieved successfully", movie);
    } catch (error) {
      console.error(error);
      handleErrors(res, 500, "Internal Server Error");
    }
  }
  
  
  
  async function deleteMovieById(req, res) {
    try {
  
      const movieId = req.query.id;
      const objectId = mongoose.Types.ObjectId.isValid(movieId)
        ? mongoose.Types.ObjectId.createFromHexString(movieId)
        : null;
  
      // Find the movie by ID and check if it belongs to the logged-in user
      const movieToDelete = await Movie.findOne({ _id: objectId, user_id: req.user.userId });
  
      if (!movieToDelete) {
        handleErrors(res, 404, "Movie not found or you don't have permission to delete it");
        return;
      }
  
      await movieToDelete.deleteOne();
  
      handleSuccess(res, 200, 'Movie deleted successfully');
    } catch (error) {
      console.error(error);
      handleErrors(res, 500, 'Internal Server Error');
    }
  }
  

const applyAuthMiddleware = (handler) => authMiddleware(handler);

const handlers = {
  PATCH: applyAuthMiddleware(updateMovie),
  GET: applyAuthMiddleware(getMovieById),
  DELETE: applyAuthMiddleware(deleteMovieById),
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


