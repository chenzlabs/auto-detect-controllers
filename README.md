## aframe-auto-detect-controllers-component

Auto-Detect Controllers component for [A-Frame](https://aframe.io).

[trackedcontrols]: ./tracked-controls.md
[oculustouchcontrols]: ./oculus-touch-controls.md
[vivecontrols]: ./vive-controls.md

The auto-detect-controllers component interfaces with the Gamepad API
to detect Oculus Touch or Vive tracked-position controllers, 
and when discovered it injects the appropriate controls e.g.
[tracked-controls][trackedcontrols], [oculus-touch-controls][oculustouchcontrols] or [vive-controls][vivecontrols].

## Example

```html
<a-entity auto-detect-controllers></a-entity>
```

## Value

| Property             | Description                                        | Default Value        |
|----------------------|----------------------------------------------------|----------------------|
| hand                 | When detected, inject controls with this hand.     | 'right'              |
| singlehand           | Single-hand controllers inject with this hand.     | 'right'              |
| trackedcontrols      | Inject `tracked-controls` not e.g. `vive-controls` | false                |
| model                | Inject with this model property value.             | true                 |

## Events

| Event Name   | Description             |
| ----------   | -----------             |

### Installation

#### Browser

Install and use by directly including the [browser files](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.4.0/aframe.min.js"></script>
  <script src="https://rawgit.com/chenzlabs/auto-detect-controllers/master/dist/aframe-auto-detect-controllers-component.min.js"></script>
</head>

<body>
  <a-scene>
    <!-- If detected, will use built-in controller model (e.g. Oculus Touch or Vive) -->
    <a-entity id="lefthand" auto-detect-controllers="hand:left"></a-entity>
    <a-entity id="righthand" auto-detect-controllers="hand:right"></a-entity>
  </a-scene>
</body>
```

#### npm

Install via npm:

```bash
npm install aframe-auto-detect-controllers-component
```

Then register and use.

```js
require('aframe');
require('aframe-auto-detect-controllers-component');
```
