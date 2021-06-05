// ========================================================
// LaTeX data for 34n
// 
// Inputs: 
// Output:
//
// Change history:
//     04/06/21 Initial commit
//=========================================================

const info = {
    3: {
        name: `\\[\\{3,4,3\\}\\]`,
        a: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 0 & 1 & 0\\\\
            0 & 1 & 0 & 0\\\\
            0 & 0 & 0 & 1
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
            0 & 1 & 0 & 0\\\\
            0 & 0 & 1 & 0\\\\
            0 & 0 & 0 & -1
            \\end{pmatrix}
            \\]`,
        d: `\\[
            \\begin{pmatrix}
            \\frac{1}{2} & \\frac{1}{2} & \\frac{1}{2} & \\frac{1}{2}\\\\
            \\frac{1}{2} & \\frac{1}{2} & -\\frac{1}{2} & -\\frac{1}{2}\\\\
            \\frac{1}{2} & -\\frac{1}{2} & \\frac{1}{2} & -\\frac{1}{2}\\\\
            \\frac{1}{2} & -\\frac{1}{2} & -\\frac{1}{2} & \\frac{1}{2}
            \\end{pmatrix}
            \\]`,
        metric: `\\[w^2 + x^2 + y^2 + z^2 = 2\\]`
    },
    4: {
        name: `\\[\\{3,4,4\\}\\]`,
        a: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 0 & 1 & 0\\\\
            0 & 1 & 0 & 0\\\\
            0 & 0 & 0 & 1
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
            0 & 1 & 0 & 0\\\\
            0 & 0 & 1 & 0\\\\
            0 & 0 & 0 & -1
            \\end{pmatrix}
            \\]`,
        d: `\\[
            \\begin{pmatrix}
            2 & -1 & -1 & -1\\\\
            1 & 0 & -1 & -1\\\\
            1 & -1 & 0 & -1\\\\
            1 & -1 & -1 & 0
            \\end{pmatrix}
            \\]`,
        metric: `\\[w^2 - x^2 - y^2 - z^2 = 1\\]`
    },
    n: {
        name: `\\[\\{3,4,n\\}\\]`,
        a: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 0 & 1 & 0\\\\
            0 & 1 & 0 & 0\\\\
            0 & 0 & 0 & 1
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
            0 & 1 & 0 & 0\\\\
            0 & 0 & 1 & 0\\\\
            0 & 0 & 0 & -1
            \\end{pmatrix}
            \\]`,
        d: `\\[
            \\begin{pmatrix}
            6 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) - 1 & 2 - \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & 2 - \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & 2 - \\cos^2 \\left ( \\frac{\\pi}{n} \\right )\\\\
            2 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & 1 - 2 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & -2 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & -2 \\cos^2 \\left ( \\frac{\\pi}{n} \\right )\\\\
            2 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & -2 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & 1 - 2 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & -2 \\cos^2 \\left ( \\frac{\\pi}{n} \\right )\\\\
            2 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & -2 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & -2 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & 1 - 2 \\cos^2 \\left ( \\frac{\\pi}{n} \\right )
            \\end{pmatrix}
            \\]`,
        metric: `\\[ \\cot^2 \\left ( \\frac{\\pi}{n} \\right ) w^2 - \\left (1 - 2 \\cot^2 \\left ( \\frac{\\pi}{n} \\right ) \\right ) x^2 - \\left (1 - 2 \\cot^2 \\left ( \\frac{\\pi}{n} \\right ) \\right ) y^2 - \\left (1 - 2 \\cot^2 \\left ( \\frac{\\pi}{n} \\right ) \\right ) z^2 = 1 - \\cot^2 \\left ( \\frac{\\pi}{n} \\right ) \\]`
    }
    
}

export { info }