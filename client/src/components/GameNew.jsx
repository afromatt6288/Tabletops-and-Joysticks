import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, initTE } from "tw-elements";

function GameNew({onGameAdd, games, currentUser, theme}) {
    const [title, setTitle] = useState("");
    const [type, setType] = useState("Board Games")
    const [genres, setGenres] = useState(null)
    const [platforms, setPlatforms] = useState(null)
    const [player_num_min, setPlayer_num_min] = useState("")
    const [player_num_max, setPlayer_num_max] = useState("")    
    const [image_url, setImage_url] = useState("https://thumbs.dreamstime.com/b/new-content-text-quote-notepad-concept-background-new-content-text-quote-notepad-concept-background-217366624.jpg");
    const [description, setDescription] = useState("");
    
/////////////////////
// Setup Functions //
/////////////////////

    const history = useHistory()

    // This is what implements Tailwind... so DON'T delete it. 
    useEffect(() => {
        initTE({ Datepicker, Input, Select, Ripple });
    }, []);

    const typesList = [
        "Board Games", "Card Games", "Casino Games", "Deck Building Games", "Dice Games", "Escape Room Games", 
        "Miniatures Games", "Mobile Games", "Party Games", "Puzzles", "Social Deduction Games", "Sports Games", 
        "Tabletop Role-playing Games", "Virtual Reality Games", "Video Games", "Word Games"
    ]
    
    const genresList = [
        "Abstract", "Action", "Adult", "Adventure", "Alternate History", "Area Control", "Asymmetric", "Bag Building", "Battle", "Battle Royale", 
        "Bluffing", "Campaign", "Card Drafting", "Card Game", "City-building", "Civilization", "Cooperative", "Deck Building", 
        "Deduction", "Dice Rolling", "Drafting", "Economic", "Educational", "Engine Building", 
        "Epic", "Escape Room", "Espionage", "Evolution", "Exploration", "Family", "Fantasy", "Farming", "Fighting", "First-Person Shooter (FPS)", "Gambling", "Heist", "Horror", "Incremental/Idle", 
        "Interactive Fiction", "Investigation", "JRPG", "Life Simulator", "Management", 
        "Massively Multiplayer Online Role Playing Game (MMORPG)", "Medieval", "Mini-games", "Multiplayer", "Multiplayer Online Battle Arena (MOBA)", 
        "Music", "Nature", "Other", "Party", "Pattern Building", "Platformer", "Politics", "Push Your Luck", 
        "Puzzle", "Racing", "Real-time", "Resource Management", "Role-playing", "Roll-and-Write", "Roguelike", "Route Building", "Rhythm", 
        "Sandbox", "Science Fiction", "Set Collection", "Shooter", "Simulation", "Social Deduction", "Sports", "Stealth", "Strategy", "Storytelling", 
        "Survival", "Tactical", "Tile Placement", "Trading", "Trading Card", "Trains", "Trick-taking", "Trivia", 
        "Vehicle Simulator", "Visual Novel", "Vocabulary", "War", "Western", "Word", "Worker Placement"
    ]
    
    const platformsList1 = [
        "Digital", "DreamCast", "GameBoy", "GameBoy Advance", "GameCube", "Genesis", "Mac", 
        "Mobile", "NES", "Nintendo 3DS", "Nintendo 64", "Nintendo DS", "Nintendo Switch", "PC", 
        "PS Vita", "PlayStation", "PlayStation 2", "PlayStation 3", "PlayStation 4", 
        "PlayStation 5", "PSP", "Wii", "Wii U", "XBox", "XBox 360", 
        "XBox One", "XBox Series X/S", "Other"
    ]

    const platformsList2=["Tabletop", "Digital", "Mobile", "Other"]

    const [platformsList, setPlatformsList] = useState([])
    useEffect(() => {
        if (type === 'Video Games') {
          setPlatformsList(platformsList1);
        } else {
          setPlatformsList(platformsList2);
        }
      }, [type]);
    
    console.log(`${title} ${type} ${genres} ${platforms} ${player_num_min} ${player_num_max} ${image_url} ${description}`)

    function handleTypeFilter(e) {
        const gameType = e.target.value
        setType(gameType);
      }

    function handleGenresFilter(e) {
        const gameGenres = Array.from(e.target.selectedOptions, option => option.value).join(", ");
        setGenres(gameGenres);
      }

    function handlePlatformsFilter(e) {
        const gamePlatforms = Array.from(e.target.selectedOptions, option => option.value).join(", ");
        setPlatforms(gamePlatforms);
      }

    function handleSubmit(e) {
        e.preventDefault()
        history.push(`/`)
        const formData = {
            title: title,
            type: type,
            genres: genres,
            platforms: platforms,
            player_num_min: parseInt(player_num_min),
            player_num_max: parseInt(player_num_max),
            image_url: image_url,
            description: description
        }
        console.log(formData)
        fetch("api/games", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(r => {
            if (r.ok) {
                r.json()
                .then(game => {
                    onGameAdd(game)
                    history.push(`/games/${game.id}`)
                })
            }
        })
    }
    
    return (
        <div className="flex items-center justify-center h-screen w-full">
            <div className="absolute inset-x-[30%] bottom-5 top-5 text-center md:block space-y-2 md:space-y-4 lg:space-y-6">
                <div className="g-6 flex h-full flex-wrap items-center justify-center text-linear-gradient(to right, #d70ad3, #d00dd6, #c910d9, #bc14da, #b019db, #a41edc, #9823dd, #8c28de, #7f32df, #6b3fd9, #5346d9, #3d50d6, #2b59d1 dark:text-neutral-200 mx-auto max-w-[40rem]">
                    <div className="text-[var(--color-theme-text)!important] border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] border-4 block rounded-lg bg-gray-600 bg-opacity-60 shadow-lg dark:bg-neutral-800 w-full md:w-auto">
                        <div className="md:mx-2 md:p-4">
                            <form onSubmit={handleSubmit}>
                                <p className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important]'} mb-2 text-center`}
                                    >Welcome 
                                </p>
                                <h1 className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important]'} mb-2 text-center`}
                                    >{currentUser.username}!
                                </h1>
                                <p className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important]'} mb-2 text-center`}
                                    > Add New Game Below!
                                </p>
                                <div className="flex justify-center">
                                    {/* <!--Game Title input--> */}
                                    <div className="relative mb-5" data-te-input-wrapper-init>
                                        <input type="text" value={title} onChange={e => setTitle(e.target.value)}
                                            className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important]' } peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`}
                                        />
                                        <label 
                                            className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important]' } pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary`}
                                            >Title 
                                        </label>
                                    </div>
                                    {/* <!--Type input--> */}
                                    <div className="relative mb-3" >
                                        <select onChange={handleTypeFilter} data-te-select-init className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] ' }`}>
                                            {typesList.map((type)=> <option key={type} value={type} className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] bg-theme-gradient hover:bg-theme-gradient-hover active:bg-theme-gradient-active' }`}
                                                >{type}
                                            </option>)}
                                        </select>
                                        <label data-te-select-label-ref className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] ' }`}
                                            >Type
                                        </label>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <div className="relative mb-3" >
                                        <select onChange={handleGenresFilter} data-te-select-init multiple className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] ' }`}>
                                            {genresList.map((genre)=> <option key={genre} value={genre} className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] bg-theme-gradient hover:bg-theme-gradient-hover active:bg-theme-gradient-active' }`}
                                                >{genre}
                                            </option>)}
                                        </select>
                                        <label data-te-select-label-ref className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] ' }`}
                                            >Genres
                                        </label>
                                    </div>
                                    <div className="relative mb-3" >
                                        <select onChange={handlePlatformsFilter} data-te-select-init multiple data-te-select-init-visible-options="3" className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] ' }`}>
                                            {platformsList.map((platform)=> <option key={platform} value={platform} className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] bg-theme-gradient hover:bg-theme-gradient-hover active:bg-theme-gradient-active' }`}
                                                >{platform}
                                            </option>)}
                                        </select>
                                        <label data-te-select-label-ref className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] ' }`}
                                            >Platforms
                                        </label>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <div className="relative mb-3" data-te-input-wrapper-init >
                                        <input type="number" value={player_num_min} onChange={e => setPlayer_num_min(e.target.value)}
                                            className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important]' } peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`}
                                        />
                                        <label
                                            className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important]' } pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary`}
                                            >Player Minimum Number
                                        </label>
                                    </div>
                                    <div className="relative mb-3" data-te-input-wrapper-init>
                                        <input type="number" value={player_num_max} onChange={e => setPlayer_num_max(e.target.value)}
                                            className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important]' } peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`}
                                        />
                                        <label
                                            className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important]' } pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary`}
                                            >Player Maximum Number
                                        </label>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <div className="relative mb-3 w-2/5" data-te-input-wrapper-init>
                                        <input type="url" value={image_url} onChange={e => setImage_url(e.target.value)}
                                            className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important]' } peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`}
                                        />
                                        <label 
                                            className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important]' } pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary`}
                                            >Image_url
                                        </label>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <div className="relative mb-3 w-2/5" data-te-input-wrapper-init>
                                        <textarea rows="4" value={description} onChange={e => setDescription(e.target.value)}
                                            className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important]' } peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`}
                                        />
                                        <label 
                                            className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important]' } pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary`}
                                            >Description
                                        </label>
                                    </div>
                                </div>
                                <div className="flex justify-center">  
                                    <button type="submit" className={`bg-theme-gradient hover:bg-theme-gradient-hover active:bg-theme-gradient-active mx-4 px-1 py-1 rounded`}>
                                        <span className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-gradient-text)!important] hover:text-[var(--color-theme-hover-text)!important] font-extrabold'}`}
                                            >Submit
                                        </span>
                                    </button>
                                </div>  
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default GameNew