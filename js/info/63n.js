// ========================================================
// LaTeX data for 63n
// 
// Inputs: 
// Output:
//
// Change history:
//     12/06/21 Initial commit
//=========================================================

const info = {
    3: {
        name: `\\[ \\{6,3,3\\} \\]`,
        a: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 1 & 0 & 0\\\\
            0 & 0 & \\frac{1}{2} & \\frac{3}{2}\\\\
            0 & 0 & \\frac{1}{2} & -\\frac{1}{2}
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
            1 + 2 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & -2 \\cos^4 \\left ( \\frac{\\pi}{n} \\right ) & -\\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & -\\cos^2 \\left ( \\frac{\\pi}{n} \\right )\\\\
            2 & 1 - 2 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & -1 & -1\\\\
            2 & -3 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & -\\frac{1}{2} & -\\frac{3}{2}\\\\
            3 & -\\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & -\\frac{1}{2} & \\frac{1}{2}
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
        metric: `\\[ 3 w^2 - 3 \\cos^4 \\left ( \\frac{\\pi}{n} \\right ) x^2 - \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) y^2 - 3 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) z^2 = 3 - 4 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) \\]`
    },
    4: {
        name: `\\[ \\{6,3,4\\} \\]`,
        a: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 1 & 0 & 0\\\\
            0 & 0 & \\frac{1}{2} & \\frac{3}{2}\\\\
            0 & 0 & \\frac{1}{2} & -\\frac{1}{2}
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
            1 + 2 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & -2 \\cos^4 \\left ( \\frac{\\pi}{n} \\right ) & -\\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & -\\cos^2 \\left ( \\frac{\\pi}{n} \\right )\\\\
            2 & 1 - 2 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & -1 & -1\\\\
            2 & -3 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & -\\frac{1}{2} & -\\frac{3}{2}\\\\
            3 & -\\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & -\\frac{1}{2} & \\frac{1}{2}
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
        metric: `\\[ 3 w^2 - 3 \\cos^4 \\left ( \\frac{\\pi}{n} \\right ) x^2 - \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) y^2 - 3 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) z^2 = 3 - 4 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) \\]`
    },
    5: {
        name: `\\[ \\{6,3,5\\} \\]`,
        a: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 1 & 0 & 0\\\\
            0 & 0 & \\frac{1}{2} & \\frac{3}{2}\\\\
            0 & 0 & \\frac{1}{2} & -\\frac{1}{2}
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
            1 + 2 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & -2 \\cos^4 \\left ( \\frac{\\pi}{n} \\right ) & -\\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & -\\cos^2 \\left ( \\frac{\\pi}{n} \\right )\\\\
            2 & 1 - 2 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & -1 & -1\\\\
            2 & -3 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & -\\frac{1}{2} & -\\frac{3}{2}\\\\
            3 & -\\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & -\\frac{1}{2} & \\frac{1}{2}
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
        metric: `\\[ 3 w^2 - 3 \\cos^4 \\left ( \\frac{\\pi}{n} \\right ) x^2 - \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) y^2 - 3 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) z^2 = 3 - 4 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) \\]`
    },
    6: {
        name: `\\[ \\{6,3,6\\} \\]`,
        a: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 1 & 0 & 0\\\\
            0 & 0 & \\frac{1}{2} & \\frac{3}{2}\\\\
            0 & 0 & \\frac{1}{2} & -\\frac{1}{2}
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
            1 + 2 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & -2 \\cos^4 \\left ( \\frac{\\pi}{n} \\right ) & -\\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & -\\cos^2 \\left ( \\frac{\\pi}{n} \\right )\\\\
            2 & 1 - 2 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & -1 & -1\\\\
            2 & -3 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & -\\frac{1}{2} & -\\frac{3}{2}\\\\
            3 & -\\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & -\\frac{1}{2} & \\frac{1}{2}
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
        metric: `\\[ 16 w^2 - 9 x^2 - 4 y^2 - 12 z^2 = 0 \\]`
    },
    n: {
        name: `\\[ \\{6,3,n\\} \\]`,
        a: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 1 & 0 & 0\\\\
            0 & 0 & \\frac{1}{2} & \\frac{3}{2}\\\\
            0 & 0 & \\frac{1}{2} & -\\frac{1}{2}
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
            1 + 2 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & -2 \\cos^4 \\left ( \\frac{\\pi}{n} \\right ) & -\\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & -\\cos^2 \\left ( \\frac{\\pi}{n} \\right )\\\\
            2 & 1 - 2 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & -1 & -1\\\\
            2 & -3 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & -\\frac{1}{2} & -\\frac{3}{2}\\\\
            3 & -\\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & -\\frac{1}{2} & \\frac{1}{2}
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
        metric: `\\[ 3 w^2 - 3 \\cos^4 \\left ( \\frac{\\pi}{n} \\right ) x^2 - \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) y^2 - 3 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) z^2 = 3 - 4 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) \\]`
    },

}

export { info }