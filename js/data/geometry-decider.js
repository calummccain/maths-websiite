// ========================================================
// Geometry/compactness decider
// 
// Inputs: n = geometry order: {*,*,n}
//         e = euclidean boundary
//         p = paracmpact boundary
// Output: Geometry & compactness
//
//     u   p   h   e   s
// |       |       |       |
// |-------|-------|-------|
// |       |       |       |
// 0       p       e     PI/2
// INF                     2
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function boundaries(n, e, p) {

    if (n <= 2) {

        return "error";

    } else if (n < e) {

        return "s";

    } else if (n == e) {

        return "e";

    } else if (n < p) {

        return "h";

    } else if (n == p) {

        return "p";

    } else {

        return "u";

    }

}

export { boundaries };