# PixelChomp

A retro maze-chase game for the browser. Eat every pellet, outsmart the ghost, clear all 30 levels.

Built with plain HTML5 Canvas and JavaScript. No framework, no build step.

## Features

- **30 levels** across three difficulties: Easy, Medium and Hard (10 each).
- **Pathfinding ghost:** the ghost chases you using breadth-first search (BFS) on the maze grid, so it always finds the shortest route.
- **Difficulty changes ghost speed:** it moves slower than you on Easy and matches your speed on Hard.
- **Level flow:** clear a maze to advance. Finish the last level to see the win screen and try another mode.
- **Retro presentation:** pixel fonts, looping video background and background music.

## Controls

| Key | Action |
|---|---|
| Arrow keys | Move |

## Run it

Open `index.html` in a browser, or serve the folder:

```
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Project structure

```
index.html     Page, menus and canvas
game.js        Game loop, levels, ghost AI, input
assets/
  audios/      Background music
  fonts/       Pixel fonts (see their licence files)
  videos/      Background video
```

## Roadmap

- [ ] Settings screen (currently a placeholder)
- [ ] Touch controls for mobile
- [ ] Multiple ghosts on later levels

## Credits

Game design and code by Md. Fahim Hassan. Fonts remain under their own licences in `assets/fonts/`.
