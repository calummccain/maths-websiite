// ========================================================
// LaTeX data for pqr
// 
// Inputs: 
// Output:
//
// Change history:
//     12/06/21 Initial commit
//=========================================================

const info = {
    name: `\\[ \\{p,q,r\\} \\]`,
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
        0 & 0 & \\cos \\left ( \\frac{2 \\pi}{p} \\right ) & \\sin \\left ( \\frac{2 \\pi}{p} \\right )\\\\
        0 & 0 & \\sin \\left ( \\frac{2 \\pi}{p} \\right ) & -\\cos \\left ( \\frac{2 \\pi}{p} \\right )
        \\end{pmatrix}
        \\]`,
    c: `\\[
        \\begin{pmatrix}
        1 - \\frac{2 \\sin^2 \\left ( \\frac{\\pi}{p} \\right ) \\sin^2 \\left ( \\frac{\\pi}{r} \\right ) - \\cos^2 \\left ( \\frac{\\pi}{q} \\right ) }{\\sin^2 \\left ( \\frac{\\pi}{p} \\right )} &
        \\frac{2 \\left ( \\sin^2 \\left ( \\frac{\\pi}{p} \\right ) \\sin^2 \\left ( \\frac{\\pi}{r} \\right ) - \\cos^2 \\left ( \\frac{\\pi}{q} \\right ) \\right ) \\cos \\left ( \\frac{\\pi}{r} \\right )}{\\sin \\left ( \\frac{\\pi}{p} \\right ) \\cos \\left ( \\frac{\\pi}{p} \\right ) \\cos \\left ( \\frac{\\pi}{q} \\right )} &
        \\frac{2 \\left ( \\sin^2 \\left ( \\frac{\\pi}{p} \\right ) \\sin^2 \\left ( \\frac{\\pi}{r} \\right ) - \\cos^2 \\left ( \\frac{\\pi}{q} \\right ) \\right ) }{ \\cos \\left ( \\frac{\\pi}{p} \\right ) \\sin^2 \\left ( \\frac{\\pi}{p} \\right )} &
        0 \\\\
        \\frac{2 \\cos \\left ( \\frac{\\pi}{p} \\right ) \\cos \\left ( \\frac{\\pi}{q} \\right ) \\cos \\left ( \\frac{\\pi}{r} \\right )}{\\sin \\left ( \\frac{\\pi}{p} \\right )} &
        1 - 2 \\cos^2 \\left ( \\frac{\\pi}{r} \\right ) &
        -\\frac{2 \\cos \\left ( \\frac{\\pi}{q} \\right ) \\cos \\left ( \\frac{\\pi}{r} \\right )}{\\sin \\left ( \\frac{\\pi}{p} \\right )} &
        0 \\\\
        \\frac{2 \\cos \\left ( \\frac{\\pi}{p} \\right ) \\cos^2 \\left ( \\frac{\\pi}{q} \\right )}{\\sin^2 \\left ( \\frac{\\pi}{p} \\right )} &
        -\\frac{2 \\cos \\left ( \\frac{\\pi}{q} \\right ) \\cos \\left ( \\frac{\\pi}{r} \\right )}{\\sin \\left ( \\frac{\\pi}{p} \\right )} &
        1 - \\frac{2 \\cos^2 \\left ( \\frac{\\pi}{q} \\right )}{\\sin^2 \\left ( \\frac{\\pi}{p} \\right )} &
        0 \\\\
        0 & 0 & 0 & 1
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
    metric: `\\[ \\cos^2 \\left ( \\frac{\\pi}{p} \\right ) \\cos^2 \\left ( \\frac{\\pi}{q} \\right ) w^2 - \\left ( \\sin^2 \\left ( \\frac{\\pi}{p} \\right ) \\sin^2 \\left ( \\frac{\\pi}{r} \\right ) - \\cos^2 \\left ( \\frac{\\pi}{q} \\right ) \\right ) \\left ( x^2 + y^2 + z^2 \\right ) = \\sin^2 \\left ( \\frac{\\pi}{p} \\right ) \\left ( \\sin^2 \\left ( \\frac{\\pi}{r} \\right ) - \\cos^2 \\left ( \\frac{\\pi}{q} \\right ) \\right ) \\]`

}

export { info }