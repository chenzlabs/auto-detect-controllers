## aframe-auto-detect-controllers-component

Auto-Detect Controllers component for [A-Frame](https://aframe.io).

![Image of Controllers](http://cdn.uploadvr.com/wp-content/uploads/bfi_thumb/touch-vive-1000x562-mv5fiu8b2zbkc5p3gvlnwjc4hi5x1wrq2ro332248k.jpg)

[trackedcontrols]: https://github.com/aframevr/aframe/blob/master/docs/components/tracked-controls.md
[oculustouchcontrols]: https://github.com/aframevr/aframe/blob/master/docs/components/oculus-touch-controls.md
[vivecontrols]: https://github.com/aframevr/aframe/blob/master/docs/components/vive-controls.md
[gearvrcontrols]: https://github.com/chenzlabs/gearvr-controls/blob/master/README.md

The auto-detect-controllers component interfaces with the Gamepad API
to detect Oculus Touch or Vive tracked-position controllers, 
and when discovered it injects the appropriate controls e.g.
[tracked-controls][trackedcontrols], [oculus-touch-controls][oculustouchcontrols] or [vive-controls][vivecontrols].

If [gearvr-controls][gearvrcontrols] is included, it will also detect and inject that component.
See https://github.com/chenzlabs/gearvr-controls for more information on that component.

By default, the appropriate controls will be injected with their built-in model enabled,
so the user will see Vive or Oculus Touch controller models depending on which is detected.
(Note however that `gearvr-controls` does not supply a controller model.)

In some cases, it may be desirable for the developer to build their own model and/or functionality
atop the detected controller component, in which case there are two options:
- Set `model` to false, in which case the injected component is instructed not to use its built-in model.
- Set `trackedcontrols` to true, in which case the more generic component without model will be injected.

## Example

```html
<a-entity auto-detect-controllers></a-entity>
```

To also use `gearvr-controls`:

```html
<!-- include gearvr-controls component... -->
<script src="https://rawgit.com/chenzlabs/gearvr-controls/master/dist/aframe-gearvr-controls-component.min.js"></script>

<!-- then somewhere inside a-scene... -->
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
