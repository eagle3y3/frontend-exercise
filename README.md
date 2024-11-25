# Givebutter Frontend Take-home

## Overview

Our goal is to fix and enhance a Pokedex application. If you are unfamiliar with the world of Pokemon, here is a brief explanation:

> The Pokedex is an electronic device created and designed to catalog and provide information regarding the various species of Pokemon featured in the Pokemon video game, anime and manga series.

[Source](https://pokemon.fandom.com/wiki/Pokedex)

Our version of the Pokedex is able to list and search through Pokemon. However, our search is a bit buggy. Additionally, we want to add a feature that shows a selected Pokemon's details like its **type**, **moves**, and **evolution chain**.

Your time is valuable, and we are extremely appreciative of you participating in this assessment. We're looking to gauge your ability to read and edit code, understand instructions, and deliver features, just as you would during your typical day-to-day work. We expect this test to take no more than one to two hours and ask to complete this work within the next two days. Upon submit, we will review and provide feedback to you regardless of our decision to continue the process.

Please update and add code in `App.js` and `index.css` based on the requirements found below. Additionally, we ask you to edit the `readme.md` with answers to a few questions found in the `Follow-up Questions` section also found below.

When you are finished, please upload your completed work to your Github and invite `@gperl27` to view it. **Do not open a PR please.**

## Setup

- This repo was scaffolded using `create-react-app`. As such, this app requires a stable version of `node` to get up and running.
- Clone this repo and run `npm install`.
- To run the app, run `npm start`.
- Please reach out to the Givebutter team if you have any issues with the initial setup or have any problems when running the initial app.

## Requirements

### Search

- Typing in the search input should filter the existing Pokemon list and render only matches found
- Fix any bugs that prevent the search functionality from working correctly
- If there are no results from search, render "No Results Found"
- The search results container should be scrollable
- The UI should match the below mockup

![](mockup0.png)

### Details Card

- Clicking "Get Details" for any given Pokemon should render a card that has the Pokemon's `name`, `types`, `moves`, and `evolution chain`
- Use the api functions defined in `api.js` to retrieve this data. Adding new endpoints or editing existing ones are out of scope
- The details card should match the below mockup

![](mockup1.png)

## Follow-up Questions

Please take some time to answer the following questions. Your answers should go directly in this `readme`.

- Given more time, what would you suggest for improving the performance of this app?

I would include a state management system like Zustand or Redux to handle the global state of the app. This would allow us to avoid prop drilling and make it easier to manage the state of the app as the app grows in complexity. I would also consider using a library like React Query to handle data fetching and caching. This would allow us to avoid making unnecessary API calls and reduce network usage. Additionally, I would consider using a library like Lodash to handle some of the more complex data manipulation that is currently being done in the App component. This would make the code more readable and maintainable.

The project's scope is only focused on the first 151 pokemon. I would suggest adding pagination to the app to allow users to view the 1000+ pokemon. This would involve adding a new endpoint to the API to retrieve the next set of pokemon and updating the app to handle the new data. I also would include lazy loading for the first 50 pokemon combining it with a scroll event listener and fetch 50 at a time. This would improve the performance of the app and make it more scalable.

Typesafety also should be included cause currently the functions can accept any arguments and return any type of data. This can lead to runtime errors and make the code more difficult to maintain. Typescript would make the code more readable and maintainable and would allow us to catch errors at compile time rather than runtime.

Build out error components. Currently, the app does not handle errors gracefully. I would suggest adding error components to the app to handle errors that occur when fetching data from the API. This would make the app more user-friendly and would allow us to provide users with more information about the error that occurred.

- Is there anything you would consider doing if we were to go live with this app?

Movesets for the pokemon are much larger than 4. 4 moves are displayed in the mockup. I would suggest adding a dropdown or a tab group to display all the moves for the pokemon based on what version of the game they are playing. This would make the app more user-friendly and allow users to view all the moves for the pokemon without cluttering the UI.

Pokemon is a visual game. I would suggest adding a sprite for each pokemon to the details card. I would also suggest adding a background image for the details card based on the pokemon's type. This would make the app more visually appealing and make it easier for users to identify the pokemon's type.

Making the app more a11y accessible. I included some standards (responsive, can be zoomed in 200%, some aria labels) but definitely can improve with given time.

From a security standpoint set up api limits and rate limiting. This would prevent users from making too many requests to the API and would prevent the app from being used to launch a DDoS attack.

SEO Peformance enhancements with meta tags.

Unit testing and e2e testing. I would suggest adding unit tests and e2e tests to the app to ensure that it functions correctly and to catch any regressions that may occur in the future. This would make the app more maintainable and would allow us to catch errors early in the development process.

- What was the most challenging aspect of this work for you (if at all)?

The nerd in me wanted to go all out and include all kinds of loading animations, libraries, images, etc. Cause Pokemon is a very fun visual brand. I remembered to just stay in scope. On the small technical difficulty side, I thought I had a bug with the evolution chain id. I thought the id was located in the fetchPokemonDetailsByName endpoint but it was located in the fetchSpeciesByName endpoint. I fixed the bug and was able to extract the chain with a small recursive soltion.
