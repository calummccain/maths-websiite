// ========================================================
// LaTeX data for 35n
// 
// Inputs: 
// Output:
//
// Change history:
//     10/06/21 Initial commit
//=========================================================

const info = {
    3: {
        name: `\\[\\{3,5,3\\}\\]`,
        a: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & -1 & 0 & 0\\\\
            0 & 0 & 1 & 0\\\\
            0 & 0 & 0 & 1
            \\end{pmatrix}
            \\]`,
        b: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & \\frac{1}{2} & \\frac{1}{2 \\phi} & -\\frac{\\phi}{2}\\\\                
            0 & \\frac{1}{2 \\phi} & \\frac{\\phi}{2} & \\frac{1}{2}\\\\    
            0 & -\\frac{\\phi}{2} & \\frac{1}{2} & -\\frac{1}{2 \\phi}
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
            \\frac{\\phi^4 - 1}{2} & 0 & \\frac{\\phi^4 -3}{2 \\phi} & \\frac{\\phi^4 - 3}{2 \\phi^3}\\\\
            0 & 1 & 0 & 0\\\\
            \\frac{\\phi^5}{2} & 0 & \\frac{2 - \\phi^4}{2} & -\\frac{\\phi^2}{2}\\\\
            \\frac{\\phi^3}{2} & 0 & -\\frac{\\phi^2}{2} & \\frac{1}{2}
            \\end{pmatrix}
            \\]`,
        metric: `\\[\\phi^6 w^2 + (3 \\phi - 1) \\left ( x^2 + y^2 + z^2 \\right ) = 4\\]`
    },
    n: {
        name: `\\[\\{3,5,n\\}\\]`,
        a: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & -1 & 0 & 0\\\\
            0 & 0 & 1 & 0\\\\
            0 & 0 & 0 & 1
            \\end{pmatrix}
            \\]`,
        b: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & \\frac{1}{2} & \\frac{1}{2 \\phi} & -\\frac{\\phi}{2}\\\\                
            0 & \\frac{1}{2 \\phi} & \\frac{\\phi}{2} & \\frac{1}{2}\\\\    
            0 & -\\frac{\\phi}{2} & \\frac{1}{2} & -\\frac{1}{2 \\phi}
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
            6 \\phi^2 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) - 1 & 0 & \\frac{2}{\\phi} - 6 \\phi \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & \\frac{2}{\\phi^3} - \\frac{6}{\\phi} \\cos^2 \\left ( \\frac{\\pi}{n} \\right )\\\\
            0 & 1 & 0 & 0\\\\
            2 \\phi^5 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & 0 & 1 - 2 \\phi^4 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & -2 \\phi^2 \\cos^2 \\left ( \\frac{\\pi}{n} \\right )\\\\
            2 \\phi^3 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & 0 & -2 \\phi^2 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & 1 - 2 \\cos^2 \\left ( \\frac{\\pi}{n} \\right )
            \\end{pmatrix}
            \\]`,
        metric: `\\[ \\phi^6 \\cot^2 \\left ( \\frac{\\pi}{n} \\right ) w^2 - \\left ( \\phi^4 \\cot^2 \\left ( \\frac{\\pi}{n} \\right ) - 1 \\right ) \\left ( x^2 + y^2 + z^2 \\right ) = \\phi^2 + 1 - \\phi^4 \\cot^2 \\left ( \\frac{\\pi}{n} \\right ) \\]`
    }

}

export { info }