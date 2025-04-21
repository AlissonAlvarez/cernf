// Stop speech on page unload or navigation
window.addEventListener('beforeunload', () => {
    window.speechSynthesis.cancel();
});

// Mostrar/ocultar el panel de accesibilidad
function toggleAccessibilityPanel() {
    const panel = document.getElementById('accessibilityPanel');
    panel.classList.toggle('active');
}

// Close panel
function closeAccessibilityPanel() {
    const panel = document.getElementById('accessibilityPanel');
    panel.classList.remove('active');
    window.speechSynthesis.cancel(); // Stop any ongoing speech
}

// Perfiles de accesibilidad
function applyProfile(profile) {
    resetAccessibility();
    const body = document.body;

    switch (profile) {
        case 'motor-disability':
            toggleBiggerCursor();
            toggleTextSpacing();
            break;
        case 'blindness':
            readPage();
            toggleHighlightLinks();
            break;
        case 'color-blindness':
            toggleSaturation();
            break;
        case 'dyslexia':
            toggleDyslexiaFont();
            toggleTextSpacing();
            toggleLineHeight();
            break;
        case 'low-vision':
            toggleBiggerText();
            toggleSmartContrast();
            break;
        case 'cognitive':
            toggleTextSpacing();
            toggleLineHeight();
            togglePauseAnimations();
            break;
        case 'seizures':
            togglePauseAnimations();
            toggleSaturation();
            break;
        case 'adhd':
            togglePauseAnimations();
            toggleHighlightLinks();
            break;
    }
}

// Read selected text
function readSelection() {
    const selection = window.getSelection().toString().trim();
    if (selection) {
        const utterance = new SpeechSynthesisUtterance(selection);
        utterance.lang = 'es-ES';
        window.speechSynthesis.speak(utterance);
    }
    const steps = document.querySelectorAll('.accessibility-options button:nth-child(1) .steps .step');
    steps[0].classList.toggle('active', !!selection);
}

// Read body content
function readPage() {
    const bodyContent = document.body.innerText;
    const utterance = new SpeechSynthesisUtterance(bodyContent);
    utterance.lang = 'es-ES';
    window.speechSynthesis.speak(utterance);
    const steps = document.querySelectorAll('.accessibility-options button:nth-child(2) .steps .step');
    steps[0].classList.toggle('active', true);
}

// Alternar modo de contraste
let contrastMode = 0;
function toggleContrast() {
    const body = document.body;
    const steps = document.querySelectorAll('.accessibility-options button:nth-child(3) .steps .step');
    
    contrastMode = (contrastMode + 1) % 4;
    body.classList.remove('contrast-dark', 'contrast-light', 'contrast-invert');
    
    if (contrastMode === 1) body.classList.add('contrast-dark');
    else if (contrastMode === 2) body.classList.add('contrast-light');
    else if (contrastMode === 3) body.classList.add('contrast-invert');

    steps.forEach((step, index) => {
        step.classList.toggle('active', index < contrastMode);
    });
}

// Contraste inteligente
let smartContrast = false;
function toggleSmartContrast() {
    const body = document.body;
    const steps = document.querySelectorAll('.accessibility-options button:nth-child(4) .steps .step');
    
    smartContrast = !smartContrast;
    body.classList.toggle('smart-contrast', smartContrast);
    steps[0].classList.toggle('active', smartContrast);
}

// Resaltar enlaces
let highlightLinks = false;
function toggleHighlightLinks() {
    const body = document.body;
    const steps = document.querySelectorAll('.accessibility-options button:nth-child(5) .steps .step');
    
    highlightLinks = !highlightLinks;
    body.classList.toggle('highlight-links', highlightLinks);
    steps[0].classList.toggle('active', highlightLinks);
}

// Agrandar texto
let textSizeLevel = 0;
function toggleBiggerText() {
    const body = document.body;
    const steps = document.querySelectorAll('.accessibility-options button:nth-child(6) .steps .step');
    
    textSizeLevel = (textSizeLevel + 1) % 5;
    body.classList.remove('bigger-text');
    
    if (textSizeLevel > 0) {
        body.classList.add('bigger-text');
        body.style.fontSize = `${1 + textSizeLevel * 0.2}em`;
    }

    steps.forEach((step, index) => {
        step.classList.toggle('active', index < textSizeLevel);
    });
}

// Espaciado de texto
let textSpacingLevel = 0;
function toggleTextSpacing() {
    const body = document.body;
    const steps = document.querySelectorAll('.accessibility-options button:nth-child(7) .steps .step');
    
    textSpacingLevel = (textSpacingLevel + 1) % 4;
    body.classList.remove('spacing-text');
    
    if (textSpacingLevel > 0) {
        body.classList.add('spacing-text');
        document.querySelectorAll('p, li').forEach(el => {
            el.style.letterSpacing = `${0.05 * textSpacingLevel}em`;
            el.style.wordSpacing = `${0.1 * textSpacingLevel}em`;
        });
    }

    steps.forEach((step, index) => {
        step.classList.toggle('active', index < textSpacingLevel);
    });
}

// Pausar animaciones
let pauseAnimations = false;
function togglePauseAnimations() {
    const body = document.body;
    const steps = document.querySelectorAll('.accessibility-options button:nth-child(8) .steps .step');
    
    pauseAnimations = !pauseAnimations;
    body.classList.toggle('pause-animations', pauseAnimations);
    steps[0].classList.toggle('active', pauseAnimations);
}

// Ocultar imágenes
let imagesHidden = false;
function toggleHideImages() {
    const body = document.body;
    const steps = document.querySelectorAll('.accessibility-options button:nth-child(9) .steps .step');
    
    imagesHidden = !imagesHidden;
    body.classList.toggle('hide-images', imagesHidden);
    steps[0].classList.toggle('active', imagesHidden);
}

// Fuente para dislexia
let dyslexiaMode = false;
function toggleDyslexiaFont() {
    const body = document.body;
    const steps = document.querySelectorAll('.accessibility-options button:nth-child(10) .steps .step');
    
    dyslexiaMode = !dyslexiaMode;
    body.classList.toggle('dyslexia-font', dyslexiaMode);
    steps.forEach((step, index) => {
        step.classList.toggle('active', index < (dyslexiaMode ? 2 : 0));
    });
}

// Cursor mejorado
let cursorLevel = 0;
function toggleBiggerCursor() {
    const body = document.body;
    const steps = document.querySelectorAll('.accessibility-options button:nth-child(11) .steps .step');
    
    cursorLevel = (cursorLevel + 1) % 4;
    body.classList.remove('bigger-cursor');
    
    if (cursorLevel > 0) {
        body.classList.add('bigger-cursor');
    }

    steps.forEach((step, index) => {
        step.classList.toggle('active', index < cursorLevel);
    });
}

// Información sobre herramientas (tooltips)
let tooltips = false;
function toggleTooltips() {
    const body = document.body;
    const steps = document.querySelectorAll('.accessibility-options button:nth-child(12) .steps .step');
    
    tooltips = !tooltips;
    body.classList.toggle('show-tooltips', tooltips);
    steps[0].classList.toggle('active', tooltips);
}

// Estructura de la página
let pageStructure = false;
function togglePageStructure() {
    const body = document.body;
    const steps = document.querySelectorAll('.accessibility-options button:nth-child(13) .steps .step');
    
    pageStructure = !pageStructure;
    body.classList.toggle('page-structure', pageStructure);
    steps[0].classList.toggle('active', pageStructure);
}

// Altura de línea
let lineHeightLevel = 0;
function toggleLineHeight() {
    const body = document.body;
    const steps = document.querySelectorAll('.accessibility-options button:nth-child(14) .steps .step');
    
    lineHeightLevel = (lineHeightLevel + 1) % 4;
    body.classList.remove('line-height');
    
    if (lineHeightLevel > 0) {
        body.classList.add('line-height');
        document.querySelectorAll('p, li').forEach(el => {
            el.style.lineHeight = `${1.5 + lineHeightLevel * 0.5}`;
        });
    }

    steps.forEach((step, index) => {
        step.classList.toggle('active', index < lineHeightLevel);
    });
}

// Alineación de texto
let textAlignMode = 0;
function toggleTextAlign() {
    const body = document.body;
    const steps = document.querySelectorAll('.accessibility-options button:nth-child(15) .steps .step');
    
    textAlignMode = (textAlignMode + 1) % 4;
    body.classList.remove('text-align-left', 'text-align-center', 'text-align-right');
    
    if (textAlignMode === 1) body.classList.add('text-align-left');
    else if (textAlignMode === 2) body.classList.add('text-align-center');
    else if (textAlignMode === 3) body.classList.add('text-align-right');

    steps.forEach((step, index) => {
        step.classList.toggle('active', index < textAlignMode);
    });
}

// Cambiar saturación
let saturationMode = 0;
function toggleSaturation() {
    const body = document.body;
    const steps = document.querySelectorAll('.accessibility-options button:nth-child(16) .steps .step');
    
    saturationMode = (saturationMode + 1) % 3;
    body.classList.remove('saturation-low', 'saturation-high');
    
    if (saturationMode === 1) body.classList.add('saturation-low');
    else if (saturationMode === 2) body.classList.add('saturation-high');

    steps.forEach((step, index) => {
        step.classList.toggle('active', index < saturationMode);
    });
}

// Restablecer todas las configuraciones
function resetAccessibility() {
    const body = document.body;
    contrastMode = 0;
    smartContrast = false;
    highlightLinks = false;
    textSizeLevel = 0;
    textSpacingLevel = 0;
    pauseAnimations = false;
    imagesHidden = false;
    dyslexiaMode = false;
    cursorLevel = 0;
    tooltips = false;
    pageStructure = false;
    lineHeightLevel = 0;
    textAlignMode = 0;
    saturationMode = 0;

    body.classList.remove(
        'contrast-dark', 'contrast-light', 'contrast-invert', 'smart-contrast',
        'highlight-links', 'bigger-text', 'spacing-text', 'pause-animations',
        'hide-images', 'dyslexia-font', 'bigger-cursor', 'show-tooltips',
        'page-structure', 'line-height', 'text-align-left', 'text-align-center',
        'text-align-right', 'saturation-low', 'saturation-high'
    );
    body.style.fontSize = '';
    document.querySelectorAll('p, li').forEach(el => {
        el.style.letterSpacing = '';
        el.style.wordSpacing = '';
        el.style.lineHeight = '';
    });

    document.querySelectorAll('.accessibility-options .steps .step').forEach(step => {
        step.classList.remove('active');
    });

    document.querySelector('.profiles select').value = '';
    document.getElementById('accessibilityPanel').classList.remove('active');
    window.speechSynthesis.cancel(); // Detener lector de pantalla
}