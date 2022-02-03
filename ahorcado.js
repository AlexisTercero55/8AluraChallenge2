// globales
var canvas;
var context;
var trazo = 0;
var palabras = ['MEXICO',
                'COLOMBIA',
                'PERU',
                'CHILE',
                'ARGENTINA',
                'ECUADOR',
                'BOLIVIA',
                'BRASIL',
                'URUGUAY',
                'PARAGUAY',
                'VENEZUELA',
                ];
var palabra = '';
var letras = [];
var respuesta;

// la funcion insignia() dibuja una insignia en el canvas
function insignia()
{

}

// funcion para terminar el juego
// 1. mostrar palabra
// 2. mostrar 'juego terminado'
// 3. desactivar canvas
// 4. desactivar event listener
function gameOver(ganador=false)
{

    if(ganador)
    {
        // mostrar 'juego terminado'
        context.font = '60px serif';
        context.fillText('Felicidades', 800, 400);
        insignia();
    }else
        {
            // dibujar dos 'x' (rojas) como ojos dentro del circulo.
            //color de ojos: red
            context.fillStyle = 'red';
            context.font = '20px serif';
            context.fillText('x', 585,190);
            context.fillText('x', 615,190);

            // mostrar palabra
            context.fillStyle = '#F27949';
            context.font = '60px serif';
            
            for(let i=0; i<palabra.length; i++)
            {
                context.fillStyle = '#F27949';
                context.fillText(palabra[i], (i+1)*100, 800 - 100);
            }
            
            // mostrar 'juego terminado'
            context.fillStyle = '#F27949';
            context.font = '90px serif';
            context.fillText('GAME', 800, 300);
            context.fillText('OVER', 800, 400);
        }
    // desactivar canvas
    document.removeEventListener('keypress', detectarTecla);
    // limpiar array de letras
    letras = [];
}

function dibujarLinea(x1, y1, x2, y2, color='blue', grosor=8)
{
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = grosor;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
}

// funcion ahorcar (dibujar trazos del ahorcado)
function ahorcar()
{
    let color = '#FF8985';//'#DBAE87';
    // dibujar una parte del cuerpo del ahorcado
    switch(trazo)
    {
        case 0:
            // POSTE 1 (vertical)
            dibujarLinea(200, 550, 300, 50,color);
            break;
        case 1:
            // POSTE 2 (horizontal)
            dibujarLinea(200, 50, 600, 50,color);
            break;
        case 2:
            // POSTE 3 (vertical)
            dibujarLinea(500, 50, 600, 150,color);
            break;
        case 3:
            // CABEZA (CIRCULO r=50)
            context.strokeStyle = color;
            context.beginPath();
            context.arc(600, 200, 50, 0, 2 * Math.PI);
            context.stroke();
            break;
        case 4:
            // cuerpo (rectangulo de ancho 50 y alto 100)
            context.strokeStyle = color;
            context.beginPath();
            context.rect(600 - 25, 250, 50, 100);
            context.stroke();
            break;
        case 5:
            // brazo izquierdo (linea diagonal)
            dibujarLinea(600 - 25, 250, 500, 350,color);
            break;
        case 6:
            // brazo derecho (linea diagonal)
            dibujarLinea(600 + 25, 250, 700, 350,color);
            break;
        case 7:
            // pierna izquierda (linea diagonal)
            dibujarLinea(600 - 25, 350, 475, 450,color);
            break;
        case 8:
            // pierna derecha (linea diagonal)
            dibujarLinea(600 + 25, 350, 525, 450,color);
            break;

        default:
            // GAME OVER
            gameOver();
            break;
    }
    trazo++;
}


function juego(letra)
{
// funcion juego (ahorcado), pasos a seguir
// 1. Revisar ocurrencias de esa letra en la palabra y optener su indice.
//      1.1. si hay ocurrencias, dibujar la letra en el canvas
//      1.2. si no hay ocurrencias, dibujar una parte del cuerpo del ahorcado

    // revisar ocurrencias de esa letra en la palabra
    let ocurrencia = false;
    for(let i=0; i<palabra.length; i++)
    {
        if(palabra[i] == letra)
        {
            ocurrencia = true;
            // dibujar la letra en el canvas
            context.fillStyle = '#F27949';
            context.fillText(letra, (i+1)*100, 800 - 100);
            respuesta[i] = letra;
        }
    }
    if(!ocurrencia)
    {
        ahorcar();
    }else if(palabra == respuesta.join(''))
    {
        gameOver(true);
    }
}

// function to detect the key pressed
function detectarTecla(event)
{
    let letra = event.key;
    //si la letra no ha sido ingresada jugar
    if (!letras.includes(letra)) 
    {
        letras.push(letra);
        juego(letra);
    }
}

function iniciarJuego()
{
    // activar canvas para dibujar
    canvas = document.getElementById('ahorcado');
    context = canvas.getContext('2d');
    // limpiar canvas
    // context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.fillStyle = '#FFAD85';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // scroll down to canvas
    window.scrollTo(0, canvas.offsetTop);
    //console.log(canvas.offsetTop);
    // sortear palabra
    palabra = palabras[Math.floor(Math.random() * palabras.length)];
    // arreglo con '*' con el largo de la palabra
    respuesta = new Array(palabra.length).fill('*');
    console.log(palabra);

    // dubujar tablero de ahorcado 
    //(base y guiones bajos para cada letra en la palabra)

    // los guiones van en la parte de abajo del canvas
    let guiones = palabra.length;
    // let width = canvas.width;
    context.font = '60px serif';
    context.fillStyle = '#F27949';
    for (let i = 0; i < guiones; i++) {
        context.fillText('_', (i+1)*100, 800 - 100);
    }

    // detectar letras presionadas (logica del juego)
    trazo = 0;
    document.addEventListener('keypress', detectarTecla);
    // remove event listener
    // document.removeEventListener('keypress', detectarTecla);
}
// activar juego cuando se presione el boton #iniciar-juego
$('#iniciar-juego').click(iniciarJuego);