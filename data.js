// Sample data structure for NYT Connections answers
// In a real application, this would come from an API or database

const connectionsData = {
    "2024-01-15": {
        date: "January 15, 2024",
        categories: [
            {
                color: "yellow",
                name: "TYPES OF FISH",
                words: ["SALMON", "TUNA", "TROUT", "BASS"],
                hint: "Think about common seafood options you might find at a restaurant."
            },
            {
                color: "green",
                name: "THINGS THAT RUN",
                words: ["PROGRAM", "NOSE", "STOCKINGS", "MOTOR"],
                hint: "Consider different meanings of the word 'run' - it's not just about movement."
            },
            {
                color: "blue",
                name: "FAMOUS FICTIONAL DETECTIVES",
                words: ["HOLMES", "POIROT", "MARPLE", "SPADE"],
                hint: "These are classic crime-solving characters from literature."
            },
            {
                color: "purple",
                name: "PALINDROMES",
                words: ["LEVEL", "MADAM", "RACECAR", "REFER"],
                hint: "These words read the same forwards and backwards."
            }
        ]
    },
    "2024-01-14": {
        date: "January 14, 2024",
        categories: [
            {
                color: "yellow",
                name: "FRUIT COLORS",
                words: ["ORANGE", "RED", "PURPLE", "GREEN"],
                hint: "Think about the colors of different fruits."
            },
            {
                color: "green",
                name: "WAYS TO COOK EGGS",
                words: ["SCRAMBLED", "FRIED", "BOILED", "POACHED"],
                hint: "Consider different breakfast preparation methods."
            },
            {
                color: "blue",
                name: "COMPUTER PARTS",
                words: ["MONITOR", "KEYBOARD", "MOUSE", "TOWER"],
                hint: "Think about the essential components of a desktop computer setup."
            },
            {
                color: "purple",
                name: "WORDS THAT START AND END WITH THE SAME LETTER",
                words: ["LEVEL", "RADAR", "CIVIC", "STATS"],
                hint: "Look for words where the first and last letters match."
            }
        ]
    },
    "2024-01-13": {
        date: "January 13, 2024",
        categories: [
            {
                color: "yellow",
                name: "TYPES OF CHEESE",
                words: ["CHEDDAR", "MOZZARELLA", "SWISS", "BRIE"],
                hint: "Think about popular cheese varieties you might find on a cheese board."
            },
            {
                color: "green",
                name: "WAYS TO SAY 'HELLO'",
                words: ["HI", "HEY", "YO", "HOWDY"],
                hint: "Consider informal greetings and salutations."
            },
            {
                color: "blue",
                name: "PLANETS",
                words: ["MARS", "VENUS", "SATURN", "MERCURY"],
                hint: "Think about celestial bodies in our solar system."
            },
            {
                color: "purple",
                name: "THINGS THAT CAN BE 'DEEP'",
                words: ["THOUGHT", "SLEEP", "WATER", "FRIED"],
                hint: "Consider different contexts where 'deep' is used as an adjective."
            }
        ]
    }
};

// Helper function to get today's date in YYYY-MM-DD format
function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Helper function to format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Function to get puzzle data for a specific date
function getPuzzleData(dateString) {
    // Return data for the requested date, or today's date if available
    return connectionsData[dateString] || connectionsData["2024-01-15"];
}

// Function to get available dates (for demo purposes)
function getAvailableDates() {
    return Object.keys(connectionsData);
}