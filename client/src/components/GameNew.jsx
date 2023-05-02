import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Datepicker, Input, Select, initTE } from "tw-elements";

function GameNew({onGameAdd, games}) {
    const [title, setTitle] = useState("");
    const [type, setType] = useState("")
    const [genres, setGenres] = useState(null)
    const [platforms, setPlatforms] = useState(null)
    const [player_num_min, setPlayer_num_min] = useState("")
    const [player_num_max, setPlayer_num_max] = useState("")    
    const [image_url, setImage_url] = useState("https://thumbs.dreamstime.com/b/new-content-text-quote-notepad-concept-background-new-content-text-quote-notepad-concept-background-217366624.jpg");
    const [description, setDescription] = useState("");
    
    const history = useHistory();

    // This is what implements Tailwind... so DON'T delete it. 
    useEffect(() => {
        initTE({ Datepicker, Input, Select });
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
                })}
        })
    }
    
    return (
        <div>
            <h3>Add New Game</h3>
            <form onSubmit={handleSubmit}>
                <div className="relative mb-3" data-te-input-wrapper-init>
                    <input type="text" id="titleControlInput1" value={title} onChange={e => setTitle(e.target.value)}
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"/>
                    <label htmlFor="titleControlInput1"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                    >Title </label>
                </div>
                <div className="relative mb-3" >
                    <select onChange={handleTypeFilter} data-te-select-init>
                        {/* <option value="Select Game Type">Select Game Type</option> */}
                        {typesList.map((type)=> <option value={type}>{type}</option>)}
                    </select>
                    <label data-te-select-label-ref>Type</label>
                </div>
                <div className="relative mb-3" >
                    <select onChange={handleGenresFilter} data-te-select-init multiple>
                        {/* <option value={"Select Genres"}>Select Genres</option> */}
                        {genresList.map((genre)=> <option value={genre}>{genre}</option>)}
                    </select>
                    <label data-te-select-label-ref>Genres</label>
                </div>
                <div className="relative mb-3" >
                    <select onChange={handlePlatformsFilter} data-te-select-init multiple data-te-select-init-visible-options="3">
                        {/* <option value="Select Game Platform">Select Game Platform</option> */}
                        {platformsList.map((platform)=> <option value={platform}>{platform}</option>)}
                    </select>
                    <label data-te-select-label-ref>Platforms</label>
                </div>
                <div className="relative mb-3" data-te-input-wrapper-init>
                    <input type="number" id="player_num_minFormControlInput1" value={player_num_min} onChange={e => setPlayer_num_min(e.target.value)}
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"/>
                    <label htmlFor="player_num_minFormControlInput1"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                    >Player Minimum Number</label>
                </div>
                <div className="relative mb-3" data-te-input-wrapper-init>
                    <input type="number" id="player_num_maxFormControlInput1" value={player_num_max} onChange={e => setPlayer_num_max(e.target.value)}
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"/>
                    <label htmlFor="player_num_maxFormControlInput1"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                    >Player Maximum Number</label>
                </div>
                <div className="relative mb-3" data-te-input-wrapper-init>
                    <input type="url" id="image_urlFormControlInput1" value={image_url} onChange={e => setImage_url(e.target.value)}
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"/>
                    <label htmlFor="image_urlFormControlInput1"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                    >Image_url</label>
                </div>
                <div className="relative mb-3" data-te-input-wrapper-init>
                    <textarea rows="4" id="descriptionFormControlInput1" value={description} onChange={e => setDescription(e.target.value)}
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"/>
                    <label htmlFor="descriptionFormControlInput1"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                    >Description</label>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
export default GameNew