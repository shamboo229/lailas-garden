export const playSound = (type) => {
  const sounds = {
    click: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3', // Pop sound
    success: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3', // Win/Chime
    move: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3' // Blip
  };
  const audio = new Audio(sounds[type]);
  audio.volume = 0.5;
  audio.play();
};
