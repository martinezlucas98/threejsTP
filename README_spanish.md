# ThreeJS Car Race Track 🚥 🚗 🚓

Un circuito de carrera de coches diseñado con ThreeJS.

## Controles 🎮 🎮

Hay dos modos de cámara. Para cambiar entre ellos solo presione una tecla que pertenezca al modo deseado (hacer clic con el mouse NO cambiará el modo de cámara de bloqueado a libre!!), por ejemplo, para activar el modo de cámara libre presione la tecla A, y para activar el modo de rotación bloqueada presione la tecla Arriba. Más información sobre las teclas a continuación.

### Modo de cámara libre 👻

El modo de cámara libre te permite controlar la cámara como en un juego en primera persona. Implementa las clásicas teclas WASD para moverse + mouse para mirar alrededor.

La tecla **W** mueve la cámara hacia adelante.

La tecla **A** mueve la cámara hacia la izquierda.

La tecla **S** mueve la cámara hacia atrás.

La tecla **D** mueve la cámara hacia la derecha.

La tecla **R** mueve la cámara hacia arriba.

La tecla **F** mueve la cámara hacia abajo.

Para mirar alrededor, simplemente mantenga el clic izquierdo y arrastre.

### Modo de rotación bloqueada ☀️

El modo de rotación bloqueada le permite rotar alrededor de un punto fijo predefinido P. Implementa la tecla de flechas para moverse alrededor de él.

La tecla **Arriba** hace que la cámara gire verticalmente (hacia arriba) alrededor del punto P.

La tecla **Abajo** hace que la cámara gire verticalmente (hacia abajo) alrededor del punto P.

La tecla **Izquierda** hace que la cámara gire horizontalmente (hacia la izquierda) alrededor del punto P.

La tecla **Derecha** hace que la cámara gire horizontalmente (hacia la derecha) alrededor del punto P.

## Funciones (cool) adicionales 🔥 🔥

### Sonido 🔉

Presione la tecla **O** para alternar el sonido de apagado a encendido y viceversa.

> Nota: los sonidos del helicóptero y de los coches son posicionales ... ¡acércate para escucharlos más fuerte!

## Sensibilidad del ratón 🐁️

Puede aumentar o disminuir la sensibilidad del mouse para mirar alrededor en el modo de cámara libre.

Presione la tecla **Coma** (**,**) para disminuir la sensibilidad del mouse en uno.

Presione la tecla **Punto** (**.**) para aumentar la sensibilidad del mouse en uno.

El valor predeterminado para la sensibilidad del mouse es 1.

El valor mínimo es 1.

### Modo desarrollador 💻

Presione la tecla **P** para alternar el modo de desarrollo de desactivado a activado y viceversa. Esto mostrará algunas esferas en la pantalla, utilizadas con fines de desarrollo.

La esfera verde representa el punto fijo P para el modo de rotación bloqueada.

La esfera blanca representa el punto (0,0,0).

La esfera azul se usa con la verde para formar un eje usado para las rotaciones verticales.

También hay una esfera roja, que representa el punto de "mirada" (look at) de la cámara durante las rotaciones, que es el mismo que el punto fijo P representado por la esfera verde. Por lo tanto, está ubicado en la misma posición que la esfera verde. Por eso no puedes ver la esfera roja.

## Bugs 🐛 🐛

Si ocurre un error o bug, actualice la página web y verifique si aún ocurre.

> Por ejemplo, en solo una de nuestras muchas (cientos) pruebas, mientras se rotaba, las teclas arriba y abajo estaban invertidas; Esto ocasionó que se superen los límites verticales puestos para la rotación, generando comportamientos extraños. Actualizar la página web lo solucionó. (**¡Este error ya ha sido arreglado!**🤩️).
