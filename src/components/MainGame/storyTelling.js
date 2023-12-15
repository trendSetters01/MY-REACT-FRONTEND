import React, { useState } from "react";

export default function StoryTelling() {
    const [currentScene, setCurrentScene] = useState("scene1");
    const scenes = {
        scene1: {
            text: 'Enter the Shadow Realm with "Phantoms V2"...',
            nextScene: "scene2",
        },
        scene2: {
            text: "Embrace the enigma of the Phantoms...",
            nextScene: "scene3",
        },
        scene3: {
            text: "Your Phantom is your key, your entryway into a realm shrouded in mystery...",
            nextScene: "scene4",
        },
        // Add additional scenes here
    };

    const handleSceneChange = () => {
        const nextScene = scenes[currentScene].nextScene;
        setCurrentScene(nextScene);
    };

    return (
        <div>
            <div className="storytile">{scenes[currentScene].text}</div>
            <button
                onClick={handleSceneChange}
                className="input-md bg-gradient-to-r from-purple-500 to-blue-400 hover:from-blue-400 hover:to-purple-500 rounded-md px-4 py-2 text-white"
            >
                Next
            </button>
        </div>
    );
}
