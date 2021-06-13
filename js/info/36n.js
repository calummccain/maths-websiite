// ========================================================
// LaTeX data for 36n
// 
// Inputs: 
// Output:
//
// Change history:
//     11/06/21 Initial commit
//=========================================================

const info = {
    3: {
        name: `\\[\\{3,6,3\\}\\]`,
        a: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 1 & 0 & 0\\\\
            0 & 0 & -\\frac{1}{2} & \\frac{3}{2}\\\\
            0 & 0 & \\frac{1}{2} & \\frac{1}{2}
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
            \\frac{3}{2} & -\\frac{1}{8} & -\\frac{1}{4} & -\\frac{3}{4}\\\\
            2 & \\frac{1}{2} & -1 & -3\\\\
            1 & -\\frac{1}{4} & \\frac{1}{2} & -\\frac{3}{2}\\\\
            1 & -\\frac{1}{4} & -\\frac{1}{2} & -\\frac{1}{2}
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
        metric: `\\[16 w^2 - x^2 - 4 y^2 - 12 z^2 = 0\\]`
    },
    n: {
        name: `\\[\\{3,6,n\\}\\]`,
        a: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 1 & 0 & 0\\\\
            0 & 0 & -\\frac{1}{2} & \\frac{3}{2}\\\\
            0 & 0 & \\frac{1}{2} & \\frac{1}{2}
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
            1 + 2 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & -2 \\cos^4 \\left ( \\frac{\\pi}{n} \\right ) & -\\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & -3 \\cos^2 \\left ( \\frac{\\pi}{n} \\right )\\\\
            2 & 1 - 2 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & -1 & -3\\\\
            1 & -\\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & \\frac{1}{2} & -\\frac{3}{2}\\\\
            1 & -\\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & -\\frac{1}{2} & -\\frac{1}{2}
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
        metric: `\\[w^2 - \\cos^4 \\left ( \\frac{\\pi}{n} \\right ) x^2 - \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) y^2 - 3 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) z^2 = 1 - 4 \\cos^2 \\left ( \\frac{\\pi}{n} \\right )\\]`
    }

}

export { info }