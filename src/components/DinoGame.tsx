import { useEffect, useRef, useState, useCallback } from 'react';

const DinoGame = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const requestRef = useRef<number>();
    const [isGameOver, setIsGameOver] = useState(false);

    // Game constants
    const GRAVITY = 0.6;
    const JUMP_FORCE = -10;
    const SPEED = 5;
    const OBSTACLE_SPAWN_RATE = 100; // Frames

    // Game state refs (for loop)
    const dinoRef = useRef({ x: 50, y: 110, width: 40, height: 20, dy: 0, grounded: true });
    const obstaclesRef = useRef<{ x: number; y: number; width: number; height: number; passed: boolean }[]>([]);
    const frameRef = useRef(0);
    const scoreRef = useRef(0);

    const resetGame = useCallback(() => {
        dinoRef.current = { x: 50, y: 110, width: 40, height: 20, dy: 0, grounded: true };
        obstaclesRef.current = [];
        frameRef.current = 0;
        scoreRef.current = 0;
        setScore(0);
        setIsGameOver(false);
        setIsPlaying(true);
    }, []);

    const jump = useCallback(() => {
        if (dinoRef.current.grounded) {
            dinoRef.current.dy = JUMP_FORCE;
            dinoRef.current.grounded = false;
        }
    }, []);

    const handleInput = useCallback(() => {
        if (!isPlaying) {
            resetGame();
        } else {
            jump();
        }
    }, [isPlaying, resetGame, jump]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space' || e.code === 'ArrowUp') {
                e.preventDefault();
                handleInput();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleInput]);

    useEffect(() => {
        if (!isPlaying) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Responsive Canvas
        const resizeCanvas = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.clientWidth;
                canvas.height = 150;
            }
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);


        const update = () => {
            // Dino physics
            dinoRef.current.dy += GRAVITY;
            dinoRef.current.y += dinoRef.current.dy;

            // Ground collision
            if (dinoRef.current.y + dinoRef.current.height > canvas.height - 10) {
                dinoRef.current.y = canvas.height - 10 - dinoRef.current.height;
                dinoRef.current.dy = 0;
                dinoRef.current.grounded = true;
            } else {
                dinoRef.current.grounded = false;
            }

            // Obstacles
            if (frameRef.current % OBSTACLE_SPAWN_RATE === 0) {
                const height = 20 + Math.random() * 20;
                obstaclesRef.current.push({
                    x: canvas.width,
                    y: canvas.height - 10 - height,
                    width: 20,
                    height: height,
                    passed: false,
                });
            }

            obstaclesRef.current.forEach((obstacle, index) => {
                obstacle.x -= SPEED;

                // Collision detection
                if (
                    dinoRef.current.x < obstacle.x + obstacle.width &&
                    dinoRef.current.x + dinoRef.current.width > obstacle.x &&
                    dinoRef.current.y < obstacle.y + obstacle.height &&
                    dinoRef.current.y + dinoRef.current.height > obstacle.y
                ) {
                    setIsPlaying(false);
                    setIsGameOver(true);
                    if (scoreRef.current > highScore) setHighScore(scoreRef.current);
                    cancelAnimationFrame(requestRef.current!);
                    return;
                }

                // Score update
                if (obstacle.x + obstacle.width < dinoRef.current.x && !obstacle.passed) {
                    scoreRef.current += 1;
                    setScore(scoreRef.current);
                    obstacle.passed = true;
                }

                // Cleanup
                if (obstacle.x + obstacle.width < 0) {
                    obstaclesRef.current.splice(index, 1);
                }
            });

            frameRef.current++;
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Ground line
            ctx.beginPath();
            ctx.moveTo(0, canvas.height - 10);
            ctx.lineTo(canvas.width, canvas.height - 10);
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 1;
            ctx.stroke();

            // CUTE CAT DRAWING LOGIC
            const { x, y, width, height } = dinoRef.current;
            const isJump = !dinoRef.current.grounded;

            ctx.fillStyle = '#000';

            // Body (Rounder ellipse)
            ctx.beginPath();
            ctx.ellipse(x + 20, y + 15, 20, 12, 0, 0, Math.PI * 2);
            ctx.fill();

            // Head (Rounder & Bigger circle)
            ctx.beginPath();
            ctx.arc(x + 35, y + 5, 12, 0, Math.PI * 2);
            ctx.fill();

            // Ears (Triangular & Perky)
            ctx.beginPath();
            ctx.moveTo(x + 28, y - 5);
            ctx.lineTo(x + 32, y - 12); // Left ear tip
            ctx.lineTo(x + 36, y - 4);
            ctx.moveTo(x + 36, y - 4);
            ctx.lineTo(x + 40, y - 12); // Right ear tip
            ctx.lineTo(x + 44, y - 5);
            ctx.fill();

            // Eyes (White circles + pupils)
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(x + 38, y + 2, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#000';
            ctx.beginPath();
            ctx.arc(x + 39, y + 2, 1, 0, Math.PI * 2); // Pupil looking right
            ctx.fill();

            // Whiskers (Cute lines)
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x + 42, y + 5);
            ctx.lineTo(x + 48, y + 4);
            ctx.moveTo(x + 42, y + 7);
            ctx.lineTo(x + 48, y + 8);
            ctx.stroke();

            // Legs (Animated)
            ctx.fillStyle = '#000';
            const legOffset = Math.sin(frameRef.current * 0.5) * 5;

            if (isJump) {
                // Jump pose (legs tucked)
                ctx.fillRect(x + 10, y + 20, 8, 8); // Back leg
                ctx.fillRect(x + 30, y + 20, 8, 8); // Front leg
            } else {
                // Run pose
                ctx.fillRect(x + 10 + legOffset, y + 22, 6, 8); // Back leg L
                ctx.fillRect(x + 15 - legOffset, y + 22, 6, 8); // Back leg R
                ctx.fillRect(x + 30 + legOffset, y + 22, 6, 8); // Front leg L
                ctx.fillRect(x + 35 - legOffset, y + 22, 6, 8); // Front leg R
            }

            // Tail (Wiggly)
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(x + 5, y + 15);
            const tailWiggle = Math.sin(frameRef.current * 0.2) * 5;
            ctx.quadraticCurveTo(x - 10, y + 5 + tailWiggle, x - 5, y - 5 + tailWiggle);
            ctx.stroke();

            // Obstacles
            ctx.fillStyle = '#666';
            obstaclesRef.current.forEach((obstacle) => {
                ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
            });
        };

        const loop = () => {
            if (!isPlaying) return;
            update();
            draw();
            requestRef.current = requestAnimationFrame(loop);
        };

        loop();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [isPlaying, highScore]);

    // Initial draw (Game Over / Start screen content)
    useEffect(() => {
        if (!isPlaying) {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Ensure size is full width of parent container
            const resizeCanvas = () => {
                const parent = canvas.parentElement;
                if (parent) {
                    canvas.width = parent.clientWidth;
                    canvas.height = 150;
                }
            }
            resizeCanvas();

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#888';
            ctx.font = '14px monospace';
            ctx.textAlign = 'center';

            // Minimalist Start/Game Over text
            if (isGameOver) {
                ctx.fillText(`GAME OVER • SCORE: ${score}`, canvas.width / 2, canvas.height / 2);
                ctx.font = '12px monospace';
                ctx.fillText('TAP TO RETRY', canvas.width / 2, canvas.height / 2 + 20);
            } else {
                ctx.fillText('PRESS SPACE or TAP TO PLAY', canvas.width / 2, canvas.height / 2);

                // Draw static cute cat for intro
                const x = canvas.width / 2 - 20;
                const y = canvas.height / 2 + 30;

                ctx.fillStyle = '#000';

                // Body
                ctx.beginPath();
                ctx.ellipse(x + 20, y + 15, 20, 12, 0, 0, Math.PI * 2);
                ctx.fill();

                // Head
                ctx.beginPath();
                ctx.arc(x + 35, y + 5, 12, 0, Math.PI * 2);
                ctx.fill();

                // Ears
                ctx.beginPath();
                ctx.moveTo(x + 28, y - 5);
                ctx.lineTo(x + 32, y - 12);
                ctx.lineTo(x + 36, y - 4);
                ctx.moveTo(x + 36, y - 4);
                ctx.lineTo(x + 40, y - 12);
                ctx.lineTo(x + 44, y - 5);
                ctx.fill();

                // Eyes
                ctx.fillStyle = '#fff';
                ctx.beginPath();
                ctx.arc(x + 38, y + 2, 3, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#000';
                ctx.beginPath();
                ctx.arc(x + 39, y + 2, 1, 0, Math.PI * 2);
                ctx.fill();

                // Tail
                ctx.strokeStyle = '#000';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(x + 5, y + 15);
                ctx.quadraticCurveTo(x - 10, y + 5, x - 5, y - 5);
                ctx.stroke();
            }
        }
    }, [isPlaying, isGameOver, score])

    return (
        <div className="w-full select-none overflow-hidden relative">
            <div className="flex justify-between w-full px-4 mb-2 font-mono text-xs text-muted-foreground opacity-50 absolute top-2 left-0 pointer-events-none">
                {isPlaying && <span>SCORE: {score.toString().padStart(5, '0')}</span>}
                {isPlaying && <span>HI: {highScore.toString().padStart(5, '0')}</span>}
            </div>

            <canvas
                ref={canvasRef}
                className="w-full cursor-pointer touch-action-none block outline-none"
                onClick={handleInput}
            />
        </div>
    );
};

export default DinoGame;
