import React, { useState, useEffect } from "react";
import Key from "./components/key";

const App = () => {
  const [playingKeys, setPlayingKeys] = useState({});

  const keys = [
    {
      dataKey: 65,
      keyLabel: "A",
      name: "clap",
      sound: require("./sounds/clap.wav"),
    },
    {
      dataKey: 83,
      keyLabel: "S",
      name: "hihat",
      sound: require("./sounds/hihat.wav"),
    },
    {
      dataKey: 68,
      keyLabel: "D",
      name: "kick",
      sound: require("./sounds/kick.wav"),
    },
    {
      dataKey: 70,
      keyLabel: "F",
      name: "openhat",
      sound: require("./sounds/openhat.wav"),
    },
    {
      dataKey: 71,
      keyLabel: "G",
      name: "boom",
      sound: require("./sounds/boom.wav"),
    },
    {
      dataKey: 72,
      keyLabel: "H",
      name: "ride",
      sound: require("./sounds/ride.wav"),
    },
    {
      dataKey: 74,
      keyLabel: "J",
      name: "snare",
      sound: require("./sounds/snare.wav"),
    },
    {
      dataKey: 75,
      keyLabel: "K",
      name: "tom",
      sound: require("./sounds/tom.wav"),
    },
    {
      dataKey: 76,
      keyLabel: "L",
      name: "tink",
      sound: require("./sounds/tink.wav"),
    },
  ];

  const playSound = (keyCode) => {
    const keyData = keys.find((key) => key.dataKey === keyCode);
    if (!keyData) return;

    const audio = new Audio(keyData.sound);
    audio.currentTime = 0;
    audio.play();

    // Activate the key visually
    setPlayingKeys((prevState) => ({ ...prevState, [keyCode]: true }));
  };

  const handleTransitionEnd = (dataKey) => {
    setPlayingKeys((prevState) => {
      const updatedState = { ...prevState };
      delete updatedState[dataKey];
      return updatedState;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      playSound(e.keyCode);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="keys">
      {keys.map((key) => (
        <Key
          key={key.dataKey}
          dataKey={key.dataKey}
          keyLabel={key.keyLabel}
          name={key.name}
          isPlaying={!!playingKeys[key.dataKey]}
          onClick={() => playSound(key.dataKey)} // Add click support
          onTransitionEnd={handleTransitionEnd}
        />
      ))}
    </div>
  );
};

export default App;
