// Define your keyboard layout here
// Use string for normal keys: 'A'
// Use array for dual-function keys: ['A', 'Ctrl'] (tap: A, hold: Ctrl)
const layouts = {
    base: {
        left: [
            ['Q', 'W', 'E', 'R', 'T'],
            [['A', 'LShift'], ['S', 'LCtrl'], ['D', 'LOS'], ['F', 'LAlt'], 'G'],
            ['Z', 'X', 'C', 'V', 'B'],
            [['LOS', 'LShift'], ['Bksp', 'Layer left']]
        ],
        right: [
            ['Y', 'U', 'I', 'O', 'P'],
            ['H', ['J', 'RAlt'], ['K', 'ROS'], ['L', 'RCtrl'], ['Ñ', 'RShift']],
            ['N', 'M', ',', '.', '-'],
            [['Space', 'Layer right'], ['Enter', 'Layer Quantums']]
        ]
    },
    left: {
        left: [
            ['1', '2', '3', '4', '5'],
            ['$', '{', '}', '[', ']'],
            ['/', '¿', '?', '*', '&'],
            ['∆', 'N/A'],
        ],
        right: [
            ['∆', '∆', '∆', '∆', '∆'],
            ['∆', '∆', '∆', '∆', '∆'],
            ['∆', '∆', '∆', '∆', '∆'],
            ['∆', 'Delete'],
        ]
    },
    right: {
        left: [
            ['∆', '∆', '∆', '∆', '∆'],
            ['∆', '∆', '∆', '∆', '∆'],
            ['∆', '∆', '∆', '∆', '∆'],
            ['∆', '∆'],
        ],
        right: [
            ['6', '7', '8', '9', '0'],
            ['Up', 'Left', 'Right', 'Down', 'ç' ],
            ['(', ')', '!', "`", "´"],
            ['N/A', '∆'],
        ]
    },
    quantums: {
        left: [
            ['F1', 'F2', 'F3', 'F4', 'F5'],
            ['V+', '∆', '∆', 'Tab', 'Esc'],
            ['V-', '"', '@', '#', '∆'],
            ['∆', '∆'],
        ],
        right: [
            ['F6', 'F7', 'F8', 'F9', 'F10'],
            ['\'', '∆', 'Mouse', 'Num', '∆'],
            ['∆','=', '%', '¡', 'Eject'],
            ['∆', '∆'],
        ],
    },
    mouse: {
        left: [],
        right: [],
    },
    numpad: {
        left: [],
        right: [],
    }
};
// /¿?*&

function renderKey(keyData: string | string[]) {
    const keyDiv = document.createElement('div');

    if (Array.isArray(keyData)) {
        // Dual-function key (tap/hold)
        keyDiv.className = 'key dual';
        keyDiv.innerHTML =
            '<div class="key-content">' +
            '<span class="key-tap">' + keyData[0] + '</span>' +
            '<div class="key-divider"></div>' +
            '<span class="key-hold">' + keyData[1] + '</span>' +
            '</div>';
        keyDiv.title = 'Tap: ' + keyData[0] + ' | Hold: ' + keyData[1];
    } else {
        // Normal key
        keyDiv.className = 'key';
        keyDiv.innerHTML = '<span class="key-single">' + keyData + '</span>';
    }

    return keyDiv;
}

function renderKeyboard(layoutName: string) {
    const layout = layouts[layoutName as keyof typeof layouts];
    const container = document.createElement('div');

    // Layer title
    const layerTitle = document.createElement('div');
    layerTitle.className = 'layer-info';
    layerTitle.textContent = layoutName.charAt(0).toUpperCase() + layoutName.slice(1) + ' Layer';
    container.appendChild(layerTitle);

    // Keyboard
    const keyboard = document.createElement('div');
    keyboard.className = 'keyboard';

    // Left half
    const leftHalf = document.createElement('div');
    leftHalf.className = 'half left';
    layout.left.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row';
        row.forEach(keyData => {
            rowDiv.appendChild(renderKey(keyData));
        });
        leftHalf.appendChild(rowDiv);
    });

    // Right half
    const rightHalf = document.createElement('div');
    rightHalf.className = 'half right';
    layout.right.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row';
        row.forEach(keyData => {
            rowDiv.appendChild(renderKey(keyData));
        });
        rightHalf.appendChild(rowDiv);
    });

    keyboard.appendChild(leftHalf);
    keyboard.appendChild(rightHalf);
    container.appendChild(keyboard);

    return container;
}

function renderAllKeyboards() {
    const allKeyboards = document.getElementById('allKeyboards');
    if (allKeyboards) {
        allKeyboards.innerHTML = '';

        Object.keys(layouts).forEach(layoutName => {
            allKeyboards.appendChild(renderKeyboard(layoutName));
        });
    }
}

// Initial render
renderAllKeyboards();
