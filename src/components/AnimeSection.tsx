import { useRef, useState, useEffect } from "react";

const AnimeSection = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [audioEnabled, setAudioEnabled] = useState(false);

    // Enable audio on first user interaction
    useEffect(() => {
        const enableAudio = () => {
            setAudioEnabled(true);
            console.log("Audio enabled after user interaction");
        };

        // Listen for any user interaction
        document.addEventListener('click', enableAudio, { once: true });
        document.addEventListener('keydown', enableAudio, { once: true });

        return () => {
            document.removeEventListener('click', enableAudio);
            document.removeEventListener('keydown', enableAudio);
        };
    }, []);

    const playSound = () => {
        if (audioRef.current && audioEnabled) {
            audioRef.current.currentTime = 0;
            audioRef.current.volume = 0.5;
            audioRef.current.play()
                .then(() => console.log("Audio playing successfully"))
                .catch(e => console.log("Audio play failed:", e));
        } else if (!audioEnabled) {
            console.log("Audio not enabled yet - click anywhere on the page first");
        }
    };

    const stopSound = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    const animes = [
        {
            title: "Naruto",
            genre: "Shonen",
            status: "Completed",
        },
        {
            title: "Attack on Titan",
            genre: "Dark Fantasy",
            status: "Completed",
            image: "https://ik.imagekit.io/jma7wkem8/ef16826f29a5ca88c8421b85f2e6af6b.jpg",
            sound: "https://unaware-orange-cvziiyx6ui.edgeone.app/youseebiggirl.mp3"
        },
        {
            title: "One Piece",
            genre: "Adventure",
            status: "Ongoing",
        },
        {
            title: "Fullmetal Alchemist",
            genre: "Steampunk",
            status: "Completed",
        },
    ];

    return (
        <section className="container-portfolio py-24 border-t border-border">
            {/* Audio Element - CDN hosted for production */}
            <audio ref={audioRef} src="https://unaware-orange-cvziiyx6ui.edgeone.app/youseebiggirl.mp3" preload="auto" />

            <div className="mb-12 flex items-baseline justify-between">
                <h3 className="text-2xl md:text-3xl font-medium tracking-tight">
                    Visual Diet
                </h3>
                <span className="text-muted-foreground font-mono text-sm">(04.5) — WATCHLIST</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {animes.map((anime, index) => (
                    <div
                        key={index}
                        className="group p-6 border border-border bg-card/30 hover:bg-card transition-all duration-300 flex flex-col justify-between aspect-[3/4] relative overflow-hidden"
                        style={anime.image ? {
                            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url(${anime.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        } : {}}
                        onMouseEnter={() => {
                            if (anime.title === "Attack on Titan") playSound();
                        }}
                        onMouseLeave={() => {
                            if (anime.title === "Attack on Titan") stopSound();
                        }}
                    >
                        <div className="z-10 relative">
                            <span className={`text-xs font-mono mb-2 block ${anime.image ? 'text-white/80' : 'text-muted-foreground'}`}>
                                0{index + 1}
                            </span>
                            <h4 className={`text-xl font-medium leading-tight group-hover:underline underline-offset-4 decoration-1 ${anime.image ? 'text-white' : ''}`}>
                                {anime.title}
                            </h4>
                        </div>

                        <div className="z-10 relative mt-auto pt-8">
                            <div className={`flex justify-between items-end border-t pt-4 ${anime.image ? 'border-white/20' : 'border-border/50'}`}>
                                <span className={`text-xs font-mono uppercase tracking-wider ${anime.image ? 'text-white/70' : 'text-muted-foreground'}`}>
                                    {anime.genre}
                                </span>
                                <span className={`text-xs font-mono ${anime.image ? 'text-white/70' : 'text-muted-foreground'}`}>
                                    [{anime.status === 'Ongoing' ? 'ON' : 'END'}]
                                </span>
                            </div>
                        </div>

                        {/* Decorative minimal background element on hover (only for non-image cards) */}
                        {!anime.image && (
                            <div className="absolute top-0 right-0 w-24 h-24 bg-foreground/5 rounded-bl-full translate-x-12 -translate-y-12 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500 opacity-0 group-hover:opacity-100" />
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AnimeSection;
