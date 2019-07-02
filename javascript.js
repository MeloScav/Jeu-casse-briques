let canvas = document.getElementById("jeuCanvas");      // On récupère le canvas
let context = canvas.getContext("2d");                  // On extrait le contexte, on précise le 2d

let x = canvas.width/2;
let y = canvas.height-30;

let dx = 2;
let dy = -2;

let ballRadius = 10;        // Rayon du cercle dessiné

function drawBall() {                  // On dessine la balle
    context.beginPath();
    context.arc(x, y, ballRadius, 0, Math.PI*2);
    context.fillStyle = "#1F52BF";
    context.fill();
    context.closePath();
  }
  
  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    x += dx;
    y += dy;
  }

setInterval(draw, 10);          // fonction draw exécuté toute les 10 milisecondes



/*
//  Brique  
context.beginPath();                // Début d'un nouveau tracé
context.rect(20, 40, 50, 50);                     // Donne la position, les 2 premiers : coordonnées point gauche, les deux suivant: largueur et hauteur
context.fillStyle = "rgb(142,65,151)";
context.fill();                            // Dessine le rectangle
context.closePath();                // Fin du tracé

//  Balle  
context.beginPath();
context.arc(240, 160, 13, 0, Math.PI*2, false);      // Décalage du point central de l’arc de cercle par rapport au bord gauche du canvas, correspondant au décalage du point central de l’arc de cercle par rapport au bord supérieur du canvas, taille du rayon, angle de départ en radian,angle de fin en radian, false = sens des aiguilles d'une montre
context.fillStyle = "rgb(31, 82, 191)";             // Cercle plein 
context.fill();
context.closePath();

// Rectangle vide
context.beginPath();
context.rect(160, 10, 100, 40);
context.strokeStyle = "rgba(91, 165, 235, 0.8)";
context.stroke();                                   // Rectangle vide
context.closePath();
*/