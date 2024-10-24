function setup() {
  createCanvas(512, 512);
  noLoop();
}

function draw() {
  background(255);
  strokeWeight(0);
  let rows = 3; // numero di righe
  let columns = 3; // numero di colonne
  let numStages = 9; // numero di stage (i 9 quadrati principali nella griglia 3x3)
  let stageIndex = 0; // variable che serve a spostarsi allo stage successivo

  for (let n = 1; n <= numStages; n++) { // n = 1 e n <= numStages (anziche' n = 0 e n < numStages) perche' n serve dopo come esponente
    let gridSize;
    let cellSize;
    
    if (n === 1) { // il primo quadrato è completamente bianco
      gridSize = 1; // potrebbe essere qualsiasi cosa
      cellSize = width / columns;  // grandezza di ogni = 1, motivo per cui il valore di gridSize non importa
    } else {
      // Shift all the XOR grids by one stage
      gridSize = pow(2, n - 1);  // determina la grandezza della griglia: 2^1 per lo stage 2, 2^2 per lo stage 3, etc
      cellSize = width / (columns * gridSize);  // calcola la grandezza di ogni quadrato DENTRO agli stage (quelli che a ogni stage diventano sempre più piccoli)
    }

    // calcolo della posizione per piazzare ogni griglia
    let xOffset = (stageIndex % columns) * width / columns;
    let yOffset = floor(stageIndex / columns) * height / rows;

    // caso speciale per il primo stage (tutto bianco)
    if (n === 1) {
      fill(255);
      rect(xOffset, yOffset, width / columns, height / rows); // rettangolo che riempie perfettamente il primo stage
    } else {
      // ciclo che gestisce gli altri stage
      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          let xorValue = (gridSize - 1 - i) ^ j;  // creazione del pattern (quadrati scuri vanno da in basso a sinistra a in alto a destra)
          let grayColor = map(xorValue, 0, gridSize - 1, 0, 255);  // regolazione del colore
          fill(grayColor);
          rect(xOffset + j * cellSize, yOffset + i * cellSize, cellSize, cellSize);  // creazione di tutti i quadrati
        }
      }
    }

    stageIndex++;  // prosegue allo stage successivo
  }
}