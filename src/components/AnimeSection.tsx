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

    const playSound = (soundUrl: string) => {
        if (audioRef.current && audioEnabled && soundUrl) {
            audioRef.current.src = soundUrl;
            audioRef.current.currentTime = 0;
            audioRef.current.volume = 0.5;
            audioRef.current.play()
                .then(() => console.log("Audio playing successfully:", soundUrl))
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
            title: "Berserk",
            genre: "Dark Fantasy",
            status: "Ongoing",
            image: "https://ik.imagekit.io/jma7wkem8/7b64b61c2b59ab3cf35de7ee65fd6b87.jpg",
            sound: "https://allied-fuchsia-aie65yyqff.edgeone.app/Berserk%20OST%20BLOOD%20AND%20GUTS%20and%20GUTS%20and%20BLOOD%20Cover.mp3"
        },
        {
            title: "Attack on Titan",
            genre: "Dark Fantasy",
            status: "Completed",
            image: "https://ik.imagekit.io/jma7wkem8/ef16826f29a5ca88c8421b85f2e6af6b.jpg",
            sound: "https://unaware-orange-cvziiyx6ui.edgeone.app/youseebiggirl.mp3"
        },
        {
            title: "Kimetsu no Yaiba",
            genre: "Dark Fantasy",
            status: "Ongoing",
            image: "https://ik.imagekit.io/jma7wkem8/a5a42a7b49234de25a238e6be9f945a4.jpg",
            sound: "https://female-teal-bgriw7aj2w.edgeone.app/To_the_Infinity_Castle_-_Muzan_vs_Hashira_Theme_from_Demon_Slayer_128kbps_._(mp3.pm).mp3"
        },
        {
            title: "Fullmetal Alchemist",
            genre: "Steampunk",
            status: "Completed",
            image: "https://ik.imagekit.io/jma7wkem8/70db1e8f1cc672390253e4b123af7c79.jpg",
            sound: "https://soft-blue-rils6diaf4.edgeone.app/Fullmetal%20Alchemist%20Brotherhood%20Opening%201%20-%20Again_tv.mp3"
        },
        {
            title: "Vinland Saga",
            genre: "Historical",
            status: "Ongoing",
            image: "https://ik.imagekit.io/jma7wkem8/b4bb65236a0db3fde6201babf0859d52.jpg",
            sound: "https://hungry-ivory-vj7kngiuz6.edgeone.app/Vinland_Saga_Ost_-_STILL_BLADE_(mp3.pm).mp3"
        },
        {
            title: "One Piece",
            genre: "Adventure",
            status: "Ongoing",
            image: "https://ik.imagekit.io/jma7wkem8/download.png",
            sound: "https://huge-violet-8pkyuj4xbh.edgeone.app/One%20Piece%20Ending%201%20-%20Memories_default.mp3"
        },
        {
            title: "Jujutsu Kaisen",
            genre: "Dark Fantasy",
            status: "Ongoing",
            image: "https://ik.imagekit.io/jma7wkem8/26e62315b063e3cde8b913f1a9591213.jpg",
            sound: "https://hushed-apricot-alpnk6vza2.edgeone.app/King_Gnu_-_SPECIALZ_(mp3.pm).mp3"
        },
    ];

    return (
        <section className="container-portfolio py-24 border-t border-border">
            {/* Audio Element - dynamically loads sound on hover */}
            <audio ref={audioRef} preload="auto" />

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
                        className="group p-6 border border-border bg-card/30 hover:bg-card hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5 hover:-translate-y-1 hover:scale-[1.02] transition-all duration-500 ease-out flex flex-col justify-between aspect-[3/4] relative overflow-hidden cursor-pointer"
                        style={anime.image ? {
                            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url(${anime.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        } : {}}
                        onMouseEnter={() => {
                            if (anime.sound) playSound(anime.sound);
                        }}
                        onMouseLeave={() => {
                            if (anime.sound) stopSound();
                        }}
                    >
                        <div className="z-10 relative">
                            <span className={`text-xs font-mono mb-2 block transition-all duration-300 ${anime.image ? 'text-white/80 group-hover:text-white' : 'text-muted-foreground group-hover:text-foreground'}`}>
                                0{index + 1}
                            </span>
                            <h4 className={`text-xl font-medium leading-tight group-hover:underline underline-offset-4 decoration-1 transition-all duration-300 ${anime.image ? 'text-white' : 'group-hover:translate-x-1'}`}>
                                {anime.title}
                            </h4>
                        </div>

                        <div className="z-10 relative mt-auto pt-8">
                            <div className={`flex justify-between items-end border-t pt-4 transition-all duration-300 ${anime.image ? 'border-white/20 group-hover:border-white/40' : 'border-border/50 group-hover:border-border'}`}>
                                <span className={`text-xs font-mono uppercase tracking-wider transition-all duration-300 ${anime.image ? 'text-white/70 group-hover:text-white/90' : 'text-muted-foreground group-hover:text-foreground'}`}>
                                    {anime.genre}
                                </span>
                                <span className={`text-xs font-mono transition-all duration-300 ${anime.image ? 'text-white/70 group-hover:text-white/90' : 'text-muted-foreground group-hover:text-foreground'}`}>
                                    [{anime.status === 'Ongoing' ? 'ON' : 'END'}]
                                </span>
                            </div>
                        </div>

                        {/* Decorative minimal background element on hover (only for non-image cards) */}
                        {!anime.image && (
                            <div className="absolute top-0 right-0 w-24 h-24 bg-foreground/5 rounded-bl-full translate-x-12 -translate-y-12 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500 opacity-0 group-hover:opacity-100" />
                        )}

                        {/* Subtle overlay effect for image cards */}
                        {anime.image && (
                            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/0 group-hover:to-white/5 transition-all duration-500" />
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AnimeSection;
