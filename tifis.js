var tablero, direccion;

var teclas =
{
	UP: 38,
	DOWN: 40,
	LEFT: 37,
	RIGHT: 39
};

var fondo = {
	imagenURL: "fondo.png",
	imagenOK: false
};

var tifis = {
	x: 100,
	y: 100,
	frenteURL: "diana-frente.png",
	frenteOK: false,
	atrasURL: "diana-atras.png",
	atrasOK: false,
	derURL: "diana-der.png",
	derOK: false,
	izqURL: "diana-izq.png",
	izqOK: false,
	velocidad: 50
};

var liz = {
	lizURL: "liz.png",
	lizOK: false,
	x: 400,
	y: 200
};

function inicio ()
{
	var canvas = document.getElementById("campo");
	tablero = canvas.getContext("2d");

	fondo.imagen = new Image();
	fondo.imagen.src = fondo.imagenURL;
	fondo.imagen.onload = confirmarFondo;

	tifis.frente = new Image();
	tifis.frente.src = tifis.frenteURL;
	tifis.frente.onload = confirmarFrente;

	tifis.atras = new Image();
	tifis.atras.src = tifis.atrasURL;
	tifis.atras.onload = confirmarAtras;

	tifis.izq = new Image();
	tifis.izq.src = tifis.izqURL;
	tifis.izq.onload = confirmarIzq;

	tifis.der = new Image();
	tifis.der.src = tifis.derURL;
	tifis.der.onload = confirmarDer;

	liz.lizy = new Image();
	liz.lizy.src = liz.lizURL;
	liz.lizy.onload = confirmarLiz;

	document.addEventListener("keydown", teclado);

}

function teclado(datos)
{
	//Guardo en "codigo" el numero de la tecla oprimida
	var codigo = datos.keyCode;
	/**
	 * Mover hacia arriba
	 */
	if(codigo == teclas.UP)
	{
			// evitar atravezar a liz de abajo hacia arriba
		if(tifis.y == 250 && tifis.x == 400)
		{
			tifis.y = tifis.y;
			// evitar atravezar el bloque de la izquierda de abajo  hacia  arriba
		}else if(tifis.y == 250 && tifis.x < 150)
		{
			tifis.y = tifis.y;
		 	// evitar atravezar de abajo hacia arriba el bloque del medio
		}else if(tifis.y == 250 && tifis.x == 200)
		{
			tifis.y = tifis.y;
		 	// evitar salir de la parte superior del lienzo
		}else if(tifis.y == 0 && tifis.x < 500)
		{
			tifis.y = tifis.y;
		 	// evitar atravezar el tercer bloque de abajo hacia arriba
		}else if(tifis.y == 400 && tifis.x > 100)
		{
		 	tifis.y = tifis.y;
		}else{
			// mover a tifis por el resto del lienzo
			tifis.y -= tifis.velocidad;
		}
	}
	/**
	 * Mover hacia abajo
	 */
	if(codigo == teclas.DOWN)
	{
		  // evitar atravezar a liz de arriba hacia abajo
		if(tifis.y == 150 && tifis.x == 400)
		{
			tifis.y = tifis.y;
			// evitar atravezar el bloque de la izquierda de arriba hacia abajo
		}else if(tifis.y == 150 && tifis.x < 150)
		{
			tifis.y = tifis.y;

		}else if(tifis.y == 300 && tifis.x > 100)
		{
			tifis.y = tifis.y;
		}else if(tifis.y == 450 && tifis.x < 500)
		{
			tifis.y = tifis.y;
		}else{
			// mover a tifis por el resto del lienzo
			tifis.y += tifis.velocidad;
		}
	}
	/**
	 * Mover a la izquierda
	 */
	if(codigo == teclas.LEFT)
	{
			// evitar atravezar a liz de derecha a izquierda
		if(tifis.y == 200 && tifis.x == 450)
		{
			tifis.x = tifis.x;
			// evitar atravezar el bloque de la izquierda de derecha a izquierda
		}else if(tifis.y == 200 && tifis.x < 200)
		{
			tifis.x = tifis.x;
			// evitar atravezar de derecha a izquierda el bloque del medio
		}else if(tifis.y < 250 && tifis.x == 250)
		{
			tifis.x = tifis.x;
			// evitar salir de la parte superior del lienzo
		}else if(tifis.y < 500 && tifis.x == 0)
		{
			tifis.x = tifis.x;
		}else{
			// mover a tifis por el resto del lienzo
			tifis.x -= tifis.velocidad;
		}
	}
	/**
	 * Mover a la derecha
	 */
	if(codigo == teclas.RIGHT)
	{
		  // evitar atravezar a liz de izquierda a derecha
		if(tifis.y == 200 && tifis.x == 350)
	  {
		  tifis.x = tifis.x;
		  // evitar atravezar el bloque de abajo de izquierda a derecha
	  }else if(tifis.y == 350 && tifis.x == 100)
		{
			tifis.x = tifis.x;
			// evitar atravezar el bloque del medio de izquierda a derecha
		}else if(tifis.y < 250 && tifis.x == 150)
		{
			tifis.x = tifis.x;
			// evitar que salga fuera del canvas RIGHT 1
		}else if(tifis.y < 500 && tifis.x == 450)
		{
			tifis.x = tifis.x;
			// mover a tifis por el resto del lienzo
		}else{
			tifis.x += tifis.velocidad;
		}
	}
// console.log(tifis.y+" - "+tifis.x);
	direccion = codigo;

	dibujar();
}

function confirmarLiz ()
{
	liz.lizOK = true;
	dibujar();
}
function confirmarFondo ()
{
	fondo.imagenOK = true;
	dibujar();
}
function confirmarFrente ()
{
	tifis.frenteOK = true;
	dibujar();
}
function confirmarAtras ()
{
	tifis.atrasOK = true;
	dibujar();
}
function confirmarIzq ()
{
	tifis.izqOK = true;
	dibujar();
}
function confirmarDer ()
{
	tifis.derOK = true;
	dibujar();
}

function dibujar()
{
	//Capa 1: Fondo
	if(fondo.imagenOK == true)
	{
		tablero.drawImage(fondo.imagen, 0, 0);
	}

	//Capa 2: Liz
	// Como lizOK es booleana (verdadera o falsa), no necesito comparar
	if(liz.lizOK)
	{
		tablero.drawImage(liz.lizy, liz.x, liz.y);
	}

	//Capa 3: Tifis
	var tifiDibujo = tifis.frente;
	if(tifis.frenteOK && tifis.atrasOK && tifis.derOK && tifis.izqOK)
	{
		if(direccion == teclas.UP)
		{
			tifiDibujo = tifis.atras;
		}
		if(direccion == teclas.DOWN)
		{
			tifiDibujo = tifis.frente;
		}
		if(direccion == teclas.LEFT)
		{
			tifiDibujo = tifis.izq;
		}
		if(direccion == teclas.RIGHT)
		{
			tifiDibujo = tifis.der;
		}
		if (direccion == teclas.UP && tifis.y == 250 && tifis.x == 400) {
			console.log('enemiga');
		}
		//console.log(tifis.y+" - "+tifis.x);
		tablero.drawImage(tifiDibujo, tifis.x, tifis.y);
	}
}
