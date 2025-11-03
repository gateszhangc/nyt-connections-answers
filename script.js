// Main application logic for NYT Connections Answers website

class ConnectionsApp {
    constructor() {
        this.currentDate = this.getTodayDate();
        this.currentData = null;
        this.answersVisible = false;
        this.hintsVisible = false;

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setDefaultDate();
        this.loadPuzzleData();
    }

    getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    setupEventListeners() {
        // Date selector
        const dateSelect = document.getElementById('date-select');
        dateSelect.addEventListener('change', (e) => {
            this.currentDate = e.target.value;
            this.loadPuzzleData();
        });

        // Buttons
        const showHintsBtn = document.getElementById('show-hints');
        const showAnswersBtn = document.getElementById('show-answers');

        showHintsBtn.addEventListener('click', () => {
            this.toggleHints();
        });

        showAnswersBtn.addEventListener('click', () => {
            this.toggleAnswers();
        });
    }

    setDefaultDate() {
        const dateSelect = document.getElementById('date-select');
        dateSelect.value = this.currentDate;
    }

    loadPuzzleData() {
        // Get puzzle data for current date
        this.currentData = getPuzzleData(this.currentDate);

        if (this.currentData) {
            this.updatePuzzleDisplay();
            this.resetState();
        }
    }

    updatePuzzleDisplay() {
        // Update puzzle date
        const puzzleDate = document.getElementById('puzzle-date');
        puzzleDate.textContent = this.currentData.date;

        // Update connection groups
        const connectionGroups = document.querySelectorAll('.connection-group');

        this.currentData.categories.forEach((category, index) => {
            const group = connectionGroups[index];
            if (group) {
                // Update category name
                const categoryName = group.querySelector('.category-name');
                categoryName.textContent = category.name;

                // Update category color
                group.setAttribute('data-category', category.color);

                // Clear existing word cards
                const wordsGrid = group.querySelector('.words-grid');
                wordsGrid.innerHTML = '';

                // Add word cards (empty initially)
                for (let i = 0; i < 4; i++) {
                    const wordCard = document.createElement('div');
                    wordCard.className = 'word-card empty';
                    wordCard.textContent = '???';
                    wordsGrid.appendChild(wordCard);
                }
            }
        });

        // Update hints
        this.updateHints();
    }

    updateHints() {
        if (!this.currentData) return;

        const hintColors = ['yellow', 'green', 'blue', 'purple'];

        hintColors.forEach(color => {
            const category = this.currentData.categories.find(cat => cat.color === color);
            if (category) {
                const hintElement = document.getElementById(`hint-${color}`);
                if (hintElement) {
                    hintElement.textContent = category.hint;
                }
            }
        });
    }

    toggleHints() {
        const hintsSection = document.getElementById('hints-section');
        const showHintsBtn = document.getElementById('show-hints');

        if (this.hintsVisible) {
            hintsSection.style.display = 'none';
            showHintsBtn.textContent = 'Show Hints';
            this.hintsVisible = false;
        } else {
            hintsSection.style.display = 'block';
            showHintsBtn.textContent = 'Hide Hints';
            this.hintsVisible = true;

            // Scroll to hints section
            hintsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    toggleAnswers() {
        const showAnswersBtn = document.getElementById('show-answers');

        if (this.answersVisible) {
            this.hideAnswers();
            showAnswersBtn.textContent = 'Show Answers';
        } else {
            this.showAnswers();
            showAnswersBtn.textContent = 'Hide Answers';
        }
    }

    showAnswers() {
        const connectionGroups = document.querySelectorAll('.connection-group');

        this.currentData.categories.forEach((category, groupIndex) => {
            const group = connectionGroups[groupIndex];
            if (group) {
                const wordCards = group.querySelectorAll('.word-card');

                category.words.forEach((word, cardIndex) => {
                    if (wordCards[cardIndex]) {
                        setTimeout(() => {
                            wordCards[cardIndex].classList.remove('empty');
                            wordCards[cardIndex].textContent = word;

                            // Add reveal animation
                            wordCards[cardIndex].style.transform = 'scale(1.05)';
                            setTimeout(() => {
                                wordCards[cardIndex].style.transform = 'scale(1)';
                            }, 200);
                        }, (groupIndex * 200) + (cardIndex * 100));
                    }
                });
            }
        });

        this.answersVisible = true;
    }

    hideAnswers() {
        const wordCards = document.querySelectorAll('.word-card');
        wordCards.forEach(card => {
            card.classList.add('empty');
            card.textContent = '???';
        });

        this.answersVisible = false;
    }

    resetState() {
        // Hide answers and hints when loading new puzzle
        this.answersVisible = false;
        this.hintsVisible = false;

        const hintsSection = document.getElementById('hints-section');
        hintsSection.style.display = 'none';

        const showHintsBtn = document.getElementById('show-hints');
        const showAnswersBtn = document.getElementById('show-answers');

        showHintsBtn.textContent = 'Show Hints';
        showAnswersBtn.textContent = 'Show Answers';
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ConnectionsApp();
});

// Add some utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'h' || e.key === 'H') {
        const showHintsBtn = document.getElementById('show-hints');
        showHintsBtn.click();
    } else if (e.key === 'a' || e.key === 'A') {
        const showAnswersBtn = document.getElementById('show-answers');
        showAnswersBtn.click();
    }
});

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});