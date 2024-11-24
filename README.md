# React-movie-labs # Assignment 1 - ReactJS app.

Name: Yuheng Gu

## Overview.
three endpoints are added: now-playing, popular and mustwatch(mustwatch page does not have any functions)
every endpoint can achieve the addToFavorite function

Add the endpoint of credits Information about the actors and their detailed information page are added to watch their other works.

A new filter option of language is added but it failed into use temporary.

New Rating function is added on the movieDetailPage.

### Features
    + the endpoint of credits Information is enriched by its styles . 
    + I used localstorage to store the rating have been made. and changes and deleting are feasible.     
    + if you like an actor, you can click likes on actor page.
    + A new filter option of language is added but it failed into use temporary.

## Setup requirements.
    No non-standard setup steps necessary to run my app locally.

## API endpoints.
    + Discover list of upcoming movies - movie/upcoming
    + Discover list of now_playing movies - movie now_playing
    + Discover list of popular movies - movie/popular
    + get movie language - configuration/languages
    + Get movie credits - movie/${id}/credits
    + Get actor details - person/${id}
    + Get actor movies - getActorMovies

## Routing.
    + movies/nowPlaying - Get a list of movies that are currently in theatres.
    + movies/popular -Get a list of movies ordered by popularity.
    + movies/:id/credits - Get a list of movie credits.
    + actor/:id - Query the top level details of a person.

## Independent learning (If relevant).
    Itemize the technologies/techniques you researched independently and adopted in your project, i.e. aspects not covered in the lectures/labs. Include the source code filenames that illustrate these (we do not require code excerpts) and provide references to the online resources that helped you (articles/blogs)
