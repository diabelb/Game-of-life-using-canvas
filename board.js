/**
 * Class draws grid.
 * @param id ID of the canvas
 * @param size number of pixels in a row
 */
var board = function(id, size) {
    this.id = id;
    this.size = size;
    this.canvas = document.getElementById(this.id);
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.step = this.width/this.size;
    this.matrix = new matrix(this.size);

    /**
     * draws new board
     * Private method - not to run manually
     */
    this.drawBoard = function() {
        var ctx = this.canvas.getContext('2d');
        var x = 0;
        var y = 0;
        while (y < this.height) {
            while (x < this.width) {
                ctx.strokeRect(x, y, this.step, this.step);
                x += this.step;
            }
            x = 0;
            y += this.step;
        }
    };

    /**
     * handles the event onclick
     * Private method - not to run manually
     */
    this.change = function(object) {
        object.canvas.addEventListener("click", function(e) {
            var x = parseInt((e.pageX - object.canvas.offsetLeft)/object.step);
            var y = parseInt((e.pageY - object.canvas.offsetTop)/object.step);
            if (object.matrix[x][y] == 0)
                object.put(x, y);
            else
                object.get(x,y);
        }, false);
    };
    
    this.drawBoard();
    this.change(this);
};



/**
 * Update the grid data from a given matrix.
 * @param newMatrix Matrix with data to update.
 */
board.prototype.updateBoard = function(newMatrix) {
    var oldMatrix = this.matrix;

    for (var i=0; i < this.size; i++) {
        for (var j=0; j < this.size; j++) {
            if (oldMatrix[i][j] != newMatrix[i][j])
                if (newMatrix[i][j] == 0)
                    this.get(i, j);
                else
                    this.put(i, j);

        }
    }
    this.matrix = newMatrix;
};

/**
 * Pops a pixel with the position.
 * @param x position x.
 * @param y position y.
 */
board.prototype.get = function(x,y) {
    this.matrix[x][y] = 0;
    var ctx = this.canvas.getContext('2d');
    ctx.clearRect(x*this.step,y*this.step,this.step,this.step);
    ctx.strokeRect(x*this.step,y*this.step,this.step,this.step);
};

/**
 * Put a pixel with the position.
 * @param x position x.
 * @param y position y.
 */
board.prototype.put = function(x,y) {
    this.matrix[x][y] = 1;
    var ctx = this.canvas.getContext('2d');
    ctx.fillRect(x*this.step,y*this.step,this.step,this.step);
};

/**
 * Return matrix with current board
 */
board.prototype.getMatrix = function() {
    return this.matrix;
};

/**
 * Clean board.
 */
board.prototype.clear = function() {
    this.updateBoard(new matrix(this.size));
}




