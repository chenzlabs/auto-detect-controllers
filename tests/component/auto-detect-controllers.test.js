/* global assert, process, setup, suite, test */
var entityFactory = require('../helpers').entityFactory;
var componentName = 'auto-detect-controllers';

suite(componentName, function () {
  setup(function (done) {
    var el = this.el = entityFactory();
    el.setAttribute(componentName, '');
    el.addEventListener('loaded', function () {
      var component = el.components[componentName];
      component.getGamepads = function () { return component.getGamepadsMockValue; };
      done();
    });
  });

  suite('checkControllerType', function () {
    test('if no controllers, do not inject', function () {
      var el = this.el;
      var component = el.components[componentName];
      var injectOculusTouchSpy = this.sinon.spy(component, 'injectOculusTouch');
      var injectViveSpy = this.sinon.spy(component, 'injectVive');
      var injectGearVRSpy = this.sinon.spy(component, 'injectGearVR');
        // mock isControllerPresent to return false
      component.getGamepadsMockValue = [null, null, null, null];
      // reset so we don't think we've looked before
      delete component.injectedControls;
      // do the check
      component.checkControllerType();
      // check assertions
      assert.notOk(injectOculusTouchSpy.called);
      assert.notOk(injectViveSpy.called);
      assert.notOk(injectGearVRSpy.called);
      assert.notOk(component.injectedControls);
    });

    test('if Oculus Touch controllers and trackedcontrols true, inject tracked-controls', function (done) {
      var el = this.el;
      var component = el.components[componentName];
      var injectOculusTouchSpy = this.sinon.spy(component, 'injectOculusTouch');
      var injectViveSpy = this.sinon.spy(component, 'injectVive');
      var injectGearVRSpy = this.sinon.spy(component, 'injectGearVR');
      el.setAttribute(componentName, 'trackedcontrols', 'true');
      assert.equal(component.data.trackedcontrols, true);
      // mock isControllerPresent to return false
      component.getGamepadsMockValue = [{id: 'Oculus Touch (Left)'}, null, null];
      // reset so we don't think we've looked before
      delete component.injectedControls;
      // do the check
      component.checkControllerType();
      // check assertions
      assert.ok(injectOculusTouchSpy.calledOnce);
      assert.notOk(injectViveSpy.called);
      assert.notOk(injectGearVRSpy.called);
      assert.ok(component.injectedControls);
      process.nextTick(function () {
          assert.equal(component.data.hand, el.components['tracked-controls'].data.hand);
          done();
      });
    });

    test('if Oculus Touch controllers, inject oculus-touch-controls', function (done) {
        var el = this.el;
        var component = el.components[componentName];
        var injectOculusTouchSpy = this.sinon.spy(component, 'injectOculusTouch');
        var injectViveSpy = this.sinon.spy(component, 'injectVive');
        var injectGearVRSpy = this.sinon.spy(component, 'injectGearVR');
        // mock isControllerPresent to return false
        component.getGamepadsMockValue = [{ id: 'Oculus Touch (Left)' }, null, null];
        // reset so we don't think we've looked before
        delete component.injectedControls;
        // do the check
        component.checkControllerType();
        // check assertions
        assert.ok(injectOculusTouchSpy.calledOnce);
        assert.notOk(injectViveSpy.called);
        assert.notOk(injectGearVRSpy.called);
        assert.ok(component.injectedControls);
        process.nextTick(function () {
            assert.equal(component.data.hand, el.components['oculus-touch-controls'].data.hand);
            done();
        });
    });

    test('if Vive controllers and trackedcontrols true, inject tracked-controls', function (done) {
        var el = this.el;
        var component = el.components[componentName];
        var injectOculusTouchSpy = this.sinon.spy(component, 'injectOculusTouch');
        var injectViveSpy = this.sinon.spy(component, 'injectVive');
        var injectGearVRSpy = this.sinon.spy(component, 'injectGearVR');
        el.setAttribute(componentName, 'trackedcontrols', 'true');
        assert.equal(component.data.trackedcontrols, true);
        // mock isControllerPresent to return false
        component.getGamepadsMockValue = [{ id: 'OpenVR Gamepad' }, null, null, null];
        // reset so we don't think we've looked before
        delete component.injectedControls;
        // do the check
        component.checkControllerType();
        // check assertions
        assert.notOk(injectOculusTouchSpy.called);
        assert.ok(injectViveSpy.calledOnce);
        assert.notOk(injectGearVRSpy.called);
        assert.ok(component.injectedControls);
        process.nextTick(function () {
            assert.equal(component.data.hand, el.components['tracked-controls'].data.hand);
            done();
        });
    });

    test('if Vive controllers and not trackedcontrols, inject vive-controls', function (done) {
        var el = this.el;
        var component = el.components[componentName];
        var injectOculusTouchSpy = this.sinon.spy(component, 'injectOculusTouch');
        var injectViveSpy = this.sinon.spy(component, 'injectVive');
        var injectGearVRSpy = this.sinon.spy(component, 'injectGearVR');
        // mock isControllerPresent to return false
        component.getGamepadsMockValue = [{ id: 'OpenVR Gamepad' }, null, null];
        // reset so we don't think we've looked before
        delete component.injectedControls;
        // do the check
        component.checkControllerType();
        // check assertions
        assert.notOk(injectOculusTouchSpy.called);
        assert.ok(injectViveSpy.calledOnce);
        assert.notOk(injectGearVRSpy.called);
        assert.ok(component.injectedControls);
        process.nextTick(function () {
            assert.equal(component.data.hand, el.components['vive-controls'].data.hand);
            done();
        });
    });

    test('if injected and called again, do nothing', function () {
      var el = this.el;
      var component = el.components[componentName];
      var injectOculusTouchSpy = this.sinon.spy(component, 'injectOculusTouch');
      var injectViveSpy = this.sinon.spy(component, 'injectVive');
      var injectGearVRSpy = this.sinon.spy(component, 'injectGearVR');
      // set so we think we've looked before
      component.injectedControls = true;
      // do the check
      component.checkControllerType();
      // check assertions
      assert.notOk(injectOculusTouchSpy.called);
      assert.notOk(injectViveSpy.called);
      assert.notOk(injectGearVRSpy.called);
      assert.ok(component.injectedControls);
    });

    // skip since gearvr-controls is not part of core
    test.skip('if GearVR controllers supported and found, inject gearvr-controls', function (done) {
        var el = this.el;
        var component = el.components[componentName];
        var injectOculusTouchSpy = this.sinon.spy(component, 'injectOculusTouch');
        var injectViveSpy = this.sinon.spy(component, 'injectVive');
        var injectGearVRSpy = this.sinon.spy(component, 'injectGearVR');
        // mock isControllerPresent to return false
        component.getGamepadsMockValue = [{ id: 'Gear VR Touchpad' }, null, null, null];
        // reset so we don't think we've looked before
        delete component.injectedControls;
        // do the check
        component.checkControllerType();
        // check assertions
        assert.notOk(injectOculusTouchSpy.called);
        assert.notOk(injectViveSpy.called);
        assert.ok(injectGearVRSpy.calledOnce);
        assert.ok(component.injectedControls);
        process.nextTick(function () {
            assert.equal(component.data.hand, el.components['gearvr-controls'].data.hand);
            done();
        });
    });
  });
});
