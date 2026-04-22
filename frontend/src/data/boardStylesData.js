import imageShortboard from "../assets/shortboard.png";
import imageFish from "../assets/fish.png";
import imageLongboard from "../assets/Longboard.png";
import imageFunboard from "../assets/funboard.png";
import imageGun from "../assets/gun.png";
import imageSoftboard from "../assets/softboard.png";


export const BOARD_STYLES_INFO = [
  {
    id: "shortboard",
    name: "Shortboard",
    image: imageShortboard,
    waveRange: "1.0m - 3.0m+",
    level: "Intermediate to Pro",
    averageSize: "5'8\" - 6'4\"", 
    characteristics: [
      "High performance and maneuverability",
      "Sharp turns and aerial tricks",
      "Requires more skill to paddle",
      "Best for hollow, powerful waves"
    ]
  },
  {
    id: "fish",
    name: "Fish",
    image: imageFish,
    waveRange: "0.5m - 1.5m",
    level: "Beginner to Advanced",
    averageSize: "5'4\" - 6'0\"", 
    characteristics: [
      "Great speed in small waves",
      "Wide body for extra stability",
      "Swallow tail for quick turns",
      "Perfect for mushy, weak waves"
    ]
  },
  {
    id: "longboard",
    name: "Longboard",
    image: imageLongboard,
    waveRange: "0.3m - 1.5m",
    level: "All Levels",
    averageSize: "8'0\" - 10'0\"", 
    characteristics: [
      "Maximum stability and glide",
      "Easy paddling and wave catching",
      "Classic nose riding style",
      "Ideal for small, mellow waves"
    ]
  },
  {
    id: "funboard",
    name: "Funboard",
    image: imageFunboard,
    waveRange: "0.5m - 2.0m",
    level: "Beginner to Intermediate",
    averageSize: "6'6\" - 8'0\"",
    characteristics: [
      "Best of both worlds hybrid",
      "Forgiving and easy to learn",
      "Good stability with some agility",
      "Versatile for various conditions"
    ]
  },
  {
    id: "gun",
    name: "Gun",
    image: imageGun,
    waveRange: "2.5m - 6.0m+",
    level: "Expert Only",
    averageSize: "6'6\" - 10'0\"+", 
    characteristics: [
      "Built for big wave surfing",
      "Extra length for paddle speed",
      "Pin tail for control at high speed",
      "Handles powerful, fast waves"
    ]
  },
  {
    id: "softboard",
    name: "Softboard",
    image: imageSoftboard,
    waveRange: "0.3m - 1.0m",
    level: "Beginner",
    averageSize: "6'0\" - 9'0\"", 
    characteristics: [
      "Soft foam for safety",
      "Maximum buoyancy and stability",
      "Perfect for learning basics",
      "Forgiving on wipeouts"
    ]
  }
];