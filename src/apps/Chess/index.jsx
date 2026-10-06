/**
 * Application: Chess
 * 
 * Jeu d'échecs contre une IA
 */
import { useState, useCallback, useEffect } from 'react';
import { Chess } from 'chess.js';
import { t } from '../../i18n/text';

export const config = {
  id: 'chess',
  name: 'Échecs',
  icon: '/icons/chess.webp',
  defaultWidth: 550,
  defaultHeight: 480,
};

const PIECES = {
  'wK': '♔', 'wQ': '♕', 'wR': '♖', 'wB': '♗', 'wN': '♘', 'wP': '♙',
  'bK': '♚', 'bQ': '♛', 'bR': '♜', 'bB': '♝', 'bN': '♞', 'bP': '♟',
};

const COPY = {
  checkmate_white: { FR: 'Échec et mat - Blanc gagne!', EN: 'Checkmate - White wins!', ES: 'Jaque y mate - ¡Gana el blanco!' },
  checkmate_black: { FR: 'Échec et mat - Noir gagne!', EN: 'Checkmate - Black wins!', ES: 'Jaque y mate - ¡Gana el negro!' },
  draw: { FR: 'Match nul!', EN: 'Draw!', ES: '¡Empate!' },
  stalemate: { FR: 'Pat!', EN: 'Stalemate!', ES: '¡Ahogado!' },
  check_white: { FR: 'Blanc en échec!', EN: 'White in check!', ES: '¡Blanco en jaque!' },
  check_black: { FR: 'Noir en échec!', EN: 'Black in check!', ES: '¡Negro en jaque!' },
  turn_white: { FR: 'Tour des Blancs', EN: "White's turn", ES: "Turno del blanco" },
  turn_black: { FR: 'Tour des Noirs', EN: "Black's turn", ES: "Turno del negro" },
  menuGame: { FR: 'Partie', EN: 'Game', ES: 'Partida' },
  menuOptions: { FR: 'Options', EN: 'Options', ES: 'Opciones' },
  status: { FR: 'Statut', EN: 'Status', ES: 'Estado' },
  thinking: { FR: 'IA réfléchit...', EN: 'AI is thinking...', ES: 'La IA está pensando...' },
  difficulty: { FR: 'Difficulté', EN: 'Difficulty', ES: 'Dificultad' },
  easy: { FR: 'Facile', EN: 'Easy', ES: 'Fácil' },
  medium: { FR: 'Moyen', EN: 'Medium', ES: 'Medio' },
  hard: { FR: 'Difficile', EN: 'Hard', ES: 'Difícil' },
  actions: { FR: 'Actions', EN: 'Actions', ES: 'Acciones' },
  newGame: { FR: 'Nouvelle partie', EN: 'New game', ES: 'Nueva partida' },
  history: { FR: 'Historique', EN: 'History', ES: 'Historial' },
  playingWhite: { FR: 'Vous jouez les Blancs', EN: 'You play White', ES: 'Juegas con las blancas' },
  moves: { FR: 'coups', EN: 'moves', ES: 'jugadas' },
};

const GAME_OVER_STATUSES = [COPY.checkmate_white, COPY.checkmate_black, COPY.draw, COPY.stalemate];

export const Component = ({ currentLanguage }) => {
  const [game, setGame] = useState(new Chess());
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [gameStatus, setGameStatus] = useState(COPY.turn_white);
  const [moveHistory, setMoveHistory] = useState([]);
  const [thinking, setThinking] = useState(false);
  const [difficulty, setDifficulty] = useState(2);

  const updateGameStatus = useCallback((chess) => {
    if (chess.isCheckmate()) {
      setGameStatus(chess.turn() === 'w' ? COPY.checkmate_black : COPY.checkmate_white);
    } else if (chess.isDraw()) {
      setGameStatus(COPY.draw);
    } else if (chess.isStalemate()) {
      setGameStatus(COPY.stalemate);
    } else if (chess.isCheck()) {
      setGameStatus(chess.turn() === 'w' ? COPY.check_white : COPY.check_black);
    } else {
      setGameStatus(chess.turn() === 'w' ? COPY.turn_white : COPY.turn_black);
    }
  }, []);

  const evaluateBoard = useCallback((chess) => {
    const pieceValues = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };
    let score = 0;
    
    const board = chess.board();
    for (let row of board) {
      for (let piece of row) {
        if (piece) {
          const value = pieceValues[piece.type];
          score += piece.color === 'w' ? value : -value;
        }
      }
    }
    
    const centerSquares = ['d4', 'd5', 'e4', 'e5'];
    for (let sq of centerSquares) {
      const piece = chess.get(sq);
      if (piece) {
        score += piece.color === 'w' ? 0.1 : -0.1;
      }
    }
    
    return score;
  }, []);

  const minimax = useCallback((chess, depth, alpha, beta, isMaximizing) => {
    if (depth === 0 || chess.isGameOver()) {
      return evaluateBoard(chess);
    }

    const moves = chess.moves();
    
    if (isMaximizing) {
      let maxEval = -Infinity;
      for (let move of moves) {
        chess.move(move);
        const evalScore = minimax(chess, depth - 1, alpha, beta, false);
        chess.undo();
        maxEval = Math.max(maxEval, evalScore);
        alpha = Math.max(alpha, evalScore);
        if (beta <= alpha) break;
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let move of moves) {
        chess.move(move);
        const evalScore = minimax(chess, depth - 1, alpha, beta, true);
        chess.undo();
        minEval = Math.min(minEval, evalScore);
        beta = Math.min(beta, evalScore);
        if (beta <= alpha) break;
      }
      return minEval;
    }
  }, [evaluateBoard]);

  const makeAIMove = useCallback(() => {
    if (game.isGameOver()) return;
    
    setThinking(true);
    
    setTimeout(() => {
      const gameCopy = new Chess(game.fen());
      const moves = gameCopy.moves();
      
      if (moves.length === 0) return;

      let bestMove = moves[0];
      let bestScore = Infinity;

      for (let move of moves) {
        gameCopy.move(move);
        const score = minimax(gameCopy, difficulty, -Infinity, Infinity, true);
        gameCopy.undo();
        
        if (score < bestScore) {
          bestScore = score;
          bestMove = move;
        }
      }

      const newGame = new Chess(game.fen());
      const result = newGame.move(bestMove);
      
      if (result) {
        setGame(newGame);
        setMoveHistory(prev => [...prev, result.san]);
        updateGameStatus(newGame);
      }
      
      setThinking(false);
    }, 300);
  }, [game, difficulty, minimax, updateGameStatus]);

  useEffect(() => {
    if (game.turn() === 'b' && !game.isGameOver() && !thinking) {
      makeAIMove();
    }
  }, [game, thinking, makeAIMove]);

  const handleSquareClick = (square) => {
    if (thinking || game.turn() === 'b') return;
    
    const piece = game.get(square);
    
    if (selectedSquare) {
      const move = {
        from: selectedSquare,
        to: square,
        promotion: 'q',
      };
      
      try {
        const newGame = new Chess(game.fen());
        const result = newGame.move(move);
        
        if (result) {
          setGame(newGame);
          setMoveHistory(prev => [...prev, result.san]);
          updateGameStatus(newGame);
        }
      } catch (e) {
        if (piece && piece.color === 'w') {
          setSelectedSquare(square);
          const moves = game.moves({ square, verbose: true });
          setPossibleMoves(moves.map(m => m.to));
          return;
        }
      }
      
      setSelectedSquare(null);
      setPossibleMoves([]);
    } else {
      if (piece && piece.color === 'w') {
        setSelectedSquare(square);
        const moves = game.moves({ square, verbose: true });
        setPossibleMoves(moves.map(m => m.to));
      }
    }
  };

  const resetGame = () => {
    const newGame = new Chess();
    setGame(newGame);
    setSelectedSquare(null);
    setPossibleMoves([]);
    setMoveHistory([]);
    updateGameStatus(newGame);
  };

  const renderSquare = (row, col) => {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const square = files[col] + (8 - row);
    const piece = game.get(square);
    const isLight = (row + col) % 2 === 0;
    const isSelected = selectedSquare === square;
    const isPossibleMove = possibleMoves.includes(square);
    
    let bgColor = isLight ? 'bg-[#f0d9b5]' : 'bg-[#b58863]';
    if (isSelected) bgColor = 'bg-[#829769]';
    if (isPossibleMove) bgColor = isLight ? 'bg-[#cdd26a]' : 'bg-[#aaa23a]';
    
    const pieceSymbol = piece ? PIECES[`${piece.color}${piece.type.toUpperCase()}`] : '';
    
    return (
      <div
        key={square}
        onClick={() => handleSquareClick(square)}
        className={`w-8 h-8 flex items-center justify-center cursor-pointer ${bgColor} hover:opacity-80 relative`}
      >
        {pieceSymbol && (
          <span className={`text-2xl ${piece.color === 'w' ? 'text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]' : 'text-black drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]'}`}>
            {pieceSymbol}
          </span>
        )}
        {isPossibleMove && !piece && (
          <div className="absolute w-2 h-2 bg-black/30 rounded-full"></div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Toolbar */}
      <div className="bg-gradient-to-b from-[#ece9d8] to-[#d4d0c8] border-b border-[#808080] px-2 py-1 flex gap-4 text-xs">
        <span className="text-gray-600 hover:underline cursor-pointer">{t(COPY.menuGame, currentLanguage)}</span>
        <span className="text-gray-600 hover:underline cursor-pointer">{t(COPY.menuOptions, currentLanguage)}</span>
        <span className="text-gray-600 hover:underline cursor-pointer">?</span>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel */}
        <div className="w-40 bg-gradient-to-b from-[#6b88c4] to-[#4d6eb5] p-2 flex-shrink-0">
          <div className="bg-white/90 rounded-lg p-2 mb-2">
            <h3 className="text-[11px] font-bold text-[#215dc6] mb-2">{t(COPY.status, currentLanguage)}</h3>
            <p className={`text-[10px] ${GAME_OVER_STATUSES.includes(gameStatus) ? 'text-red-600 font-bold' : 'text-gray-700'}`}>
              {t(gameStatus, currentLanguage)}
            </p>
            {thinking && (
              <p className="text-[10px] text-orange-600 mt-1 animate-pulse">{t(COPY.thinking, currentLanguage)}</p>
            )}
          </div>

          <div className="bg-white/90 rounded-lg p-2 mb-2">
            <h3 className="text-[11px] font-bold text-[#215dc6] mb-2">{t(COPY.difficulty, currentLanguage)}</h3>
            <select 
              value={difficulty} 
              onChange={(e) => setDifficulty(Number(e.target.value))}
              className="w-full text-[10px] border border-[#808080] rounded px-1 py-0.5"
            >
              <option value={1}>{t(COPY.easy, currentLanguage)}</option>
              <option value={2}>{t(COPY.medium, currentLanguage)}</option>
              <option value={3}>{t(COPY.hard, currentLanguage)}</option>
            </select>
          </div>

          <div className="bg-white/90 rounded-lg p-2">
            <h3 className="text-[11px] font-bold text-[#215dc6] mb-2">{t(COPY.actions, currentLanguage)}</h3>
            <button 
              onClick={resetGame}
              className="w-full xp-button text-[10px] py-1 mb-1"
            >
              {t(COPY.newGame, currentLanguage)}
            </button>
          </div>
        </div>

        {/* Chess Board */}
        <div className="flex-1 flex items-center justify-center bg-[#ece9d8] p-4">
          <div className="bg-[#8b4513] p-2 rounded shadow-lg">
            <div className="border-2 border-[#5c3317]">
              {[0, 1, 2, 3, 4, 5, 6, 7].map(row => (
                <div key={row} className="flex">
                  {[0, 1, 2, 3, 4, 5, 6, 7].map(col => renderSquare(row, col))}
                </div>
              ))}
            </div>
            <div className="flex justify-around mt-1 text-[10px] text-white">
              {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(f => (
                <span key={f}>{f}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-32 bg-[#ece9d8] border-l border-[#808080] p-2 flex-shrink-0">
          <h3 className="text-[11px] font-bold text-[#003399] mb-2 border-b border-[#808080] pb-1">
            {t(COPY.history, currentLanguage)}
          </h3>
          <div className="h-48 overflow-y-auto text-[10px] space-y-0.5">
            {moveHistory.map((move, i) => (
              <div key={i} className={`px-1 ${i % 2 === 0 ? 'bg-white' : 'bg-[#f5f5f5]'}`}>
                {Math.floor(i / 2) + 1}.{i % 2 === 0 ? '' : '..'} {move}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-[#ece9d8] border-t border-[#808080] px-2 py-1 text-[10px] text-gray-600 flex justify-between">
        <span>{t(COPY.playingWhite, currentLanguage)}</span>
        <span>{moveHistory.length} {t(COPY.moves, currentLanguage)}</span>
      </div>
    </div>
  );
};
