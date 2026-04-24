/**
 * Cyber Terminal — JavaScript
 * Typewriter effect and button interactions
 */

(function() {
    'use strict';

    // ============================================
    // Configuration
    // ============================================
    const CONFIG = {
        typewriterText: 'Loading system... Welcome.',
        typewriterSpeed: 75,
        cursorBlinkSpeed: 530
    };

    // ============================================
    // DOM Elements
    // ============================================
    const elements = {
        typewriter: document.getElementById('typewriter'),
        cursor: document.querySelector('.cursor'),
        buttons: document.querySelectorAll('.cmd-btn')
    };

    // ============================================
    // Typewriter Effect
    // ============================================
    let typewriterTimeout = null;
    let charIndex = 0;

    /**
     * Initialize typewriter effect
     */
    function initTypewriter() {
        if (!elements.typewriter) return;

        elements.typewriter.textContent = '';
        charIndex = 0;
        typeNextChar();
    }

    /**
     * Type next character
     */
    function typeNextChar() {
        if (charIndex < CONFIG.typewriterText.length) {
            elements.typewriter.textContent += CONFIG.typewriterText.charAt(charIndex);
            charIndex++;
            typewriterTimeout = setTimeout(typeNextChar, CONFIG.typewriterText.charAt(charIndex - 1) === '.' ? 300 : CONFIG.typewriterSpeed);
        }
    }

    /**
     * Stop typewriter effect
     */
    function stopTypewriter() {
        if (typewriterTimeout) {
            clearTimeout(typewriterTimeout);
            typewriterTimeout = null;
        }
    }

    // ============================================
    // Button Interactions
    // ============================================
    /**
     * Handle button click
     * @param {MouseEvent} event
     */
    function handleButtonClick(event) {
        const button = event.currentTarget;
        const command = button.dataset.cmd;

        switch (command) {
            case 'launch':
                showAlert('Команда выполнена: Запуск терминала...', 'success');
                break;
            case 'demo':
                showAlert('Команда выполнена: Запуск демо-режима...', 'info');
                break;
            case 'docs':
                showAlert('Команда выполнена: Открытие документации...', 'info');
                break;
            case 'contact':
                showAlert('Команда выполнена: contact@cyber-terminal.io', 'info');
                break;
            default:
                showAlert('Команда выполнена: Неизвестная команда', 'warning');
        }
    }

    /**
     * Show alert message
     * @param {string} message
     * @param {string} type
     */
    function showAlert(message, type) {
        const titles = {
            success: '✓ ВЫПОЛНЕНО',
            info: 'ℹ ИНФОРМАЦИЯ',
            warning: '⚠ ВНИМАНИЕ'
        };

        const title = titles[type] || titles.info;
        alert(`${title}\n\n${message}`);
    }

    // ============================================
    // Random Glitch Effect
    // ============================================
    let glitchInterval = null;

    /**
     * Start random glitch effect
     */
    function startRandomGlitch() {
        const glitchElement = document.querySelector('.glitch-text');

        if (!glitchElement) return;

        // Random glitch every 5-10 seconds
        glitchInterval = setInterval(() => {
            if (Math.random() > 0.7) {
                triggerGlitch(glitchElement);
            }
        }, 5000 + Math.random() * 5000);
    }

    /**
     * Trigger single glitch effect
     * @param {HTMLElement} element
     */
    function triggerGlitch(element) {
        element.classList.add('glitch-active');

        setTimeout(() => {
            element.classList.remove('glitch-active');
        }, 300);
    }

    // ============================================
    // Keyboard Navigation
    // ============================================
    /**
     * Handle keyboard navigation for buttons
     * @param {KeyboardEvent} event
     */
    function handleKeyboard(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            const activeElement = document.activeElement;

            if (activeElement.classList.contains('cmd-btn')) {
                event.preventDefault();
                activeElement.click();
            }
        }
    }

    // ============================================
    // Initialization
    // ============================================
    /**
     * Initialize all functionality
     */
    function init() {
        // Start typewriter
        initTypewriter();

        // Add button listeners
        elements.buttons.forEach(button => {
            button.addEventListener('click', handleButtonClick);
            button.addEventListener('keydown', handleKeyboard);
        });

        // Start random glitch
        startRandomGlitch();

        // Add console welcome message
        console.log('%c╔══════════════════════════════════════╗', 'color: #00FF41');
        console.log('%c║   CYBER TERMINAL — SYSTEM READY     ║', 'color: #00FF41');
        console.log('%c║   Minimal Hosting for Developers   ║', 'color: #00FFFF');
        console.log('%c╚══════════════════════════════════════╝', 'color: #00FF41');
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();