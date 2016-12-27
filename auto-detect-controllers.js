/* globals AFRAME */
AFRAME.registerComponent('auto-detect-controllers', {
    schema: {
        hand: { type: 'string', default: 'right' },
        trackedcontrols: { type: 'boolean', default: true },
        singlehand: { type: 'string', default: 'right' }
    },

    init: function () {
        var el = this.el;
        var self = this;
        this.rescheduleCheck = true;
        this.injectedControls = false;
        this.checkControllerType = this.checkControllerType.bind(this);
        this.rescheduleControllerTypeCheck = this.rescheduleControllerTypeCheck.bind(this);
        // allow mock for testing
        this.getGamepads = function () { return navigator.getGamepads && navigator.getGamepads(); };
    },

    update: function () {
        var data = this.data;
        var el = this.el;
    	// TODO
    },

    play: function () {
        this.rescheduleControllerTypeCheck();
    },

    pause: function () {
        this.rescheduleCheck = false;
        if (this.rescheduleCheckTimeout) {
            clearTimeout(this.rescheduleCheckTimeout);
            delete this.rescheduleCheckTimeout;
        }
    },

    injectOculusTouch: function () {
        var component = this.data.trackedcontrols ? 'tracked-controls' : 'oculus-touch-controls';
        if (this.data.trackedcontrols) {
            this.el.setAttribute('tracked-controls', 'id', 'Oculus Touch ' + (this.data.hand === 'left' ? '(Left)' : '(Right)'));
            this.el.setAttribute('tracked-controls', 'controller', '0');
        }
        this.el.setAttribute(component, 'hand', this.data.hand); // although tracked-controls doesn't use this yet
        this.injectedControls = true;
    },

    injectVive: function () {
        var component = this.data.trackedcontrols ? 'tracked-controls' : 'vive-controls';
        if (this.data.trackedcontrols) {
            this.el.setAttribute('tracked-controls', 'id', 'OpenVR Gamepad');
            this.el.setAttribute('tracked-controls', 'controller', this.data.hand === 'left' ? '1' : '0');
        }
        this.el.setAttribute(component, 'hand', this.data.hand); // although tracked-controls doesn't use this yet
        this.injectedControls = true;
    },

    injectGearVR: function () {
        if (this.data.hand === this.data.singlehand) {
            this.el.setAttribute('gearvr-controls', 'hand', this.data.hand);
        }
        this.injectedControls = true;
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
