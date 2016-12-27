/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	/* globals AFRAME */
	AFRAME.registerComponent('auto-detect-controllers', {
	    schema: {
	        hand: { default: 'right' },
	        singlehand: { default: 'right' }
	    },

	    init: function () {
	        var el = this.el;
	        var self = this;
	        this.rescheduleCheck = true;
	        this.injectedControls = false;
	        // allow mock for testing
	        this.getGamepads = navigator.getGamepads;
	    },

	    update: function () {
	        var data = this.data;
	        var el = this.el;
	        this.rescheduleControllerTypeCheck = this.rescheduleControllerTypeCheck.bind(this);
	    },

	    play: function () {
	        this.rescheduleControllerTypeCheck();
	    },

	    pause: function () {
	        this.rescheduleCheck = false;
	        if (this.rescheduleCheckTimeout) { cancelTimeout(this.rescheduleCheckTimeout); }
	    },

	    injectOculusTouch: function () {
	        this.injectedControls = true;
	        this.el.setAttribute('tracked-controls', 'id', 'Oculus Touch ' + (this.data.hand === 'left' ? '(Left)' : '(Right)'));
	        this.el.setAttribute('tracked-controls', 'controller', '0');
	        this.el.setAttribute('tracked-controls', 'hand', this.data.hand); // although tracked-controls doesn't use this yet
	    },

	    injectVive: function () {
	        this.injectedControls = true;
	        this.el.setAttribute('tracked-controls', 'id', 'OpenVR Gamepad');
	        this.el.setAttribute('tracked-controls', 'controller', this.data.hand === 'left' ? '1' : '0');
	        this.el.setAttribute('tracked-controls', 'hand', this.data.hand); // although tracked-controls doesn't use this yet
	    },

	    injectGearVR: function () {
	        this.injectedControls = true;
	        if (this.data.hand === this.data.singlehand) {
	            this.el.setAttribute('gearvr-controls', 'hand', this.data.hand);
	        }
	    },

	    checkControllerType: function () {
	        if (this.injectedControls || !this.getGamepads) { return; }

	        var gamepads = this.getGamepads();
	        if (gamepads) {
	            for (var i = 0; i < gamepads.length; i++) {
	                var gamepad = gamepads[i];
	                if (gamepad) {
	                    if (gamepad.id.indexOf('Oculus Touch') === 0) {
	                        this.injectOculusTouch();
	                        break;
	                    }
	                    if (gamepad.id.indexOf('OpenVR Gamepad') === 0) {
	                        this.injectVive();
	                        break;
	                    }
	                }
	            }
	        }

	        if (AFRAME.utils.gearVRControls && AFRAME.utils.gearVRControls.isControllerPresent()) {
	            this.injectGearVR();
	        }
	    },

	    rescheduleControllerTypeCheck: function () {
	        this.checkControllerType();

	        this.rescheduleCheck = !this.injectedControls;
	        if (this.rescheduleCheck) {
	            this.rescheduleCheckTimeout = setTimeout(this.rescheduleControllerTypeCheck, 1000);
	        }
	    }
	});

/***/ }
/******/ ]);