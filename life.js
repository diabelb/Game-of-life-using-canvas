/**
 * Class forming the next generations of game of life.
 * @param matrix Square array containing the current generation of game of life.
 * @param N Size of matrix.
 */
var life = function(matrix, N) {
    this.matrix = matrix;
    this.size = N;

    /*
     * Returns the number of cell neighbors of the given positions.
     */
    this.getNeighbors = function(x, y) {
        var neighbors = 0;

        for (var i=x-1; i<=x+1; i++) {
            if (i<0 || i> this.size-1) continue;
            for (var j=y-1; j<=y+1; j++) {
                if (j<0 || j>this.size-1 || i == x && j == y) continue;
                if(this.matrix[i][j] == 1) neighbors++;
            }
        }

        return neighbors;
    }

    /**
     * Returns 1 or 0 depending on whether the cell is alive or dead in the next generation.
     */
    this.evolution = function(x, y) {
        var neighbors = this.getNeighbors(x, y);

        if(this.matrix[x][y])
        {
            if (neighbors <= 1 || neighbors > 3) return 0;
            if (neighbors == 3 || neighbors == 2) return 1;
        }
        else {
            if (neighbors == 3) return 1;
        }
        return 0;
    }
}

/**
 * Returns matrix containing the next generation of cells from the game in life.
 */
life.prototype.nextGen = function() {

    var newMatrix = new matrix(this.size);
    var oldMatrix = this.matrix;
    for (var i=0; i<this.size; i++) {

        for (var j=0; j<this.size; j++) {
            newMatrix[i][j] = this.evolution(i, j);
        }
    }
    this.matrix = newMatrix;
    return this.matrix;
}

life.prototype.setMatrix = function(matrix) {
    this.matrix = matrix;
}

