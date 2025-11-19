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
            ['V+', '"', '#', 'Tab', 'Esc'],
            ['V-', '¨', '@', '<', '>'],
            ['∆', '∆'],
        ],
        right: [
            ['F6', 'F7', 'F8', 'F9', 'F10'],
            ['\'', 'Base', 'Mouse', 'Num', '∆'],
            ['+','=', '%', '¡', 'Eject'],
            ['∆', '∆'],
        ],
    },
    mouse: {
        left: [
            ['N/A', 'M5e 3', 'M5e 2', 'M5e 1', 'N/A'],
            ['LShift', 'Cntrl', 'LOS', 'LAlt', 'N/A'],
            ['End', 'Page Down', 'Page Up', 'Home', 'N/A'],
            ['∆', '∆'],
        ],
        right: [
            ['N/A', 'M5e 1', 'M5e 2', 'M5e 3', 'N/A'],
            ['M5e<br />Left', 'M5e<br />Up', 'M5e<br />Down', 'M5e<br />Right', 'N/A'],
            ['M5e<br />Scr Left', 'M5e<br />Scr Up', 'M5e<br />Scr Down', 'M5e<br />Scr Right', 'N/A'],
            ['∆', 'Base'],
        ],
    },
    numpad: {
        left: [
            ['Debug', 'N/A', 'N/A', 'N/A', 'N/A'],
            ['Reboot', 'N/A', 'N/A', 'N/A', 'N/A'],
            ['Boot', 'N/A', 'N/A', 'N/A', 'N/A'],
            ['∆', '∆'],
        ],
        right: [
            ['*', '7', '8', '9', '-'],
            ['/', '4', '5', '6', '+'],
            ['0', '1', '2', '3', '.'],
            ['∆', 'Base'],
        ],
    }
};

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
    container.setAttribute('data-layer', layoutName);

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

    // Generate print checkboxes
    generatePrintCheckboxes();
}

function generatePrintCheckboxes() {
    const checkboxContainer = document.getElementById('printCheckboxes');
    if (!checkboxContainer) return;

    checkboxContainer.innerHTML = '';

    Object.keys(layouts).forEach(layoutName => {
        const checkboxItem = document.createElement('div');
        checkboxItem.className = 'checkbox-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `print-${layoutName}`;
        checkbox.checked = true; // Default: all layers enabled for print
        checkbox.addEventListener('change', () => toggleLayerPrint(layoutName, checkbox.checked));

        const label = document.createElement('label');
        label.htmlFor = `print-${layoutName}`;
        label.textContent = layoutName.charAt(0).toUpperCase() + layoutName.slice(1);

        checkboxItem.appendChild(checkbox);
        checkboxItem.appendChild(label);
        checkboxContainer.appendChild(checkboxItem);
    });
}

function toggleLayerPrint(layoutName: string, shouldPrint: boolean) {
    const layerElements = document.querySelectorAll(`[data-layer="${layoutName}"]`);
    layerElements.forEach(element => {
        if (shouldPrint) {
            element.classList.remove('no-print');
        } else {
            element.classList.add('no-print');
        }
    });
}

// Initial render
renderAllKeyboards();
