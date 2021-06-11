// ========================================================
// LaTeX data for 44n
// 
// Inputs: 
// Output:
//
// Change history:
//     11/06/21 Initial commit
//=========================================================

const info = {
    3: {
        name: `\\[ \\{4,4,3\\} \\]`,
        a: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 1 & 0 & 0\\\\
            0 & 0 & 0 & 1\\\\
            0 & 0 & 1 & 0
            \\end{pmatrix}
            \\]`,
        b: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 1 & 0 & 0\\\\                
            0 & 0 & 1 & 0\\\\
            0 & 0 & 0 & -1
            \\end{pmatrix}
            \\]`,
        c: `\\[
            \\begin{pmatrix}
            \\frac{3}{2} & -\\frac{1}{8} & -\\frac{1}{2} & -\\frac{1}{2}\\\\
            2 & \\frac{1}{2} & -2 & -2\\\\
            1 & -\\frac{1}{4} & 0 & -1\\\\
            1 & \\frac{1}{4} & -1 & 0
            \\end{pmatrix}
            \\]`,
        d: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & -1 & 0 & 0\\\\
            0 & 0 & 1 & 0\\\\
            0 & 0 & 0 & 1
            \\end{pmatrix}
            \\]`,
        metric: `\\[ 16 w^2 + x^2 + 8 y^2 + 8 z^2 = 8 \\]`
    },
    4: {
        name: `\\[ \\{4,4,4\\} \\]`,
        a: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 1 & 0 & 0\\\\
            0 & 0 & 0 & 1\\\\
            0 & 0 & 1 & 0
            \\end{pmatrix}
            \\]`,
        b: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 1 & 0 & 0\\\\                
            0 & 0 & 1 & 0\\\\
            0 & 0 & 0 & -1
            \\end{pmatrix}
            \\]`,
        c: `\\[
            \\begin{pmatrix}
            2 & -\\frac{1}{2} & -1 & -1\\\\
            2 & 0 & -2 & -2\\\\
            1 & -\\frac{1}{2} & 0 & -1\\\\
            1 & -\\frac{1}{2} & -1 & 0
            \\end{pmatrix}
            \\]`,
        d: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & -1 & 0 & 0\\\\
            0 & 0 & 1 & 0\\\\
            0 & 0 & 0 & 1
            \\end{pmatrix}
            \\]`,
        metric: `\\[ 4 w^2 - x^2 - 4 y^2 - 4 z^2 = 0 \\]`
    },
    n: {
        name: `\\[ \\{4,4,n\\} \\]`,
        a: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 1 & 0 & 0\\\\
            0 & 0 & 0 & 1\\\\
            0 & 0 & 1 & 0
            \\end{pmatrix}
            \\]`,
        b: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 1 & 0 & 0\\\\                
            0 & 0 & 1 & 0\\\\
            0 & 0 & 0 & -1
            \\end{pmatrix}
            \\]`,
        c: `\\[
            \\begin{pmatrix}
            1 + 2 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & -2 \\cos^4 \\left ( \\frac{\\pi}{n} \\right ) & -2 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & -2 \\cos^2 \\left ( \\frac{\\pi}{n} \\right )\\\\
            2 & 1 - 2 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & -2 & -2\\\\
            1 & -\\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & 0 & -1\\\\
            1 & -\\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & -1 & 0
            \\end{pmatrix}
            \\]`,
        d: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & -1 & 0 & 0\\\\
            0 & 0 & 1 & 0\\\\
            0 & 0 & 0 & 1
            \\end{pmatrix}
            \\]`,
        metric: `\\[w^2 - \\cos^4 \\left ( \\frac{\\pi}{n} \\right ) x^2 - 2 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) y^2 - 2 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) z^2 = 1 - 2 \\cos^2 \\left ( \\frac{\\pi}{n} \\right )\\]`
    }

}

export { info }