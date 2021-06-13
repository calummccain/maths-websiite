// ========================================================
// LaTeX data for 33n
// 
// Inputs: 
// Output:
//
// Change history:
//     05/06/21 Initial commit
//=========================================================

const info = {
    3: {
        name: `\\[\\{3,3,3\\}\\]`,
        a: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 1 & 0 & 0\\\\
            0 & 0 & 0 & -1\\\\
            0 & 0 & -1 & 0
            \\end{pmatrix}
            \\]`,
        b: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 0 & 1 & 0\\\\                
            0 & 1 & 0 & 0\\\\
            0 & 0 & 0 & 1
            \\end{pmatrix}
            \\]`,
        c: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 1 & 0 & 0\\\\
            0 & 0 & 0 & 1\\\\
            0 & 0 & 1 & 0
            \\end{pmatrix}
            \\]`,
        d: `\\[
            \\begin{pmatrix}
            -\\frac{1}{4} & \\frac{5}{4} & \\frac{5}{4} & -\\frac{5}{4}\\\\
            \\frac{1}{4} & \\frac{3}{4} & -\\frac{1}{4} & \\frac{1}{4}\\\\
            \\frac{1}{4} & -\\frac{1}{4} & \\frac{3}{4} & \\frac{1}{4}\\\\
            -\\frac{1}{4} & \\frac{1}{4} & \\frac{1}{4} & \\frac{3}{4}
            \\end{pmatrix}
            \\]`,
        metric: `\\[w^2 + 5 x^2 + 5 y^2 + 5 z^2 = 16\\]`
    },
    4: {
        name: `\\[\\{3,3,4\\}\\]`,
        a: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 1 & 0 & 0\\\\
            0 & 0 & 0 & -1\\\\
            0 & 0 & -1 & 0
            \\end{pmatrix}
            \\]`,
        b: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 0 & 1 & 0\\\\                
            0 & 1 & 0 & 0\\\\
            0 & 0 & 0 & 1
            \\end{pmatrix}
            \\]`,
        c: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 1 & 0 & 0\\\\
            0 & 0 & 0 & 1\\\\
            0 & 0 & 1 & 0
            \\end{pmatrix}
            \\]`,
        d: `\\[
            \\begin{pmatrix}
            \\frac{1}{2} & \\frac{1}{2} & \\frac{1}{2} & -\\frac{1}{2}\\\\
            \\frac{1}{2} & \\frac{1}{2} & -\\frac{1}{2} & \\frac{1}{2}\\\\
            \\frac{1}{2} & -\\frac{1}{2} & \\frac{1}{2} & \\frac{1}{2}\\\\
            -\\frac{1}{2} & \\frac{1}{2} & \\frac{1}{2} & \\frac{1}{2}
            \\end{pmatrix}
            \\]`,
        metric: `\\[w^2 + x^2 + y^2 + z^2 = 4\\]`
    },
    5: {
        name: `\\[\\{3,3,5\\}\\]`,
        a: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 1 & 0 & 0\\\\
            0 & 0 & 0 & -1\\\\
            0 & 0 & -1 & 0
            \\end{pmatrix}
            \\]`,
        b: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 0 & 1 & 0\\\\                
            0 & 1 & 0 & 0\\\\
            0 & 0 & 0 & 1
            \\end{pmatrix}
            \\]`,
        c: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 1 & 0 & 0\\\\
            0 & 0 & 0 & 1\\\\
            0 & 0 & 1 & 0
            \\end{pmatrix}
            \\]`,
        d: `\\[
            \\begin{pmatrix}
            \\frac{3 \\phi - 1}{4} & \\frac{1}{4 \\phi^4} & \\frac{1}{4 \\phi^4} & -\\frac{1}{4 \\phi^4}\\\\
            \\frac{\\phi^2}{4} & \\frac{3 - \\phi}{4} & -\\frac{\\phi^2}{4} & \\frac{\\phi^2}{4}\\\\
            \\frac{\\phi^2}{4} & -\\frac{\\phi^2}{4} & \\frac{3 - \\phi}{4} & \\frac{\\phi^2}{4}\\\\
            -\\frac{\\phi^2}{4} & \\frac{\\phi^2}{4} & \\frac{\\phi^2}{4} & \\frac{3 - \\phi}{4}
            \\end{pmatrix}
            \\]`,
        metric: `\\[\\phi^6 w^2 + x^2 + y^2 + z^2 = 8 \\phi^2\\]`
    },
    6: {
        name: `\\[\\{3,3,6\\}\\]`,
        a: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 1 & 0 & 0\\\\
            0 & 0 & 0 & -1\\\\
            0 & 0 & -1 & 0
            \\end{pmatrix}
            \\]`,
        b: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 0 & 1 & 0\\\\                
            0 & 1 & 0 & 0\\\\
            0 & 0 & 0 & 1
            \\end{pmatrix}
            \\]`,
        c: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 1 & 0 & 0\\\\
            0 & 0 & 0 & 1\\\\
            0 & 0 & 1 & 0
            \\end{pmatrix}
            \\]`,
        d: `\\[
            \\begin{pmatrix}
            \\frac{5}{4} & -\\frac{1}{4} & -\\frac{1}{4} & \\frac{1}{4}\\\\
            \\frac{3}{4} & \\frac{1}{4} & -\\frac{3}{4} & \\frac{3}{4}\\\\
            \\frac{3}{4} & -\\frac{3}{4} & \\frac{1}{4} & \\frac{3}{4}\\\\
            -\\frac{3}{4} & \\frac{3}{4} & \\frac{3}{4} & \\frac{1}{4}
            \\end{pmatrix}
            \\]`,
        metric: `\\[3 w^2 - x^2 - y^2 - z^2 = 0\\]`
    },
    n: {
        name: `\\[\\{3,3,n\\}\\]`,
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
            3 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) - 1 & 2 - 3 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & 2 - 3 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & 3 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) - 2\\\\
            \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & \\sin^2 \\left ( \\frac{\\pi}{n} \\right ) & -\\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & \\cos^2 \\left ( \\frac{\\pi}{n} \\right )\\\\
            \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & -\\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & \\sin^2 \\left ( \\frac{\\pi}{n} \\right ) & \\cos^2 \\left ( \\frac{\\pi}{n} \\right )\\\\
            -\\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & \\sin^2 \\left ( \\frac{\\pi}{n} \\right )
            \\end{pmatrix}
            \\]`,
        metric: `\\[ \\cot^2 \\left( \\frac{\\pi}{n} \\right ) w^2 - \\left (\\cot^2 \\left ( \\frac{\\pi}{n} \\right ) - 2 \\right ) \\left ( x^2 + y^2 + z^2 \\right ) = 2 \\left ( 1 - 3 \\cot^2 \\left ( \\frac{\\pi}{n} \\right ) \\right ) \\]`
    }

}

export { info }