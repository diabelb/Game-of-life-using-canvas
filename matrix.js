/**
 * Creates matrix NxN
 */
var matrix = function(N) {
    var m = new Array(N);
    for (i=0; i < N; i++) {
        m[i] = new Array(N);
        for (j=0; j<N; j++) {
            m[i][j] = 0;
        }
    }
    return m;
};