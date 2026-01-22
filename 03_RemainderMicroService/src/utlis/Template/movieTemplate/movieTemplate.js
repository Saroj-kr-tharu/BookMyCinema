const generateMovieListingEmailTemplate = (
    username = "Movie Lover",
    movies = []
) => {
    // Ensure username is a string and handle array if passed
    const displayName = Array.isArray(username)
        ? username[0]?.name || "Movie Lover"
        : username;
    
    // Handle empty movies array
    const movieContent = movies && movies.length > 0
        ? movies.map(movie => `
          <tr>
              <td style="padding: 20px; background-color: #16213e; border-radius: 12px; margin-bottom: 20px; display: block;">
                  <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                          <td style="width: 120px; vertical-align: top;">
                              <div style="width: 120px; height: 180px; background-color: #252850; border-radius: 8px; overflow: hidden;">
                                  <img src="${movie.image || "https://via.placeholder.com/120x180?text=Movie"}" 
                                       alt="${movie.title || "Movie"}" 
                                       style="width: 100%; height: 100%; object-fit: cover;">
                              </div>
                          </td>
                          <td style="padding-left: 20px; vertical-align: top;">
                              <h3 style="margin: 0 0 10px; color: #ffffff; font-size: 20px;">
                                  ${movie.title || "Untitled Movie"}
                              </h3>
                              <p style="margin: 0 0 8px; color: #a0aec0; font-size: 14px;">
                                  <span style="color: #e50914; font-weight: 600;">Director:</span> 
                                  ${movie.director || "Unknown"}
                              </p>
                              <p style="margin: 0 0 8px; color: #a0aec0; font-size: 14px;">
                                  <span style="color: #e50914; font-weight: 600;">Cast:</span> 
                                  ${movie.cast || "Not Available"}
                              </p>
                              <p style="margin: 0 0 8px; color: #a0aec0; font-size: 14px;">
                                  <span style="color: #e50914; font-weight: 600;">Genre:</span> 
                                  ${Array.isArray(movie.genre) ? movie.genre.join(", ") : movie.genre || "Not Specified"}
                              </p>
                              <p style="margin: 0 0 8px; color: #a0aec0; font-size: 14px;">
                                  <span style="color: #e50914; font-weight: 600;">Duration:</span> 
                                  ${movie.duration ? `${Math.floor(movie.duration / 60)}h ${movie.duration % 60}min` : "Unknown"}
                              </p>
                              <p style="margin: 0 0 15px; color: #a0aec0; font-size: 14px;">
                                  <span style="color: #e50914; font-weight: 600;">Release:</span> 
                                  ${movie.releaseDate ? new Date(movie.releaseDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        }) : "TBA"}
                              </p>
                              <p style="margin: 0; color: #e2e8f0; font-size: 14px; line-height: 1.6;">
                                  ${movie.description || "No description available."}
                              </p>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
          <tr><td style="height: 20px;"></td></tr>
      `).join("")
        : '<tr><td style="text-align: center; padding: 30px; color: #e2e8f0;">No movies available at the moment.</td></tr>';

    return `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Latest Movie Releases</title>
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
      </head>
      <body style="margin: 0; padding: 0; background-color: #0f0f1a;">
          <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #0f0f1a; font-family: 'Poppins', Arial, sans-serif;">
              <tr>
                  <td style="padding: 20px 0;">
                      <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #1a1a2e; border-radius: 16px; box-shadow: 0 4px 16px rgba(0,0,0,0.3);">
                          <!-- Header with Logo -->
                          <tr>
                              <td style="background: linear-gradient(135deg, #e50914 0%, #b20710 100%); padding: 40px 0; text-align: center; border-radius: 16px 16px 0 0;">
                                  <div style="background: rgba(0, 0, 0, 0.2); padding: 20px; margin: 0 auto; width: fit-content; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
                                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeq_PlctLqneopJcDxiuVeoRkOrlKSnq6tGw&s" alt="MovieFlix Logo" style="height: 60px; width: auto; margin-bottom: 15px;">
                                      <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">MovieFlix</h1>
                                  </div>
                              </td>
                          </tr>
  
                          <!-- Welcome Message -->
                          <tr>
                              <td style="padding: 40px 30px 20px;">
                                  <h2 style="margin: 0 0 20px; color: #e50914; font-size: 28px; text-align: center; font-weight: 700;">
                                      New Releases For You, ${displayName}! 🎬
                                  </h2>
                                  <p style="margin: 0 0 15px; color: #e2e8f0; font-size: 16px; line-height: 1.8; text-align: center;">
                                      Check out these exciting new movies that just arrived on our platform:
                                  </p>
                              </td>
                          </tr>
  
                          <!-- Movie Listings -->
                          <tr>
                              <td style="padding: 0 30px 30px;">
                                  <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                      ${movieContent}
                                  </table>
                                  
                                  <div style="text-align: center; margin: 30px 0 0;">
                                      <a href="https://example.com/movies" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #e50914 0%, #b20710 100%); color: #ffffff; text-decoration: none; font-weight: 600; border-radius: 12px; font-size: 18px; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 4px 12px rgba(229, 9, 20, 0.3); transition: all 0.3s ease;">
                                          Explore More Movies
                                      </a>
                                  </div>
                              </td>
                          </tr>
  
                          <!-- Footer -->
                          <tr>
                              <td style="background: linear-gradient(135deg, #16213e 0%, #0f172a 100%); padding: 30px; border-radius: 0 0 16px 16px;">
                                  <table role="presentation" style="width: 100%;">
                                      <tr>
                                          <td style="text-align: center;">
                                              <p style="margin: 0 0 10px; color: #e2e8f0; font-size: 16px; font-weight: 600;">
                                                  MovieFlix Entertainment
                                              </p>
                                              <p style="margin: 0; color: #94a3b8; font-size: 14px;">
                                                  You're receiving this email because you subscribed to our movie updates.
                                              </p>
                                              <p style="margin: 10px 0 0; color: #94a3b8; font-size: 14px;">
                                                  <a href="https://example.com/unsubscribe" style="color: #e50914; text-decoration: none;">Unsubscribe</a> | 
                                                  <a href="https://example.com/preferences" style="color: #e50914; text-decoration: none;">Preferences</a>
                                              </p>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
      </body>
      </html>`;
};

module.exports = generateMovieListingEmailTemplate;