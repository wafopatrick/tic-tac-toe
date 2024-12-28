# Tic Tac Toe Game

A modern implementation of the classic Tic Tac Toe game built with Angular 19, featuring both human vs. human and human vs. AI gameplay modes.

## Features

- **Multiple Game Modes**:
    - Human vs. Human
    - Human vs. AI with three difficulty levels:
        - Easy: Random moves
        - Medium: Strategic blocking
        - Hard: Unbeatable AI using minimax algorithm

- **Accessibility**:
    - Full keyboard navigation support
    - Clear visual feedback
    - ARIA labels for screen readers

- **Responsive Design**:
    - Built with Tailwind CSS
    - Mobile-friendly interface
    - Clean and modern UI

## Technologies Used

- Angular 19
- TypeScript
- Tailwind CSS
- Font Awesome
- RxJS

## Getting Started

### Prerequisites

- Node.js (Latest LTS version)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:4200
```

## How to Play

1. Select your preferred game mode (Human vs. Human or Human vs. AI)
2. If playing against AI, choose the difficulty level by clicking the AI button
3. Players take turns clicking cells to place their mark (X or O)
4. First player to get three in a row (horizontally, vertically, or diagonally) wins
5. Use the Reset button to start a new game

## Development

- Built using standalone Angular components
- Implements intelligent AI using the minimax algorithm
- Uses dependency injection for game state management
- Features responsive Tailwind CSS styling

## License

This project is licensed under the MIT License - see the LICENSE file for details.
