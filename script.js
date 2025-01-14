const correctSound = document.getElementById("correct-sound");
const gameOverSound = document.getElementById("game-over-sound");
const wordContainer = document.getElementById("word-container");
const inputBox = document.getElementById("input-box");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const gameOverModal = document.getElementById("game-over-modal");
const totalWordsDisplay = document.getElementById("total-words");
const finalScoreDisplay = document.getElementById("final-score");
const restartBtn = document.getElementById("restart-btn");
const backToMenuButton = document.getElementById("backToMenuButton");

let selectedDifficulty = "";
let selectedCategory = "";
let timer = 0;
let words = [];
let currentWordIndex = 0;
let score = 0;
let currentWord = "";
let timerInterval = null;

const wordBanks = {
  science: [
    "Atom", "Mole", "Cell", "Gene", "Heat", "Wave", "Ion", "Dust", "Test", "Flow", "Plan", "Acid", "Base", "Salt", "Zinc", "Carbon", "Neut", "Volt", "Spin", "Bond", "Sun", "Star", "Mars", "Glow", "Earth", "Soil", "Leaf", "Path", "Rift", "Foss", "Rock", "Dust", "Heat", "Mole", "Fish", "Virus", "Gene", "Pore", "Brain", "Lens", "Plant", "Trace", "Fiber", "Brain", "Globe", "Atom", "Heat", "Zinc", "Lunar", "Electron", "Virus", "Water", "Bones", "Charge", "Pulse", "Field", "Laser", "Quartz", "DNA", "Ozone", "Flare", "Pulse", "Light", "Curve", "Speed", "Grain", "Cells", "Orbit", "Slope", "Meteor", "Glare", "Proton", "Gamma", "Crust", "Solar", "Bloom", "Straw", "Toxic", "Acids", "Grasp", "Blend", "Atoms", "Bacteria", "Biomes", "Cycle", "Chlor", "Proton", "Nucleus", "Magnet", "Graph", "Signal", "Energy", "Plastic", "Evolve", "Carbon", "Fusion", "Photon", "Tissue", "Genes", "Molecule", "Mineral", "Brain", "Neutron", "Strain", "Orbit", "Filter", "Growth", "Liquid", "Chemic", "Cellar", "Radius", "Nitrate", "Toxic", "Cortex", "Cloud", "Crust", "Magma", "Ozone", "Ionics", "Grains", "Genetic", "Gasses", "Absorber", "Magnetic", "Cytoplasm", "Genome", "Ecosystem", "Isotope", "Tension", "Biology", "Photon", "Element", "Nucleus", "Absence", "Particle", "Alkaline", "Bacteria", "Solvent", "Cohesion", "Wavelength", "Germline", "Thermal", "Sodium", "Hydrogen", "Molecule", "Vortex", "Cellular", "Solvent", "Tectonic", "Comet", "Cavity", "Stratus", "Zinc", "Crater", "Lattice", "Magnet", "Precip", "Reticle", "Velocity", "Digest", "Insoles", "Conductor", "Filter", "Chemical", "Absorber", "Nucleus", "Magnetic", "Ionizing", "Ecosystem", "Oxygenic", "Tension", "Protein", "Neutral", "Genome", "Tectonic", "Molecule", "Fusion", "Solvent", "Acidity", "Ionizing", "Dioxide", "Catalyst", "Magnetism", "Thermal", "Gravitas", "Velocity", "Plasma", "Geology", "Geosphere", "Solvent", "Pressure", "Spectra", "Protein", "Reactive", "Quantum", "Crystals", "Electric", "Conductor", "Cohesion", "Compounds", "Diffusion", "Breathing", "Cometary", "Biology"
  ],
  computer: [
    "Disk", "Byte", "Code", "Data", "File", "App", "Node", "Page", "Host", "Ping", "Port", "Task", "User", "Link", "Java", "HTML", "CSS", "URL", "Bug", "Edit", "Save", "Load", "Debug", "Swap", "Print", "Info", "Scan", "Code", "Root", "Mode", "Line", "Free", "Text", "Type", "Login", "Shell", "Byte", "Read", "Node", "Pool", "Frame", "Input", "Cloud", "Cache", "Linux", "Drive", "Logic", "Query", "Debug", "Link", "Path", "Model", "Script", "Script", "Array", "Input", "Bytes", "Style", "Token", "Server", "Count", "Block", "Space", "Flash", "Access", "Plugin", "JavaS", "Macro", "Radio", "Script", "Token", "Data", "Device", "Power", "Clock", "Write", "Query", "Trace", "Keypad", "Video", "Block", "Socket", "Server", "Codec", "Pixel", "Render", "Cache", "Script", "Input", "Output", "Device", "Login", "Upload", "Encrypt", "Buffer", "Debug", "Proxy", "Screen", "Cluster", "Browser", "Cursor", "Buffer", "Module", "Linux", "Query", "Cloud", "Button", "Kernel", "Patch", "Virus", "System", "Cycle", "Editor", "Client", "Socket", "Matrix", "Array", "Logic", "Format", "Router", "Driver", "Cloud", "Delete", "Network", "Server", "Browser", "Database", "Program", "Hardware", "Offline", "System", "Backup", "Logfile", "Digital", "Folder", "Monitor", "Compiler", "Scripting", "Coding", "Storage", "Output", "Server", "Packet", "Terminal", "Protocol", "Capture", "Memory", "Refresh", "Interface", "Upload", "Access", "Module", "Client", "Porting", "Cache", "Widget", "Device", "Password", "Scanner", "Login", "FileSystem", "Output", "Script", "Database", "Analyzer", "Software", "Security", "Programmer", "Compiler", "Networked", "Hardware", "Firewall", "Services", "Protocol", "Monitor", "Mobile", "Virtual", "Encrypts", "Keyboard", "Scanner", "Circuit", "Modem", "Navigator", "Interface", "Processing", "Encryption", "Algorithm", "Gateway", "Function", "Compiler", "Userbase", "Backend", "Frontend", "Bitrate", "Routing", "Directory", "Bitmap", "Backup", "Transfer", "Updater", "Datacenter", "Drive", "Operating", "Loader"
  ],
  technology: [
    "Gear", "Bolt", "Wire", "Lock", "Chip", "Tool", "Code", "Heat", "Node", "Fuel", "Vibe", "Data", "Lens", "Cell", "Band", "Wave", "Flip", "Tear", "Plug", "Screw", "Grip", "Frame", "Mode", "Disc", "Port", "Test", "Ring", "Rack", "Volt", "Fuse", "Wind", "Magnet", "Pulse", "Data", "Latch", "Core", "Belt", "Pipe", "Clamp", "Mesh", "Tank", "Drive", "Laser", "Panel", "Block", "Clamp", "Shift", "Plaza", "Mount", "Churn", "Crank", "Glove", "Patch", "Hinge", "Frame", "Spray", "Tank", "Valve", "Power", "Motor", "Torque", "Shove", "Hook", "Chain", "Torch", "Scale", "Boost", "Plane", "Grill", "Press", "Grasp", "Tight", "Weld", "Brake", "Joints", "Grip", "Ledge", "Spare", "Spray", "Driver", "Laser", "Panel", "Block", "Clamps", "Ledge", "Circuit", "Impact", "Gravel", "Sprung", "Socket", "Shield", "Latch", "Crank", "Grind", "Piston", "Frame", "Battery", "Power", "Joints", "Brakes", "Plates", "Cables", "Screws", "Spray", "Grill", "Hinge", "Torch", "Lifter", "Pulley", "Clutch", "Shifter", "Rivets", "Moulds", "Tighten", "Jumper", "Frames", "Lifter", "Gears", "Valve", "Starter", "Crinkle", "Grinder", "Lifter", "Circuit", "Bracket", "Gasket", "Pulley", "Welding", "Tension", "Pistons", "Filters", "Riveted", "Springs", "Liners", "Engines", "Clutch", "Motor", "Belted", "Locking", "Cables", "Trigger", "Gearing", "Magnet", "Friction", "Screws", "Drives", "Levered", "Plates", "Spray", "Turbine", "Machine", "Socket", "Strains", "Lenses", "Rotary", "Moulds", "Bridges", "Fixing", "Rivets", "Engineer", "Circuitry", "Backbone", "Encoder", "Turbines", "Welding", "Friction", "Solenoid", "Scanner", "Plumbing", "Motorized", "Bracket", "Control", "Pistons", "Magnetic", "Helix", "Cooling", "Pulleys", "Cables", "Tension", "Caliper", "Machines", "Plates", "Shields", "Electrode", "Tighten", "Grinders", "Latchers", "Sprayers", "Coating", "Mechanic", "Drill", "Crossover", "Structure", "Compress", "Mounting", "Gaskets", "Filters", "Sensors",
  ]
};

console.log(window.location.href);

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
}

function setupGame() {
  console.log("Setting up game...");
  switch (selectedDifficulty) {
    case "easy":
      timer = 100;
      words = wordBanks[selectedCategory].filter(word => word.length === 4);
      break;
    case "medium":
      timer = 80;
      words = wordBanks[selectedCategory].filter(word => word.length === 6);
      break;
    case "difficult":
      timer = 50;
      words = wordBanks[selectedCategory].filter(word => word.length >= 6 && word.length <= 8);
      break;
    default:
      console.error("Invalid difficulty or category.");
      return;
  }

  shuffleArray(words);
  currentWordIndex = 0; // Reset word index
  score = 0; // Reset score
  scoreDisplay.textContent = score;
  timeDisplay.textContent = timer; // Display initial timer
}

function displayWord() {
  if (currentWordIndex < words.length) {
    currentWord = words[currentWordIndex];
    wordContainer.innerHTML = ""; // Clear previous word
    currentWord.split("").forEach(letter => {
      const letterSpan = document.createElement("span");
      letterSpan.className = "letter";
      letterSpan.textContent = letter;
      wordContainer.appendChild(letterSpan);
    });
  } else {
    endGame(); // Only ends when all words are completed
  }
}

function startGame() {
  console.log("Starting game...");
  if (!selectedDifficulty || !selectedCategory) {
    console.error("Game setup is incomplete. Please choose difficulty and category.");
    return;
  }

  // Reset timer and states
  clearInterval(timerInterval);
  setupGame();

  // Display the first word and reset input
  displayWord();
  inputBox.value = "";
  inputBox.focus();
  inputBox.disabled = false;

  // Start the timer
  timerInterval = setInterval(() => {
    timer--;
    timeDisplay.textContent = timer;

    if (timer <= 0) {
      endGame();
    }
  }, 1000);

  // Ensure only one event listener is attached
  inputBox.removeEventListener("input", handleInput);
  inputBox.addEventListener("input", handleInput);
}

function endGame() {
  console.log("Game Over...");
  clearInterval(timerInterval);
  inputBox.disabled = true;
  gameOverSound.play();
  totalWordsDisplay.textContent = score;
  finalScoreDisplay.textContent = score;
  gameOverModal.style.display = "flex";
}

function resetGame() {
  gameOverModal.style.display = "none";
  setupGame();
  startGame();
  const inputBox = document.getElementById('input-box');
  inputBox.value = ''; // Clear input
  inputBox.focus();
}

function handleInput() {
  const typedText = inputBox.value.trim();
  const wordLetters = document.querySelectorAll(".letter");

  wordLetters.forEach((letterSpan, index) => {
    const typedChar = typedText[index];
    if (typedChar === undefined) {
      letterSpan.className = "letter";
    } else if (typedChar === letterSpan.textContent) {
      letterSpan.className = "letter correct";
    } else {
      letterSpan.className = "letter incorrect";
    }
  });

  if (typedText === currentWord) {
    score++;
    scoreDisplay.textContent = score;
    correctSound.play();
    inputBox.value = "";
    currentWordIndex++;
    displayWord();
  }
}

restartBtn.addEventListener("click", () => {
  resetGame();
  document.getElementById('input-box').disabled = false;
});

backToMenuButton.addEventListener("click", () => {
  console.log("Navigating back to menu...");

  // Hide game over modal
  gameOverModal.style.display = "none";
  
  // Reset inline styles or states
  document.body.style.margin = "0";
  document.body.style.padding = "0";
  document.body.style.position = "relative";

  // Navigate to homepage
  window.location.href = "http://127.0.0.1:5500/";

  // Reset game state
  clearInterval(timerInterval);
  timer = 0;
  words = [];
  currentWordIndex = 0;
  score = 0;
  currentWord = "";
  inputBox.value = "";
  inputBox.disabled = true;
  wordContainer.innerHTML = "";
  scoreDisplay.textContent = "0";
  timeDisplay.textContent = "0";

  // Navigate to the homepage
  const homepage = document.getElementById("homepage"); // Example selector
  const gamepage = document.getElementById("gamepage"); // Example selector

  homepage.style.display = "block"; // Show the homepage
  gamepage.style.display = "none"; // Hide the game page

  // Remove focus from the input box to prevent unwanted scroll
  inputBox.blur();

  // Explicitly set focus on the homepage or another non-scrolling element
  homepage.focus();

  // Optionally reset scroll position
  homepage.scrollTop = 0;
});

function resetGameVariables() {
  selectedDifficulty = "";
  selectedCategory = "";
  timer = 0;
  words = [];
  currentWordIndex = 0;
  score = 0;
  currentWord = "";
  timerInterval = null;

  // Reset UI elements
  scoreDisplay.textContent = 0;
  timeDisplay.textContent = 0;
  wordContainer.innerHTML = "";
  inputBox.disabled = false;
}

document.addEventListener("DOMContentLoaded", () => {
  const homepage = document.getElementById("homepage");
  const gamePage = document.getElementById("gamePage");
  const gameForm = document.getElementById("gameForm");

  gameForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const playerName = document.getElementById("playerName").value;
    selectedDifficulty = document.getElementById("difficulty").value;
    selectedCategory = document.getElementById("category").value;

    console.log("Player Name:", playerName);
    console.log("Difficulty:", selectedDifficulty);
    console.log("Category:", selectedCategory);

    homepage.style.display = "none";
    gamePage.style.display = "block";

    setupGame();
    startGame();
  });
});

// Initialize game setup
setupGame();