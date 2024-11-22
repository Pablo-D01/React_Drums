const Key = ({
  dataKey,
  keyLabel,
  name,
  isPlaying,
  onClick,
  onTransitionEnd,
}) => {
  return (
    <div
      data-key={dataKey}
      className={`key ${isPlaying ? "playing" : ""}`}
      onClick={onClick} // Add click event
      onTransitionEnd={(e) =>
        e.propertyName === "transform" && onTransitionEnd(dataKey)
      }
    >
      <kbd>{keyLabel}</kbd>
      <span className="sound">{name}</span>
    </div>
  );
};

export default Key;
