// ========================================================
// LaTeX data for 53n
// 
// Inputs: 
// Output:
//
// Change history:
//     12/06/21 Initial commit
//=========================================================

const info = {
    3: {
        name: `\\[ \\{5,3,3\\} \\]`,
        a: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 1 & 0 & 0\\\\
            0 & 0 & -1 & 0\\\\
            0 & 0 & 0 & 1
            \\end{pmatrix}
            \\]`,
        b: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & \\frac{\\phi}{2} & \\frac{1}{2} & \\frac{1}{2 \\phi}\\\\                
            0 & \\frac{1}{2} & -\\frac{1}{2 \\phi} & -\\frac{\\phi}{2}\\\\
            0 & \\frac{1}{2 \\phi} & -\\frac{\\phi}{2} & \\frac{1}{2}
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
            \\frac{\\phi}{2} & \\frac{1}{2 \\phi^3} & 0 & \\frac{1}{2 \\phi^4}\\\\
            \\frac{\\phi^3}{2} & -\\frac{1}{2 \\phi} & 0 & -\\frac{\\phi}{2}\\\\
            0 & 0 & 1 & 0\\\\
            \\frac{\\phi^2}{2} & -\\frac{\\phi}{2} & 0 & -\\frac{1}{2}
            \\end{pmatrix}
            \\]`,
        metric: `\\[ \\phi^6 w^2 + x^2 + y^2 + z^2 = 8 \\phi^2 \\]`
    },
    4: {
        name: `\\[ \\{5,3,4\\} \\]`,
        a: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 1 & 0 & 0\\\\
            0 & 0 & -1 & 0\\\\
            0 & 0 & 0 & 1
            \\end{pmatrix}
            \\]`,
        b: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & \\frac{\\phi}{2} & \\frac{1}{2} & \\frac{1}{2 \\phi}\\\\                
            0 & \\frac{1}{2} & -\\frac{1}{2 \\phi} & -\\frac{\\phi}{2}\\\\
            0 & \\frac{1}{2 \\phi} & -\\frac{\\phi}{2} & \\frac{1}{2}
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
            \\phi^2 & -1 & 0 & -\\frac{1}{\\phi}\\\\
            \\phi^3 & -\\phi & 0 & -\\phi\\\\
            0 & 0 & 1 & 0\\\\
            \\phi^2 & -\\phi & 0 & 0
            \\end{pmatrix}
            \\]`,
        metric: `\\[ \\phi^4 w^2 - \\phi \\left ( x^2 + y^2 + z^2 \\right ) = 2 \\]`
    },
    5: {
        name: `\\[ \\{5,3,5\\} \\]`,
        a: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 1 & 0 & 0\\\\
            0 & 0 & -1 & 0\\\\
            0 & 0 & 0 & 1
            \\end{pmatrix}
            \\]`,
        b: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & \\frac{\\phi}{2} & \\frac{1}{2} & \\frac{1}{2 \\phi}\\\\                
            0 & \\frac{1}{2} & -\\frac{1}{2 \\phi} & -\\frac{\\phi}{2}\\\\
            0 & \\frac{1}{2 \\phi} & -\\frac{\\phi}{2} & \\frac{1}{2}
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
            \\frac{4 \\phi + 1}{2} & -\\frac{5 - \\phi}{2} & 0 & \\frac{5 \\phi - 6}{2}\\\\
            \\frac{\\phi^5}{2} & \\frac{2 - \\phi^4}{2} & 0 & -\\frac{\\phi^3}{2}\\\\
            0 & 0 & 1 & 0\\\\
            \\frac{\\phi^4}{2} & -\\frac{\\phi^3}{2} & 0 & -\\frac{1}{2 \\phi}
            \\end{pmatrix}
            \\]`,
        metric: `\\[ \\phi^8 w^2 - (7 \\phi + 3) \\left ( x^2 + y^2 + z^2 \\right ) = 4 \\]`
    },
    6: {
        name: `\\[ \\{5,3,6\\} \\]`,
        a: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 1 & 0 & 0\\\\
            0 & 0 & -1 & 0\\\\
            0 & 0 & 0 & 1
            \\end{pmatrix}
            \\]`,
        b: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & \\frac{\\phi}{2} & \\frac{1}{2} & \\frac{1}{2 \\phi}\\\\                
            0 & \\frac{1}{2} & -\\frac{1}{2 \\phi} & -\\frac{\\phi}{2}\\\\
            0 & \\frac{1}{2 \\phi} & -\\frac{\\phi}{2} & \\frac{1}{2}
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
            \\frac{\\phi^4 + 2}{2} & -\\frac{\\phi^3}{2} & 0 & \\frac{\\phi^2}{2}\\\\
            \\frac{3 \\phi^3}{2} & \\frac{2 - 3 \\phi^2}{2} & 0 & -\\frac{3 \\phi}{2}\\\\
            0 & 0 & 1 & 0\\\\
            \\frac{3 \\phi^2}{2} & -\\frac{3 \\phi}{2} & 0 & -\\frac{1}{2}
            \\end{pmatrix}
            \\]`,
        metric: `\\[ 3 w^2 - x^2 - y^2 - z^2 = 0 \\]`
    },
    n: {
        name: `\\[ \\{5,3,n\\} \\]`,
        a: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & 1 & 0 & 0\\\\
            0 & 0 & -1 & 0\\\\
            0 & 0 & 0 & 1
            \\end{pmatrix}
            \\]`,
        b: `\\[
            \\begin{pmatrix}
            1 & 0 & 0 & 0\\\\
            0 & \\frac{\\phi}{2} & \\frac{1}{2} & \\frac{1}{2 \\phi}\\\\                
            0 & \\frac{1}{2} & -\\frac{1}{2 \\phi} & -\\frac{\\phi}{2}\\\\
            0 & \\frac{1}{2 \\phi} & -\\frac{\\phi}{2} & \\frac{1}{2}
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
            2 ( \\phi + 2 ) \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) - 1 & \\frac{2}{\\phi} - 2 \\sqrt{5} \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & 0 & \\frac{2}{\\phi^2} - 2 ( 3 - \\phi) \\cos^2 \\left ( \\frac{\\pi}{n} \\right )\\\\
            2 \\phi^3 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & 1 - 2 \\phi^2 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & 0 & -2 \\phi \\cos^2 \\left ( \\frac{\\pi}{n} \\right )\\\\
            0 & 0 & 1 & 0\\\\
            2 \\phi^2 \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & -2 \\phi \\cos^2 \\left ( \\frac{\\pi}{n} \\right ) & 0 & 1 - 2 \\cos^2 \\left ( \\frac{\\pi}{n} \\right )
            \\end{pmatrix}
            \\]`,
        metric: `\\[ \\phi^4 \\cot^2 \\left ( \\frac{\\pi}{n} \\right ) w^2 - \\left (\\phi^2 \\cot^2 \\left ( \\frac{\\pi}{n} \\right ) - 1 \\right ) \\left ( x^2 + y^2 + z^2 \\right ) = \\cot^2 \\left ( \\frac{\\pi}{n} \\right ) - 3\\]`
    }

}

export { info }