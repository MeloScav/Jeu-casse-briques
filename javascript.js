let canvas = document.getElementById("jeuCanvas");      // On récupère le canvas
let context = canvas.getContext("2d");                  // On extrait le contexte, on précise le 2d

let x = canvas.width/2;         // Position x 
let y = canvas.height-30;       // Position y

let dx = 2;
let dy = -2;

let ballRadius = 10;        // Rayon du cercle dessiné

// Bouton D et G en false par défaut car non pressé
let rightPressed = false; 
let leftPressed = false;

// Hauteur et largueur de la palette
let paddleHeight = 10;
let paddleWidth = 75;
// Position sur l'axe X de la palette
let paddleX = (canvas.width-paddleWidth) / 2;

// Le score
let score = 0;

// Les vies
let lives = 3;

// Les briques
let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

let bricks = [];                                // Tableau de brick vide
for(let c=0; c<brickColumnCount; c++) {         // Colonnes
    bricks[c] = [];
    for(let r=0; r<brickRowCount; r++) {        // Rangées
      bricks[c][r] = { x: 0, y: 0, status: 1 };          // Objet avec position x et y
    }
}

// Evènement des touches
document.addEventListener("keydown", keyDownHandler, false);      // Touche enfoncé
document.addEventListener("keyup", keyUpHandler, false);          // Touche plus enfoncé
document.addEventListener("mousemove", mouseMoveHandler, false);    // Avec la souris au survol

// Lorsqu'on appuie
function keyDownHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {     // "ArrowRight" = curseur droit
      rightPressed = true;
  }
  else if(e.key == "Left" || e.key == "ArrowLeft") {    // Key = info sur la touche sélectionnné
      leftPressed = true;
  }
}
// Lorsqu'on relâche
function keyUpHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = false;
  }
  else if(e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = false;
  }
}

// Survol de la souris
function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width) {
      paddleX = relativeX - paddleWidth/2;
  }
}

// Gestion des collisions
function collisionDetection() {
  for(let c=0; c<brickColumnCount; c++) {
      for(let r=0; r<brickRowCount; r++) {
          let b = bricks[c][r];
          if(b.status == 1) {     // Si la brique est active (status vaut 1) alors on vérifie la collision, si collision alors le status devient 0 et la brique disparaît
            if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {     // position x de la balle supérieure à la position x de la brique ET position x de la balle inférieure à la position x de la brique + sa largeur ET position y de la balle supérieure à la position y de la brique ET position y de la balle inférieure à la position y de la brique + sa hauteur
                dy = -dy;
                b.status = 0;
                score++;
                if(score == brickRowCount*brickColumnCount) {     // Si toutes les briques ont été détruites
                  alert("Vous avez gagné !! Bravo !!");
                  document.location.reload();     // Recharge la page et redémarre le jeu lorsqu'on clic sur le bouton d'alert
              }
            }
        }
      }
  }
}

// SCORE
function drawScore() {              // Dessiner du texte sur une toile, c'est comme dessiner une forme
  context.font = "16px Arial";
  context.fillStyle = "#7C5096";
  context.fillText("Score: "+ score, 8, 20);       // Texte + valeur du score + les coordonnées (8 et 12)
}

// Les vies
function drawLives() {
  context.font = "16px Arial";
  context.fillStyle = "#7C5096";
  context.fillText("Lives: "+ lives, canvas.width-65, 20);
}

// On dessine la balle
function drawBall() {                 
    context.beginPath();
    context.arc(x, y, ballRadius, 0, Math.PI*2);
    context.fillStyle = "#B73ACB";
    context.fill();
    context.closePath();
  }

   // Dessine la palette
function drawPaddle() {       
    context.beginPath();
    context.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    context.fillStyle = "rgb(91, 165, 235)";
    context.fill();
    context.closePath();
  }

// On dessine les briques
function drawBricks() {
  for(var c=0; c<brickColumnCount; c++) {
      for(var r=0; r<brickRowCount; r++) {
        if(bricks[c][r].status == 1) {      // Si status = 1, la brique n'a pas été touchée donc on la dessine
          var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
          var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
          bricks[c][r].x = brickX;        // On parcours les rangés et colonnes pour définir la position x et y
          bricks[c][r].y = brickY;
          context.beginPath();
          context.rect(brickX, brickY, brickWidth, brickHeight);
          context.fillStyle = "#3F87DE";
          context.fill();
          context.closePath();
      }
      }
  }
}
  
  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
    
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {         // Lorsque la distance entre le centre de la balle et le bord du mur est exactement identique au rayon de la balle, on change la direction
        dx = -dx;
    }
    if(y + dy < ballRadius) {        // Si y (valeur de position) est plus petit que le radius
      dy = -dy;
   }
   else if(y + dy > canvas.height-ballRadius) {       // Lorsqu'il rentre en collision avec le bord inférieur 
      if(x > paddleX && x < paddleX + paddleWidth) {        // Si rentre en collision avec la raquette
           dy = -dy;
      }
      else {
        lives--;      // On diminue le nombre de vie
        if(!lives) {              // Si plus de vie, le jeu est perdu
            alert("PERDU !!");
            document.location.reload();
        }
        else {                        // S'il reste des vies, position de balle et raquette réinitilisée ainsi que mouvement balle
            x = canvas.width/2;
            y = canvas.height-30;
            dx = 2;
            dy = -2;
            paddleX = (canvas.width-paddleWidth)/2;
        }
      }
    }


    // La palette se déplace dans les limite du canvas
    if(rightPressed && paddleX < canvas.width - paddleWidth) {
      paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
      paddleX -= 7;
     }

    x += dx;    // On incrémente pour changer la position
    y += dy;
    requestAnimationFrame(draw);
  }

draw();


