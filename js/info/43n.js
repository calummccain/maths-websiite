// ========================================================
// LaTeX data for 43n
// 
// Inputs: 
// Output:
//
// Change history:
//     11/06/21 Initial commit
//=========================================================

const info = {
    3: {
        name: `\\[ \\{4,3,3\\} \\]`,
        a: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 1 & 0 & 0\\\\
            0 & 0 & 1 & 0\\\\
            0 & 0 & 0 & -1
            \\end{pmatrix}
            \\]`,
        b: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 1 & 0 & 0\\\\                
            0 & 0 & 0 & 1\\\\
            0 & 0 & 1 & 0
            \\end{pmatrix}
            \\]`,
        c: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 0 & 1 & 0\\\\
            0 & 1 & 0 & 0\\\\
            0 & 0 & 0 & 1
            \\end{pmatrix}
            \\]`,
        d: `\\[
            \\begin{pmatrix}
            0 & 1 & 0 & 0\\\\
            1 & 0 & 0 & 0\\\\
            0 & 0 & 1 & 0\\\\
            0 & 0 & 0 & 1
            \\end{pmatrix}
            \\]`,
        metric: `\\[ w^2 + x^2 + y^2 + z^2 = 4 \\]`
    },
    4: {
        name: `\\[\\{4,3,4\\}\\]`,
        a: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 1 & 0 & 0\\\\
            0 & 0 & 1 & 0\\\\
            0 & 0 & 0 & -1
            \\end{pmatrix}
            \\]`,
        b: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 1 & 0 & 0\\\\                
            0 & 0 & 0 & 1\\\\
            0 & 0 & 1 & 0
            \\end{pmatrix}
            \\]`,
        c: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 0 & 1 & 0\\\\
            0 & 1 & 0 & 0\\\\
            0 & 0 & 0 & 1
            \\end{pmatrix}
            \\]`,
        d: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            2 & -1 & 0 & 0\\\\
            0 & 0 & 1 & 0\\\\
            0 & 0 & 0 & 1
            \\end{pmatrix}
            \\]`,
        metric: `\\[ w^2 = 0 \\]`
    },
    5: {
        name: `\\[\\{4,3,5\\}\\]`,
        a: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 1 & 0 & 0\\\\
            0 & 0 & 1 & 0\\\\
            0 & 0 & 0 & -1
            \\end{pmatrix}
            \\]`,
        b: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 1 & 0 & 0\\\\                
            0 & 0 & 0 & 1\\\\
            0 & 0 & 1 & 0
            \\end{pmatrix}
            \\]`,
        c: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 0 & 1 & 0\\\\
            0 & 1 & 0 & 0\\\\
            0 & 0 & 0 & 1
            \\end{pmatrix}
            \\]`,
        d: `\\[
            \\begin{pmatrix}
            \\phi & -\\frac{1}{\\phi} & 0 & 0\\\\
            \\phi^2 & -\\phi & 0 & 0\\\\
            0 & 0 & 1 & 0\\\\
            0 & 0 & 0 & 1
            \\end{pmatrix}
            \\]`,
        metric: `\\[ \\phi^4 w^2 - \\phi \\left ( x^2 + y^2 + z^2 \\right ) = 2 \\]`
    },
    6: {
        name: `\\[\\{4,3,6\\}\\]`,
        a: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 1 & 0 & 0\\\\
            0 & 0 & 1 & 0\\\\
            0 & 0 & 0 & -1
            \\end{pmatrix}
            \\]`,
        b: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 1 & 0 & 0\\\\                
            0 & 0 & 0 & 1\\\\
            0 & 0 & 1 & 0
            \\end{pmatrix}
            \\]`,
        c: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 0 & 1 & 0\\\\
            0 & 1 & 0 & 0\\\\
            0 & 0 & 0 & 1
            \\end{pmatrix}
            \\]`,
        d: `\\[
            \\begin{pmatrix}
            2 & -1 & 0 & 0\\\\
            3 & -2 & 0 & 0\\\\
            0 & 0 & 1 & 0\\\\
            0 & 0 & 0 & 1
            \\end{pmatrix}
            \\]`,
        metric: `\\[ 3 w^2 - x^2 - y^2 - z^2 = 0 \\]`
    },
    n: {
        name: `\\[ \\{4,3,n\\} \\]`,
        a: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 1 & 0 & 0\\\\
            0 & 0 & 1 & 0\\\\
            0 & 0 & 0 & -1
            \\end{pmatrix}
            \\]`,
        b: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 1 & 0 & 0\\\\                
            0 & 0 & 0 & 1\\\\
            0 & 0 & 1 & 0
            \\end{pmatrix}
            \\]`,
        c: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 0 & 1 & 0\\\\
            0 & 1 & 0 & 0\\\\
            0 & 0 & 0 & 1
            \\end{pmatrix}
            \\]`,
        d: `\\[
            \\begin{pmatrix}
            1 + 2 \\cos \\left ( \\frac{2 \\pi}{n} \\right ) & -2 \\cos \\left ( \\frac{2 \\pi}{n} \\right ) & 0 & 0\\\\
            2 + 2 \\cos \\left ( \\frac{ 2\\pi}{n} \\right ) & -1 - 2 \\cos \\left ( \\frac{2 \\pi}{n} \\right ) & 0 & 0\\\\
            0 & 0 & 1 & 0\\\\
            0 & 0 & 0 & 1
            \\end{pmatrix}
            \\]`,
        metric: `\\[ 2 \\cot^2 \\left( \\frac{\\pi}{n} \\right ) w^2 - \\left (\\cot^2 \\left ( \\frac{\\pi}{n} \\right ) - 1 \\right ) \\left ( x^2 + y^2 + z^2 \\right ) = 3 - \\cot^2 \\left ( \\frac{\\pi}{n} \\right ) \\]`
    }

}

export { info }