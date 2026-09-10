CalcHub — Codemagic-ready package

1. Push the contents of this folder to the ROOT of the GitHub repository.
2. Make sure codemagic.yaml is visible beside build.gradle and settings.gradle.
3. In Codemagic, choose the main branch and click “Check for configuration files”.
4. Start the Android workflow to build the APK.

The package includes:
- CalcHub favicon PNG + ICO family
- Android launcher icon
- Premium dark/glass UI refresh
- Animated 4.8s opening splash with the CalcHub logo
- Responsive calculator dashboard
- Existing calculator functionality preserved

Equation engine update:
- Linear, quadratic, cubic, quartic and higher-degree polynomial solving up to degree 12.
- Polynomial coefficients are reconstructed numerically and roots are checked against the original equation.
- Cubics use Cardano-style reduction for real roots.
- Higher-degree polynomials use complex-root iteration and display real roots plus the full complex root set.
- Non-polynomial equations use interval scanning + bisection.
- Every equation is graphed in the result view.
- Mobile layout keeps the equation form and graph touch-friendly.
