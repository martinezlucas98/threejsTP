# ThreeJS Car Race Track 🚥 🚗 🚓

A car race track designed with ThreeJS.

## Controls 🎮 🎮

There are two camera modes. To change between them just press a key that belongs to the desired mode (clicking with the mouse will NOT change the camera mode from locked to free!!), for example, to activate the free camera mode press the A key, and to activate the locked rotation mode press the Up key. More information about the keys below.

### Free camera mode 👻

The free camera mode lets you control the camera like a first person game. It implements the classic WASD keys to move + mouse to look around.

The **W** key moves the camera forward.

The **A** key moves the camera to the left.

The **S** key moves the camera backward.

The **D** key moves the camera to the right.

The **R** key moves the camera up.

The **F** key moves the camera down.

To look around just maintain left click and drag.

### Locked rotation mode ☀️

The locked rotation mode lets you rotate around a fixed predefined point P. It implements the arrows key to move around it.

The **Up** key makes the camera rotate vertically (upward) around point P.

The **Down** key makes the camera rotate vertically (downward) around point P.

The **Left** key makes the camera rotate horizontally (to the left) around point P.

The **Right** key makes the camera rotate horizontally (to the right) around point P.


## Extra (cool) features 🔥 🔥

### Sound 🔉

Press the **O** key to toggle the sound.

> Note: the sound from the helicopter and cars are positional... get closer to hear them louder!!

### Dev mode 💻

Press the **P** key to toggle the dev mode. This will display some spheres on the screen, used for dev purposes.

The green sphere represents the fixed point P for the locked rotation mode.

The white sphere represents the (0,0,0) point.

The blue sphere is used with the green one to form an axis used for the vertical rotations.

There is also a red sphere, which represents the camera's "look at" point during the rotations, which is the same as the fixed point P represented by the green sphere. Therefore it's located in the same position as the green sphere. That is why you cannot see the red sphere.

## Bugs 🐛 🐛

If a bug occurs please refresh the web page and check if it still occurs.

> For example, in just one of our many (hundreds) tests, while rotating, the up and down keys were inverted; This caused the vertical limits set for rotation to be exceeded, generating strange behaviors. Refreshing the web page solved it.