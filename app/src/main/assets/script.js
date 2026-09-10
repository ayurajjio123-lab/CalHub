const calculators=[
{id:"basic",name:"Basic Calculator",icon:"🧮",category:"math",desc:"Perform basic arithmetic calculations."},
{id:"scientific",name:"Scientific Calculator",icon:"🔬",category:"math",desc:"Advanced mathematical functions."},
{id:"graph",name:"Graphing Calculator",icon:"📈",category:"math",desc:"Plot functions, find roots and inspect values."},
{id:"equation",name:"Equation Solver",icon:"∿",category:"math",desc:"Solve large equations with roots and steps."},
{id:"percentage",name:"Percentage Calculator",icon:"%",category:"math",desc:"Calculate percentages quickly."},
{id:"fraction",name:"Fraction Calculator",icon:"½",category:"math",desc:"Add, subtract, multiply and divide fractions."},
{id:"bmi",name:"BMI Calculator",icon:"⚖️",category:"health",desc:"Calculate Body Mass Index."},
{id:"age",name:"Age Calculator",icon:"🎂",category:"date",desc:"Calculate exact age from date of birth."},
{id:"dateDiff",name:"Date Difference",icon:"📅",category:"date",desc:"Find the difference between two dates."},
{id:"emi",name:"EMI Calculator",icon:"🏦",category:"finance",desc:"Calculate monthly loan EMI."},
{id:"simpleInterest",name:"Simple Interest",icon:"💵",category:"finance",desc:"Calculate simple interest."},
{id:"compoundInterest",name:"Compound Interest",icon:"📈",category:"finance",desc:"Calculate compound interest."},
{id:"gst",name:"GST Calculator",icon:"🧾",category:"finance",desc:"Add or remove GST."},
{id:"discount",name:"Discount Calculator",icon:"🏷️",category:"finance",desc:"Calculate discount and final price."},
{id:"tip",name:"Tip Calculator",icon:"🍽️",category:"finance",desc:"Calculate tip and split bills."},
{id:"profit",name:"Profit & Loss",icon:"💹",category:"finance",desc:"Calculate profit or loss."},
{id:"ratio",name:"Ratio Calculator",icon:"➗",category:"math",desc:"Simplify ratios."},
{id:"unit",name:"Unit Converter",icon:"📏",category:"conversion",desc:"Convert common length units."},
{id:"temperature",name:"Temperature Converter",icon:"🌡️",category:"conversion",desc:"Convert Celsius, Fahrenheit and Kelvin."},
{id:"speed",name:"Speed Converter",icon:"🚀",category:"conversion",desc:"Convert km/h and mph."},
{id:"data",name:"Data Converter",icon:"💾",category:"conversion",desc:"Convert KB, MB, GB and TB."},
{id:"time",name:"Time Converter",icon:"⏱️",category:"conversion",desc:"Convert seconds into hours, minutes and seconds."},
{id:"fuel",name:"Fuel Calculator",icon:"⛽",category:"other",desc:"Calculate mileage and fuel cost."},
{id:"cgpa",name:"CGPA Calculator",icon:"🎓",category:"other",desc:"Calculate CGPA from semester values."},
{id:"number",name:"Number System",icon:"🔢",category:"math",desc:"Convert decimal to binary, octal and hexadecimal."},
{id:"random",name:"Random Number",icon:"🎲",category:"other",desc:"Generate a random number in a range."},
{id:"savings",name:"Savings Calculator",icon:"💰",category:"finance",desc:"Estimate future monthly savings."},
{id:"electricity",name:"Electricity Bill",icon:"⚡",category:"other",desc:"Estimate electricity cost."}
];

const grid=document.getElementById("calcGrid"),modal=document.getElementById("modal");
if(!grid||!modal) throw new Error("CalcHub UI failed to initialize.");
let basicExpression="",sciExpression="";
let historyData=JSON.parse(localStorage.getItem("calcHistory")||"[]");

function renderCalculators(list=calculators){
  grid.innerHTML="";
  if(!list.length){grid.innerHTML='<div class="result"><h2>No Calculator Found</h2><p>Try another search.</p></div>';return}
  list.forEach(calc=>{
    const card=document.createElement("div");
    card.className="calc-card";
    card.innerHTML=`<div class="calc-icon">${calc.icon}</div><h3>${calc.name}</h3><p>${calc.desc}</p>`;
    card.onclick=()=>openCalculator(calc.id);
    grid.appendChild(card);
  });
}
renderCalculators();

function searchCalculators(){
  const v=document.getElementById("search").value.toLowerCase().trim();
  renderCalculators(calculators.filter(c=>c.name.toLowerCase().includes(v)||c.desc.toLowerCase().includes(v)));
}

function filterCalc(category,button){
  document.querySelectorAll(".nav-btn").forEach(b=>b.classList.remove("active"));
  button.classList.add("active");
  renderCalculators(category==="all"?calculators:calculators.filter(c=>c.category===category));
}

function openCalculator(id){
  const calc=calculators.find(c=>c.id===id);
  if(!calc)return;
  document.getElementById("modalTitle").textContent=calc.name;
  document.getElementById("calculatorBody").innerHTML=getCalculatorHTML(id);
  modal.classList.add("show"); modal.setAttribute("aria-hidden","false");
}
function closeModal(){modal.classList.remove("show");modal.setAttribute("aria-hidden","true");}

function getCalculatorHTML(id){
  if(id==="basic") return `<div class="scientific-display"><div id="basicExp" class="display-expression"></div><div id="basicResult" class="display-result">0</div></div><div class="sci-buttons">
  <button onclick="basicClear()">AC</button><button onclick="basicDelete()">DEL</button><button onclick="basicInput('%')">%</button><button class="operator" onclick="basicInput('/')">÷</button><button onclick="basicInput('7')">7</button><button onclick="basicInput('8')">8</button><button onclick="basicInput('9')">9</button><button class="operator" onclick="basicInput('*')">×</button><button onclick="basicInput('4')">4</button><button onclick="basicInput('5')">5</button><button onclick="basicInput('6')">6</button><button class="operator" onclick="basicInput('-')">−</button><button onclick="basicInput('1')">1</button><button onclick="basicInput('2')">2</button><button onclick="basicInput('3')">3</button><button class="operator" onclick="basicInput('+')">+</button><button onclick="basicInput('0')">0</button><button onclick="basicInput('.')">.</button><button onclick="basicInput('(')">(</button><button onclick="basicInput(')')">)</button><button style="grid-column:span 5" onclick="basicCalculate()">=</button></div>`;

  if(id==="scientific") return `<div class="scientific-display"><div id="sciExpression" class="display-expression"></div><div id="sciResult" class="display-result">0</div></div><div class="sci-buttons">
  <button onclick="sciClear()">AC</button><button onclick="sciDelete()">DEL</button><button onclick="sciInput('Math.PI')">π</button><button onclick="sciInput('Math.E')">e</button><button onclick="sciCalculate()">=</button>
  <button onclick="sciInput('Math.sin(')">sin</button><button onclick="sciInput('Math.cos(')">cos</button><button onclick="sciInput('Math.tan(')">tan</button><button onclick="sciInput('Math.log10(')">log</button><button onclick="sciInput('Math.log(')">ln</button>
  <button onclick="sciInput('Math.sqrt(')">√</button><button onclick="sciInput('**2')">x²</button><button onclick="sciInput('**')">xʸ</button><button onclick="sciInput('Math.abs(')">abs</button><button onclick="sciInput('(')">(</button>
  <button onclick="sciInput('7')">7</button><button onclick="sciInput('8')">8</button><button onclick="sciInput('9')">9</button><button onclick="sciInput('/')">÷</button><button onclick="sciInput(')')">)</button>
  <button onclick="sciInput('4')">4</button><button onclick="sciInput('5')">5</button><button onclick="sciInput('6')">6</button><button onclick="sciInput('*')">×</button><button onclick="sciInput('.')">.</button>
  <button onclick="sciInput('1')">1</button><button onclick="sciInput('2')">2</button><button onclick="sciInput('3')">3</button><button onclick="sciInput('-')">−</button><button onclick="sciInput('+')">+</button><button style="grid-column:span 5" onclick="sciInput('0')">0</button></div>`;

  if(id==="graph") return `<div class="calc-help">Enter a function such as <code>y = x^2 - 4x + 3</code>. The graph, roots and value table update on Calculate.</div>
  <div class="field"><label>Function y = f(x)</label><input id="graphExpr" value="x^2 - 4*x + 3" autocapitalize="off" spellcheck="false"></div>
  <div class="form-grid graph-range"><div class="field"><label>X minimum</label><input id="graphMin" type="number" value="-10"></div><div class="field"><label>X maximum</label><input id="graphMax" type="number" value="10"></div></div>
  <div class="form-grid graph-range"><div class="field"><label>Samples</label><input id="graphSamples" type="number" value="240" min="40" max="1000"></div><div class="field"><label>Evaluate x</label><input id="graphX" type="number" value="2"></div></div>
  <button class="primary-btn" onclick="graphCalculate()">Plot & Calculate</button>
  <div class="graph-panel"><canvas id="graphCanvas" width="900" height="520" aria-label="Function graph"></canvas></div>
  <div id="graphOutput"></div>
  <div class="graph-table-wrap"><table class="graph-table"><thead><tr><th>x</th><th>f(x)</th></tr></thead><tbody id="graphTableBody"></tbody></table></div>`;

  if(id==="equation") return `<div class="calc-help">Solve linear, quadratic, cubic, quartic and higher-degree polynomial equations, plus supported non-polynomial equations. Examples: <code>2x^2 - 7x + 3 = 0</code>, <code>x^3 - 6x^2 + 11x - 6 = 0</code>, <code>x^4 - 5x^2 + 4 = 0</code>, or <code>sin(x)=0</code>.</div>
  <div class="field"><label>Equation</label><input id="equationInput" value="2x^2 - 7x + 3 = 0" placeholder="e.g. x^3 - 6x^2 + 11x - 6 = 0" autocapitalize="off" spellcheck="false"></div>
  <div class="form-grid graph-range"><div class="field"><label>Search minimum</label><input id="eqMin" type="number" value="-20"></div><div class="field"><label>Search maximum</label><input id="eqMax" type="number" value="20"></div></div>
  <button class="primary-btn" onclick="equationSolve()">Solve Equation & Show Graph</button>
  <div id="equationOutput"></div>
  <div class="graph-panel"><canvas id="equationCanvas" width="900" height="420" aria-label="Equation graph"></canvas></div>`;

  const t={
    percentage:`<div class="field"><label>Percentage</label><input id="p1" type="number" placeholder="20"></div><div class="field"><label>Number</label><input id="p2" type="number" placeholder="500"></div><button class="primary-btn" onclick="percentageCalc()">Calculate</button><div id="output"></div>`,
    fraction:`<div class="form-grid"><div class="field"><label>Numerator 1</label><input id="fn1" type="number"></div><div class="field"><label>Denominator 1</label><input id="fd1" type="number"></div><div class="field"><label>Numerator 2</label><input id="fn2" type="number"></div><div class="field"><label>Denominator 2</label><input id="fd2" type="number"></div></div><select id="fop"><option value="+">Add</option><option value="-">Subtract</option><option value="*">Multiply</option><option value="/">Divide</option></select><button class="primary-btn" onclick="fractionCalc()">Calculate</button><div id="output"></div>`,
    bmi:`<div class="form-grid"><div class="field"><label>Weight (kg)</label><input id="weight" type="number"></div><div class="field"><label>Height (cm)</label><input id="height" type="number"></div></div><button class="primary-btn" onclick="bmiCalc()">Calculate BMI</button><div id="output"></div>`,
    age:`<div class="field"><label>Date of Birth</label><input id="dob" type="date"></div><button class="primary-btn" onclick="ageCalc()">Calculate Age</button><div id="output"></div>`,
    dateDiff:`<div class="form-grid"><div class="field"><label>Start Date</label><input id="date1" type="date"></div><div class="field"><label>End Date</label><input id="date2" type="date"></div></div><button class="primary-btn" onclick="dateDiffCalc()">Calculate Difference</button><div id="output"></div>`,
    emi:`<div class="field"><label>Loan Amount (₹)</label><input id="loan" type="number"></div><div class="form-grid"><div class="field"><label>Annual Interest (%)</label><input id="rate" type="number"></div><div class="field"><label>Tenure (Years)</label><input id="years" type="number"></div></div><button class="primary-btn" onclick="emiCalc()">Calculate EMI</button><div id="output"></div>`,
    simpleInterest:`<div class="form-grid"><div class="field"><label>Principal</label><input id="principal" type="number"></div><div class="field"><label>Rate (%)</label><input id="interestRate" type="number"></div></div><div class="field"><label>Time (Years)</label><input id="interestTime" type="number"></div><button class="primary-btn" onclick="simpleInterestCalc()">Calculate</button><div id="output"></div>`,
    compoundInterest:`<div class="field"><label>Principal</label><input id="cp" type="number"></div><div class="form-grid"><div class="field"><label>Rate (%)</label><input id="cr" type="number"></div><div class="field"><label>Years</label><input id="cy" type="number"></div></div><div class="field"><label>Compounds per year</label><input id="cn" type="number" value="12"></div><button class="primary-btn" onclick="compoundCalc()">Calculate</button><div id="output"></div>`,
    gst:`<div class="form-grid"><div class="field"><label>Amount (₹)</label><input id="gstAmount" type="number"></div><div class="field"><label>GST (%)</label><input id="gstRate" type="number" value="18"></div></div><select id="gstMode"><option value="add">Add GST</option><option value="remove">Remove GST</option></select><button class="primary-btn" onclick="gstCalc()">Calculate GST</button><div id="output"></div>`,
    discount:`<div class="form-grid"><div class="field"><label>Original Price</label><input id="price" type="number"></div><div class="field"><label>Discount (%)</label><input id="discountRate" type="number"></div></div><button class="primary-btn" onclick="discountCalc()">Calculate</button><div id="output"></div>`,
    tip:`<div class="form-grid"><div class="field"><label>Bill Amount</label><input id="bill" type="number"></div><div class="field"><label>Tip (%)</label><input id="tipRate" type="number" value="10"></div></div><div class="field"><label>People</label><input id="people" type="number" value="1"></div><button class="primary-btn" onclick="tipCalc()">Calculate</button><div id="output"></div>`,
    profit:`<div class="form-grid"><div class="field"><label>Cost Price</label><input id="cost" type="number"></div><div class="field"><label>Selling Price</label><input id="selling" type="number"></div></div><button class="primary-btn" onclick="profitCalc()">Calculate</button><div id="output"></div>`,
    ratio:`<div class="form-grid"><div class="field"><label>First Number</label><input id="ratioA" type="number"></div><div class="field"><label>Second Number</label><input id="ratioB" type="number"></div></div><button class="primary-btn" onclick="ratioCalc()">Simplify Ratio</button><div id="output"></div>`,
    unit:`<div class="field"><label>Value</label><input id="unitValue" type="number"></div><div class="form-grid"><select id="unitFrom"><option value="m">Meter</option><option value="km">Kilometer</option><option value="cm">Centimeter</option><option value="ft">Feet</option><option value="in">Inch</option></select><select id="unitTo"><option value="m">Meter</option><option value="km">Kilometer</option><option value="cm">Centimeter</option><option value="ft">Feet</option><option value="in">Inch</option></select></div><button class="primary-btn" onclick="unitCalc()">Convert</button><div id="output"></div>`,
    temperature:`<div class="field"><label>Temperature</label><input id="tempValue" type="number"></div><div class="form-grid"><select id="tempFrom"><option value="c">Celsius</option><option value="f">Fahrenheit</option><option value="k">Kelvin</option></select><select id="tempTo"><option value="c">Celsius</option><option value="f">Fahrenheit</option><option value="k">Kelvin</option></select></div><button class="primary-btn" onclick="tempCalc()">Convert</button><div id="output"></div>`,
    speed:`<div class="field"><label>Speed</label><input id="speedValue" type="number"></div><div class="form-grid"><select id="speedFrom"><option value="kmh">km/h</option><option value="mph">mph</option></select><select id="speedTo"><option value="mph">mph</option><option value="kmh">km/h</option></select></div><button class="primary-btn" onclick="speedCalc()">Convert</button><div id="output"></div>`,
    data:`<div class="field"><label>Value</label><input id="dataValue" type="number"></div><div class="form-grid"><select id="dataFrom"><option value="kb">KB</option><option value="mb">MB</option><option value="gb">GB</option><option value="tb">TB</option></select><select id="dataTo"><option value="kb">KB</option><option value="mb">MB</option><option value="gb">GB</option><option value="tb">TB</option></select></div><button class="primary-btn" onclick="dataCalc()">Convert</button><div id="output"></div>`,
    time:`<div class="field"><label>Seconds</label><input id="seconds" type="number"></div><button class="primary-btn" onclick="timeCalc()">Convert</button><div id="output"></div>`,
    fuel:`<div class="form-grid"><div class="field"><label>Distance (km)</label><input id="distance" type="number"></div><div class="field"><label>Fuel Used (L)</label><input id="fuelUsed" type="number"></div></div><div class="field"><label>Fuel Price / L</label><input id="fuelPrice" type="number"></div><button class="primary-btn" onclick="fuelCalc()">Calculate</button><div id="output"></div>`,
    cgpa:`<div class="field"><label>SGPA/CGPA values separated by commas</label><input id="grades" placeholder="8.2, 8.5, 9.0"></div><button class="primary-btn" onclick="cgpaCalc()">Calculate CGPA</button><div id="output"></div>`,
    number:`<div class="field"><label>Decimal Number</label><input id="decimalNumber" type="number"></div><button class="primary-btn" onclick="numberCalc()">Convert</button><div id="output"></div>`,
    random:`<div class="form-grid"><div class="field"><label>Minimum</label><input id="minRandom" type="number" value="1"></div><div class="field"><label>Maximum</label><input id="maxRandom" type="number" value="100"></div></div><button class="primary-btn" onclick="randomCalc()">Generate</button><div id="output"></div>`,
    savings:`<div class="form-grid"><div class="field"><label>Monthly Saving</label><input id="monthlySave" type="number"></div><div class="field"><label>Annual Interest (%)</label><input id="saveRate" type="number"></div></div><div class="field"><label>Years</label><input id="saveYears" type="number"></div><button class="primary-btn" onclick="savingsCalc()">Calculate</button><div id="output"></div>`,
    electricity:`<div class="form-grid"><div class="field"><label>Units Consumed</label><input id="units" type="number"></div><div class="field"><label>Rate per Unit (₹)</label><input id="unitRate" type="number"></div></div><button class="primary-btn" onclick="electricityCalc()">Calculate</button><div id="output"></div>`
  };
  return t[id]||"<p>Calculator coming soon.</p>";
}


function formatNum(n){return Number.isFinite(n)?Number(n.toFixed(8)).toString():"undefined"}
function normalizeMathExpression(expr){
  let e=(expr||"").trim().replace(/[−–]/g,"-").replace(/×/g,"*").replace(/÷/g,"/").replace(/π/g,"Math.PI").replace(/√/g,"sqrt");
  e=e.replace(/\^/g,"**");
  e=e.replace(/\b(sin|cos|tan|log|ln|sqrt|abs|exp)\s*\(/g,(m,f)=>({sin:"Math.sin(",cos:"Math.cos(",tan:"Math.tan(",log:"Math.log10(",ln:"Math.log(",sqrt:"Math.sqrt(",abs:"Math.abs(",exp:"Math.exp("}[f]));
  e=e.replace(/(\d|x|\))\s*(x|\()/g,"$1*$2");
  e=e.replace(/\)\s*(\d|x)/g,")*$1");
  if(!/^[0-9xX+\-*/().,\s_*A-Za-z]+$/.test(e)) throw new Error("Unsupported characters");
  return e.replace(/\bX\b/g,"x");
}
function evalAt(expr,x){
  const e=normalizeMathExpression(expr);
  if(!/\bMath\.(PI|sin|cos|tan|log10|log|sqrt|abs|exp)\b/.test(e) && /\b(?:constructor|window|document|globalThis|Function|eval)\b/.test(e)) throw new Error("Unsupported expression");
  return Function("x","Math",'"use strict"; return ('+e+');')(x,Math);
}
function equationFunction(eq){
  const parts=eq.split("=");
  if(parts.length!==2) throw new Error("Use one = sign, for example 2x^2-7x+3=0");
  const left=parts[0], right=parts[1];
  return x=>evalAt(left,x)-evalAt(right,x);
}
function bisectRoot(f,a,b){
  let fa=f(a),fb=f(b);
  if(!Number.isFinite(fa)||!Number.isFinite(fb)) return null;
  if(Math.abs(fa)<1e-9) return a;
  if(Math.abs(fb)<1e-9) return b;
  if(fa*fb>0) return null;
  for(let i=0;i<80;i++){
    const m=(a+b)/2,fm=f(m);
    if(!Number.isFinite(fm)) return null;
    if(Math.abs(fm)<1e-11||Math.abs(b-a)<1e-10)return m;
    if(fa*fm<=0){b=m;fb=fm}else{a=m;fa=fm}
  }
  return (a+b)/2;
}
function findRoots(f,min,max,steps=1800){
  const roots=[]; let px=min, pv=f(px);
  for(let i=1;i<=steps;i++){
    const x=min+(max-min)*i/steps, v=f(x);
    if(Number.isFinite(v)&&Math.abs(v)<1e-7) roots.push(x);
    if(Number.isFinite(pv)&&Number.isFinite(v)&&pv*v<0){const r=bisectRoot(f,px,x);if(r!==null)roots.push(r)}
    px=x;pv=v;
  }
  roots.sort((a,b)=>a-b);
  return roots.filter((r,i)=>i===0||Math.abs(r-roots[i-1])>1e-4);
}
function polynomialDegree(expr){
  const e=normalizeMathExpression(expr).replace(/\s+/g,'');
  if(/Math\.(sin|cos|tan|log10|log|sqrt|abs|exp)/.test(e)) return null;
  let deg=0,m;
  const re=/x\*\*(\d+(?:\.\d+)?)/gi;
  while((m=re.exec(e))){const n=Number(m[1]); if(!Number.isInteger(n)) return null; deg=Math.max(deg,n);}
  if(/\bx\b/i.test(e)) deg=Math.max(deg,1);
  return deg;
}
function polynomialCoefficients(f,degree){
  const n=degree+1;
  const A=[], b=[];
  for(let r=0;r<n;r++){
    const x=r-(degree/2);
    const row=[]; for(let c=0;c<n;c++) row.push(Math.pow(x,c));
    A.push(row); b.push(f(x));
  }
  for(let i=0;i<n;i++){
    let pivot=i; for(let r=i+1;r<n;r++) if(Math.abs(A[r][i])>Math.abs(A[pivot][i])) pivot=r;
    if(Math.abs(A[pivot][i])<1e-10) throw new Error('Could not determine polynomial coefficients.');
    [A[i],A[pivot]]=[A[pivot],A[i]]; [b[i],b[pivot]]=[b[pivot],b[i]];
    for(let r=i+1;r<n;r++){
      const q=A[r][i]/A[i][i];
      for(let c=i;c<n;c++) A[r][c]-=q*A[i][c];
      b[r]-=q*b[i];
    }
  }
  const x=new Array(n).fill(0);
  for(let i=n-1;i>=0;i--){let sum=b[i]; for(let c=i+1;c<n;c++) sum-=A[i][c]*x[c]; x[i]=sum/A[i][i];}
  return x;
}
function polyString(coefs){
  const parts=[];
  for(let i=coefs.length-1;i>=0;i--){
    const a=coefs[i]; if(Math.abs(a)<1e-8) continue;
    const sign=a<0?'−':'+'; const v=Math.abs(a);
    const coef=Math.abs(v-1)<1e-8&&i>0?'':formatNum(v);
    const term=i===0?coef:(i===1?coef+'x':coef+'x'+(i<10?'⁽'+i+'⁾':'^'+i));
    parts.push({sign,term});
  }
  if(!parts.length) return '0';
  return parts.map((p,i)=>(i===0?(p.sign==='−'?'−':'')+p.term:' '+p.sign+' '+p.term)).join('');
}
function polyEval(c,x){let y=0;for(let i=c.length-1;i>=0;i--)y=y*x+c[i];return y;}
function durandKerner(coefs,maxIter=500){
  const n=coefs.length-1;
  const lead=coefs[n]; const a=coefs.map(v=>v/lead);
  if(n===1) return [[-a[0],0]];
  let radius=1;
  for(let i=0;i<n;i++) radius=Math.max(radius,1+Math.abs(a[i]));
  let roots=[]; for(let k=0;k<n;k++){const ang=2*Math.PI*k/n;roots.push({re:radius*Math.cos(ang),im:radius*Math.sin(ang)});}
  const ev=(z)=>{let re=a[n],im=0;for(let i=n-1;i>=0;i--){const nr=re*z.re-im*z.im+a[i], ni=re*z.im+im*z.re;re=nr;im=ni;}return {re,im};};
  for(let iter=0;iter<maxIter;iter++){
    let maxDelta=0;
    for(let i=0;i<n;i++){
      let den={re:1,im:0};
      for(let j=0;j<n;j++) if(i!==j){
        const dr=roots[i].re-roots[j].re, di=roots[i].im-roots[j].im;
        const nr=den.re*dr-den.im*di, ni=den.re*di+den.im*dr; den={re:nr,im:ni};
      }
      const z=roots[i],pz=ev(z),den2=den.re*den.re+den.im*den.im||1e-30;
      const qr=(pz.re*den.re+pz.im*den.im)/den2, qi=(pz.im*den.re-pz.re*den.im)/den2;
      const nr=z.re-qr, ni=z.im-qi;
      maxDelta=Math.max(maxDelta,Math.hypot(nr-z.re,ni-z.im));
      roots[i]={re:nr,im:ni};
    }
    if(maxDelta<1e-10) break;
  }
  return roots;
}
function formatRootPairs(pairs){
  return pairs.map(z=>Math.abs(z.im)<1e-6?formatNum(z.re):`${formatNum(z.re)} ${z.im>=0?'+':'−'} ${formatNum(Math.abs(z.im))}i`);
}
function drawAxes(canvas, points, rootXs=[]){
  const ctx=canvas.getContext("2d"), w=canvas.width, h=canvas.height;
  ctx.clearRect(0,0,w,h); ctx.fillStyle=getComputedStyle(document.body).getPropertyValue("--surface").trim()||"#fff";ctx.fillRect(0,0,w,h);
  if(!points.length)return;
  const xs=points.map(p=>p.x), ys=points.map(p=>p.y).filter(Number.isFinite); let xmin=Math.min(...xs),xmax=Math.max(...xs); let ymin=Math.min(...ys),ymax=Math.max(...ys);
  if(ymin===ymax){ymin-=1;ymax+=1} const ym=(ymax-ymin)*.12; ymin-=ym;ymax+=ym;
  const xm=(xmax-xmin)*.03; xmin-=xm;xmax+=xm;
  const X=x=>(x-xmin)/(xmax-xmin)*w, Y=y=>h-(y-ymin)/(ymax-ymin)*h;
  ctx.strokeStyle="rgba(120,130,145,.22)";ctx.lineWidth=1;
  for(let i=1;i<10;i++){let gx=w*i/10,gy=h*i/10;ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,h);ctx.stroke();ctx.beginPath();ctx.moveTo(0,gy);ctx.lineTo(w,gy);ctx.stroke()}
  if(xmin<0&&xmax>0){ctx.strokeStyle="rgba(200,150,70,.55)";ctx.beginPath();ctx.moveTo(X(0),0);ctx.lineTo(X(0),h);ctx.stroke()}
  if(ymin<0&&ymax>0){ctx.strokeStyle="rgba(200,150,70,.55)";ctx.beginPath();ctx.moveTo(0,Y(0));ctx.lineTo(w,Y(0));ctx.stroke()}
  ctx.strokeStyle="#d89b3f";ctx.lineWidth=4;ctx.beginPath();let started=false;
  for(const p of points){if(!Number.isFinite(p.y)){started=false;continue}const xx=X(p.x),yy=Y(p.y);if(!started){ctx.moveTo(xx,yy);started=true}else ctx.lineTo(xx,yy)}ctx.stroke();
  ctx.fillStyle="#f1bd69"; for(const r of rootXs){if(r>=xmin&&r<=xmax){const rr=5,xx=X(r),yy=Y(0);ctx.beginPath();ctx.arc(xx,yy,rr,0,Math.PI*2);ctx.fill()}}
}
function graphCalculate(){
  try{
    const expr=document.getElementById("graphExpr").value,min=Number(document.getElementById("graphMin").value),max=Number(document.getElementById("graphMax").value),samples=Math.max(40,Math.min(1000,Number(document.getElementById("graphSamples").value)||240)),xv=Number(document.getElementById("graphX").value);
    if(!(max>min))throw new Error("X maximum must be greater than X minimum.");
    const f=x=>evalAt(expr,x); const points=[], step=(max-min)/(samples-1);
    let minY=Infinity,maxY=-Infinity; for(let i=0;i<samples;i++){const x=min+i*step,y=f(x);points.push({x,y});if(Number.isFinite(y)){minY=Math.min(minY,y);maxY=Math.max(maxY,y)}}
    const roots=findRoots(f,min,max,Math.min(1800,samples*4));
    const yx=f(xv), h=Math.max((max-min)/20000,1e-5);
    const derivative=(f(xv+h)-f(xv-h))/(2*h);
    let integral=0, nInt=200; if(nInt%2) nInt++; const hi=(max-min)/nInt; let sum=f(min)+f(max);
    for(let i=1;i<nInt;i++){const yy=f(min+i*hi); if(Number.isFinite(yy)) sum+=(i%2?4:2)*yy;} integral=(sum*hi/3);
    const finite=points.filter(p=>Number.isFinite(p.y)); drawAxes(document.getElementById("graphCanvas"),finite,roots);
    document.getElementById("graphOutput").innerHTML=`<div class="result"><h2>Graph analysis</h2><p><b>f(${formatNum(xv)}) = ${formatNum(yx)}</b><br>Derivative at x=${formatNum(xv)}: <b>f′(x) ≈ ${formatNum(derivative)}</b><br>Approx. integral on [${formatNum(min)}, ${formatNum(max)}]: <b>${formatNum(integral)}</b><br>Roots in [${formatNum(min)}, ${formatNum(max)}]: ${roots.length?roots.map(formatNum).join(", "):"None found"}</p><div class="graph-kpi"><span>Roots marked on graph</span><span>${roots.length}</span></div></div>`;
    document.getElementById("graphTableBody").innerHTML=[min,(min+max)/2,max,xv].sort((a,b)=>a-b).map(x=>`<tr><td>${formatNum(x)}</td><td>${formatNum(f(x))}</td></tr>`).join("");
    addHistory(`Graph: y=${expr} | f(${xv})=${formatNum(yx)} | roots=${roots.map(formatNum).join(",")}`);
  }catch(e){document.getElementById("graphOutput").innerHTML=`<div class="result error-result"><h2>Graph error</h2><p>${e.message}</p></div>`}
}
function detectPolynomialDegree(f){
  for(let d=0; d<=12; d++){
    try{
      const c=polynomialCoefficients(f,d);
      const testXs=[-2.35,-0.73,0.41,1.67,3.29];
      let ok=true;
      for(const x of testXs){
        const actual=f(x), approx=polyEval(c,x);
        if(!Number.isFinite(actual)||!Number.isFinite(approx)){ok=false;break;}
        const err=Math.abs(actual-approx), scale=Math.max(1,Math.abs(actual));
        if(err>1e-6*scale){ok=false;break;}
      }
      if(ok) return d;
    }catch(_){ }
  }
  return null;
}
function cubicRealRoots(a,b,c,d){
  const p=(3*a*c-b*b)/(3*a*a);
  const q=(27*a*a*d-9*a*b*c+2*b*b*b)/(27*a*a*a);
  const disc=(q*q/4)+(p*p*p/27);
  const shift=-b/(3*a);
  const roots=[];
  const clean=v=>Math.abs(v)<1e-9?0:v;
  if(disc>1e-12){
    const sd=Math.sqrt(disc);
    const u=Math.cbrt(-q/2+sd);
    const v=Math.cbrt(-q/2-sd);
    roots.push(clean(u+v+shift));
    return {roots,disc,p,q,kind:'one'};
  }
  if(Math.abs(disc)<=1e-12){
    const u=Math.cbrt(-q/2);
    roots.push(clean(2*u+shift));
    roots.push(clean(-u+shift));
    roots.sort((x,y)=>x-y);
    return {roots,disc,p,q,kind:'repeated'};
  }
  const r=2*Math.sqrt(-p/3);
  const theta=Math.acos(Math.max(-1,Math.min(1,(-q/2)/Math.sqrt(-(p*p*p)/27))));
  for(let k=0;k<3;k++) roots.push(clean(r*Math.cos((theta+2*Math.PI*k)/3)+shift));
  roots.sort((x,y)=>x-y);
  return {roots:roots.filter((v,i)=>i===0||Math.abs(v-roots[i-1])>1e-7),disc,p,q,kind:'three'};
}
function equationSolve(){
  try{
    const eq=document.getElementById("equationInput").value.trim(),min=Number(document.getElementById("eqMin").value),max=Number(document.getElementById("eqMax").value);
    if(!(max>min))throw new Error("Search maximum must be greater than minimum.");
    const f=equationFunction(eq), parts=eq.split("=").map(s=>s.trim()), degree=detectPolynomialDegree(f);
    let roots=[], solutionType='Numerical real roots';
    let steps=`<div class="step-list"><div><b>1.</b> Move everything to one side: <code>(${parts[0]}) − (${parts[1]}) = 0</code></div>`;
    if(degree!==null && degree<=12){
      const c=polynomialCoefficients(f,degree);
      while(c.length>1 && Math.abs(c[c.length-1])<1e-7)c.pop();
      const d=c.length-1;
      const pairs=durandKerner(c);
      const real=pairs.filter(z=>Math.abs(z.im)<1e-5).map(z=>z.re).sort((a,b)=>a-b);
      roots=real.filter((r,i)=>i===0||Math.abs(r-real[i-1])>1e-5);
      steps+=`<div><b>2.</b> Detected polynomial degree: <code>${d}</code> (${d===1?'Linear':d===2?'Quadratic':d===3?'Cubic':d===4?'Quartic':d+'th-degree polynomial'})</div>`;
      steps+=`<div><b>3.</b> Standard polynomial form: <code>${polyString(c)} = 0</code></div>`;
      if(d===1){
        const b=c[1]||0,a=c[0]||0,r=-a/b; roots=[r];
        steps+=`<div><b>4.</b> Linear rule: <code>x = −c/b = ${formatNum(r)}</code></div>`;
      } else if(d===2){
        const a=c[2],b=c[1]||0,cc=c[0]||0,D=b*b-4*a*cc;
        steps+=`<div><b>4.</b> Discriminant: <code>Δ = b² − 4ac = ${formatNum(D)}</code></div>`;
        if(D>=-1e-9){const rr=D<0?0:Math.sqrt(D); roots=[(-b-rr)/(2*a),(-b+rr)/(2*a)].sort((x,y)=>x-y); steps+=`<div><b>5.</b> Quadratic formula: <code>x = (−b ± √Δ)/(2a)</code></div><div><b>6.</b> Roots: <code>${roots.map(formatNum).join(' , ')}</code></div>`}
        else steps+=`<div><b>5.</b> Δ < 0, so there are no real roots (complex roots exist).</div>`;
      } else if(d===3){
        const a=c[3],b=c[2]||0,cc=c[1]||0,dd=c[0]||0;
        const cr=cubicRealRoots(a,b,cc,dd);
        roots=cr.roots.sort((x,y)=>x-y);
        steps+=`<div><b>4.</b> Depress the cubic with <code>x = t − b/(3a)</code>: <code>t³ + pt + q = 0</code>, where <code>p = ${formatNum(cr.p)}</code>, <code>q = ${formatNum(cr.q)}</code>.</div>`;
        steps+=`<div><b>5.</b> Cubic discriminant helper: <code>Δ = (q/2)² + (p/3)³ = ${formatNum(cr.disc)}</code></div>`;
        if(cr.kind==='three') steps+=`<div><b>6.</b> Δ &lt; 0, so there are three distinct real roots (trigonometric Cardano form).</div>`;
        else if(cr.kind==='repeated') steps+=`<div><b>6.</b> Δ = 0, so the cubic has a repeated real root.</div>`;
        else steps+=`<div><b>6.</b> Δ &gt; 0, so there is one real root; the other two roots are complex.</div>`;
        steps+=`<div><b>7.</b> Real roots: <code>${roots.map(formatNum).join(' , ')||'None'}</code></div>`;
        solutionType='Cubic real roots';
      } else {
        steps+=`<div><b>4.</b> Roots are computed with a stable complex-polynomial iteration, then real roots are retained and verified.</div>`;
        steps+=`<div><b>5.</b> Full root set: <code>${formatRootPairs(pairs).join(' , ')}</code></div>`;
      }
    } else {
      roots=findRoots(f,min,max,2200); solutionType='Numerical real roots';
      steps+=`<div><b>2.</b> This equation contains non-polynomial terms or has degree above 12.</div><div><b>3.</b> ${roots.length?'Real roots are bracketed and refined with bisection inside the selected interval.':'No real roots found in the selected interval.'}</div>`;
    }
    steps+=`</div>`;
    document.getElementById("equationOutput").innerHTML=`${steps}<div class="result"><h2>${roots.length?"Solution":"No real solution found"}</h2><p>${roots.length?`<b>${solutionType}:</b> ${roots.map(formatNum).join(", ")}`:"Try a wider search range, a different interval, or check the equation."}</p></div>`;
    const graphPts=[];for(let i=0;i<700;i++){const x=min+(max-min)*i/699;graphPts.push({x,y:f(x)})}drawAxes(document.getElementById("equationCanvas"),graphPts,roots);
    addHistory(`Equation: ${eq} → ${roots.map(formatNum).join(", ")||"no real roots"}`);
  }catch(e){document.getElementById("equationOutput").innerHTML=`<div class="result error-result"><h2>Equation error</h2><p>${e.message}</p></div>`}
}

function val(id){return Number(document.getElementById(id).value)}
function showResult(title,text){document.getElementById("output").innerHTML=`<div class="result"><h2>${title}</h2><p>${text}</p></div>`;addHistory(title+" → "+String(text).replace(/<[^>]*>/g," "))}
function addHistory(value){historyData.unshift({value,time:new Date().toLocaleTimeString()});historyData=historyData.slice(0,20);localStorage.setItem("calcHistory",JSON.stringify(historyData))}

function basicInput(v){basicExpression+=v;document.getElementById("basicExp").textContent=basicExpression}
function basicClear(){basicExpression="";document.getElementById("basicExp").textContent="";document.getElementById("basicResult").textContent="0"}
function basicDelete(){basicExpression=basicExpression.slice(0,-1);document.getElementById("basicExp").textContent=basicExpression}
function basicCalculate(){try{const r=Function('"use strict";return ('+basicExpression.replace(/%/g,"/100")+')')();if(!Number.isFinite(r))throw Error();const x=Number(r.toFixed(10));document.getElementById("basicResult").textContent=x;addHistory(`${basicExpression} = ${x}`)}catch{document.getElementById("basicResult").textContent="Error"}}

function sciInput(v){sciExpression+=v;document.getElementById("sciExpression").textContent=sciExpression}
function sciClear(){sciExpression="";document.getElementById("sciExpression").textContent="";document.getElementById("sciResult").textContent="0"}
function sciDelete(){sciExpression=sciExpression.slice(0,-1);document.getElementById("sciExpression").textContent=sciExpression}
function sciCalculate(){try{const r=Function('"use strict";return ('+sciExpression+')')();if(!Number.isFinite(r))throw Error();const x=Number(r.toFixed(10));document.getElementById("sciResult").textContent=x;addHistory(`${sciExpression} = ${x}`)}catch{document.getElementById("sciResult").textContent="Error"}}

function percentageCalc(){showResult("Percentage Result",`${val("p1")}% of ${val("p2")} = <b>${(val("p1")*val("p2")/100).toFixed(2)}</b>`)}
function bmiCalc(){const w=val("weight"),h=val("height")/100;if(w<=0||h<=0)return showResult("Invalid Input","Enter valid height and weight.");const b=w/(h*h);const c=b<18.5?"Underweight":b<25?"Normal":b<30?"Overweight":"Obesity";showResult("BMI: "+b.toFixed(2),"Category: "+c)}
function ageCalc(){const b=new Date(document.getElementById("dob").value),t=new Date();let y=t.getFullYear()-b.getFullYear(),m=t.getMonth()-b.getMonth(),d=t.getDate()-b.getDate();if(d<0){m--;d+=new Date(t.getFullYear(),t.getMonth(),0).getDate()}if(m<0){y--;m+=12}showResult("Your Age",`${y} Years, ${m} Months, ${d} Days`)}
function dateDiffCalc(){const a=new Date(document.getElementById("date1").value),b=new Date(document.getElementById("date2").value);showResult("Date Difference",`${Math.abs(Math.round((b-a)/86400000))} days`)}
function emiCalc(){const P=val("loan"),r=val("rate")/1200,n=val("years")*12;if(P<=0||n<=0)return showResult("Invalid Input","Enter valid loan amount and tenure.");const e=r===0?P/n:P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1),total=e*n;showResult("Monthly EMI",`₹${e.toFixed(2)}<br>Total Payment: ₹${total.toFixed(2)}<br>Total Interest: ₹${(total-P).toFixed(2)}`)}
function simpleInterestCalc(){const P=val("principal"),R=val("interestRate"),T=val("interestTime"),i=P*R*T/100;showResult("Simple Interest",`Interest: ₹${i.toFixed(2)}<br>Total Amount: ₹${(P+i).toFixed(2)}`)}
function compoundCalc(){const P=val("cp"),R=val("cr")/100,T=val("cy"),N=val("cn"),A=P*Math.pow(1+R/N,N*T);showResult("Compound Interest",`Interest: ₹${(A-P).toFixed(2)}<br>Final Amount: ₹${A.toFixed(2)}`)}
function gstCalc(){const a=val("gstAmount"),r=val("gstRate");if(document.getElementById("gstMode").value==="add"){const g=a*r/100;showResult("GST Added",`GST: ₹${g.toFixed(2)}<br>Final Price: ₹${(a+g).toFixed(2)}`)}else{const base=a/(1+r/100);showResult("GST Removed",`Base Price: ₹${base.toFixed(2)}<br>GST: ₹${(a-base).toFixed(2)}`)}}
function discountCalc(){const p=val("price"),d=val("discountRate"),s=p*d/100;showResult("Final Price",`₹${(p-s).toFixed(2)}<br>You saved: ₹${s.toFixed(2)}`)}
function tipCalc(){const b=val("bill"),t=val("tipRate"),n=val("people");if(n<=0)return showResult("Invalid Input","People must be at least 1.");const tip=b*t/100,total=b+tip;showResult("Bill Summary",`Tip: ₹${tip.toFixed(2)}<br>Total: ₹${total.toFixed(2)}<br>Per Person: ₹${(total/n).toFixed(2)}`)}
function profitCalc(){const c=val("cost"),s=val("selling"),d=s-c;if(c===0)return showResult("Invalid Input","Cost price cannot be zero.");if(d>=0)showResult("Profit",`Profit: ₹${d.toFixed(2)}<br>Profit %: ${(d/c*100).toFixed(2)}%`);else showResult("Loss",`Loss: ₹${Math.abs(d).toFixed(2)}<br>Loss %: ${(Math.abs(d)/c*100).toFixed(2)}%`)}
function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b]}return a}
function ratioCalc(){const a=val("ratioA"),b=val("ratioB");if(!a||!b)return showResult("Invalid Input","Enter two non-zero numbers.");const g=gcd(a,b);showResult("Simplified Ratio",`${a/g} : ${b/g}`)}
function fractionCalc(){const a=val("fn1"),b=val("fd1"),c=val("fn2"),d=val("fd2"),op=document.getElementById("fop").value;if(!b||!d)return showResult("Invalid Input","Denominators cannot be zero.");let n,den;if(op==="+"){n=a*d+c*b;den=b*d}else if(op==="-"){n=a*d-c*b;den=b*d}else if(op==="*"){n=a*c;den=b*d}else{if(c===0)return showResult("Invalid Input","Cannot divide by zero.");n=a*d;den=b*c}const g=gcd(n,den);n/=g;den/=g;if(den<0){n=-n;den=-den}showResult("Fraction Result",`${n}/${den} (${(n/den).toFixed(4)})`)}
const units={m:1,km:1000,cm:.01,ft:.3048,in:.0254};function unitCalc(){const r=val("unitValue")*units[document.getElementById("unitFrom").value]/units[document.getElementById("unitTo").value];showResult("Converted Value",r.toFixed(6))}
function tempCalc(){let x=val("tempValue"),f=document.getElementById("tempFrom").value,t=document.getElementById("tempTo").value;if(f==="f")x=(x-32)*5/9;if(f==="k")x-=273.15;if(t==="f")x=x*9/5+32;if(t==="k")x+=273.15;showResult("Temperature",x.toFixed(2)+"°")}
function speedCalc(){let x=val("speedValue");if(document.getElementById("speedFrom").value==="mph")x*=1.609344;if(document.getElementById("speedTo").value==="mph")x/=1.609344;showResult("Speed",x.toFixed(3))}
const dataUnits={kb:1,mb:1024,gb:1024**2,tb:1024**3};function dataCalc(){const x=val("dataValue")*dataUnits[document.getElementById("dataFrom").value]/dataUnits[document.getElementById("dataTo").value];showResult("Data",x.toFixed(4))}
function timeCalc(){const s=val("seconds"),h=Math.floor(s/3600),m=Math.floor(s%3600/60),sec=s%60;showResult("Time",`${h} Hours ${m} Minutes ${sec} Seconds`)}
function fuelCalc(){const d=val("distance"),f=val("fuelUsed"),p=val("fuelPrice");if(f<=0)return showResult("Invalid Input","Fuel used must be greater than zero.");showResult("Fuel Summary",`Mileage: ${(d/f).toFixed(2)} km/L<br>Fuel Cost: ₹${(f*p).toFixed(2)}`)}
function cgpaCalc(){const a=document.getElementById("grades").value.split(",").map(Number).filter(Number.isFinite);if(!a.length)return showResult("Invalid Input","Enter values separated by commas.");showResult("CGPA",(a.reduce((x,y)=>x+y,0)/a.length).toFixed(2))}
function numberCalc(){const n=val("decimalNumber");if(!Number.isInteger(n)||n<0)return showResult("Invalid Input","Enter a non-negative integer.");showResult("Number Conversion",`Binary: ${n.toString(2)}<br>Octal: ${n.toString(8)}<br>Hexadecimal: ${n.toString(16).toUpperCase()}`)}
function randomCalc(){let a=val("minRandom"),b=val("maxRandom");if(a>b)[a,b]=[b,a];showResult("Random Number",Math.floor(Math.random()*(b-a+1))+a)}
function savingsCalc(){const m=val("monthlySave"),r=val("saveRate")/1200,n=val("saveYears")*12;const f=r===0?m*n:m*((Math.pow(1+r,n)-1)/r);showResult("Future Savings","₹"+f.toFixed(2))}
function electricityCalc(){showResult("Estimated Bill","₹"+(val("units")*val("unitRate")).toFixed(2))}

function toggleTheme(){document.body.classList.toggle("dark");localStorage.setItem("theme",document.body.classList.contains("dark")?"dark":"light");if(window.updateThemeIcon)window.updateThemeIcon();if(window.syncSystemBars && document.getElementById("splash")?.classList.contains("done"))window.syncSystemBars();}
if(localStorage.getItem("theme")==="dark")document.body.classList.add("dark");

function openHistory(){
  document.getElementById("modalTitle").textContent="Calculation History";
  document.getElementById("calculatorBody").innerHTML=`<div>${historyData.length?historyData.map(x=>`<div class="history-item"><span>${x.value}</span><small>${x.time}</small></div>`).join(""):"<p>No calculation history yet.</p>"}</div><button class="primary-btn" onclick="clearHistory()">Clear History</button>`;
  modal.classList.add("show");modal.setAttribute("aria-hidden","false");
}
function clearHistory(){historyData=[];localStorage.removeItem("calcHistory");openHistory()}
modal.addEventListener("click",e=>{if(e.target===modal)closeModal()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});


document.addEventListener("keydown",e=>{
  if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();const s=document.getElementById("search");if(s){s.focus();s.select();}}
  if(e.key==="Enter"&&document.getElementById("search")===document.activeElement){searchCalculators();}
});
