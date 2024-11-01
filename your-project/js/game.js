let coins = 0;
let earnings = 0;
let currentEnergy = 100;
const INITIAL_ENERGY = 100;
const ENERGY_RECOVERY_RATE = 1;
let energyInterval;
let experience = 0;
let level = 1;
const experienceToLevelUp = [100, 1000];

const hamsterElement = document.getElementById('hamster');
const playerNameElement = document.getElementById('playerName');
const earningsDisplay = document.getElementById('earnings');
const energyDisplay = document.getElementById('energy');
const levelDisplay = document.getElementById('level');
const experienceDisplay = document.getElementById('experience');
const experienceProgress = document.getElementById('experienceProgress');
const modalOverlay = document.getElementById('modalOverlay');

hamsterElement.addEventListener('click', handleTap);
document.getElementById('settingsButton').addEventListener('click', openModal);
document.getElementById('hamsterTab').addEventListener('click', () => showTab('mainTab'));
document.getElementById('incomeTab').addEventListener('click', () => showTab('incomeTab'));
document.getElementById('upgradesTab').addEventListener('click', () => showTab('upgradesTab'));

function updateDisplay() {
    playerNameElement.innerText = `Монети: ${coins}`;
    earningsDisplay.innerText = earnings.toFixed(2);
    energyDisplay.innerText = currentEnergy;
    levelDisplay.innerText = level;
    updateExperienceDisplay();
}

function handleTap() {
    if (currentEnergy > 0) {
        coins += 1;
        experience += 1;
        currentEnergy -= 1;
        updateDisplay();

        if (experience >= experienceToLevelUp[level - 1]) {
            level += 1;
            experience = 0;
            if (level <= experienceToLevelUp.length) {
                alert(`Вітаємо! Ви підвищили рівень до ${level}!`);
            } else {
                alert("Максимальний рівень досягнуто!");
            }
        }
    } else {
        alert("Немає енергії!");
    }
}

function updateExperienceDisplay() {
    experienceDisplay.innerText = `${experience}/${experienceToLevelUp[level - 1]}`;
    updateExperienceProgress();
}

function updateExperienceProgress() {
    const progressWidth = (experience / experienceToLevelUp[level - 1]) * 100;
    experienceProgress.style.width = `${progressWidth}%`;
}

function openModal() {
    modalOverlay.style.display = 'flex';
}

function closeModal() {
    modalOverlay.style.display = 'none';
}

function restartGame() {
    earnings = 0;
    currentEnergy = INITIAL_ENERGY;
    experience = 0;
    level = 1;
    updateDisplay();
    closeModal();
}

function deleteAccount() {
    alert('Акаунт видалено!');
    closeModal();
}

function chooseLanguage() {
    alert('Вибір мови!');
    closeModal();
}

function showTab(tabId) {
    document.getElementById('incomeTabContent').style.display = 'none';
    document.getElementById('upgradesTabContent').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'none';

    if (tabId === 'mainTab') {
        document.getElementById('gameContainer').style.display = 'flex';
        updateEnergyDisplay();
    } else if (tabId === 'incomeTab') {
        document.getElementById('incomeTabContent').style.display = 'block';
    } else if (tabId === 'upgradesTab') {
        document.getElementById('upgradesTabContent').style.display = 'block';
    }
}

function updateEnergyDisplay() {
    energyDisplay.textContent = currentEnergy;
}

function startEnergyRecovery() {
    energyInterval = setInterval(() => {
        if (currentEnergy < INITIAL_ENERGY) {
            currentEnergy += ENERGY_RECOVERY_RATE;
            updateDisplay();
        }
    }, 2000);
}

startEnergyRecovery();
// Функція для відкриття вкладки
function openTab(tabName) {
    // Отримуємо всі елементи з класом "tab-content"
    let tabContents = document.getElementsByClassName("tab-content");

    // Проходимо через всі вкладки і ховаємо їх
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
    }

    // Показуємо тільки вибрану вкладку
    document.getElementById(tabName + "TabContent").style.display = "block";
}

// Обробка натискань на кнопки навігації
document.getElementById("hamsterTab").addEventListener("click", function() {
    openTab("hamster");
});
document.getElementById("incomeTab").addEventListener("click", function() {
    openTab("income");
});
document.getElementById("upgradesTab").addEventListener("click", function() {
    openTab("upgrades");
});
