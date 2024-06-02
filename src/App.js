import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import './App.css';

import { calculateIntegral } from './calculusFunctions/Integrals';
import { calculateRiemannSum } from './calculusFunctions/Riemann';
import { calculateTaylorSeries } from './calculusFunctions/Taylor';
import { calculateMaclaurinSeries } from './calculusFunctions/Maclaurin';
import { calculateSeriesSum } from './calculusFunctions/Sums';
import { calculateSeries } from './calculusFunctions/Series';

function App() {
  const [expression, setExpression] = useState('');
  const [lowerLimit, setLowerLimit] = useState(0);
  const [upperLimit, setUpperLimit] = useState(2 * Math.PI);
  const [partitions, setPartitions] = useState(10);
  const [terms, setTerms] = useState(5);
  const [point, setPoint] = useState(0);
  const [result, setResult] = useState('');
  const [plot, setPlot] = useState(null);

  const handleExpressionChange = (e) => setExpression(e.target.value);
  const handleLowerLimitChange = (e) => setLowerLimit(parseFloat(e.target.value));
  const handleUpperLimitChange = (e) => setUpperLimit(parseFloat(e.target.value));
  const handlePartitionsChange = (e) => setPartitions(parseInt(e.target.value));
  const handleTermsChange = (e) => setTerms(parseInt(e.target.value));
  const handlePointChange = (e) => setPoint(parseFloat(e.target.value));

  const visualize = async () => {
    try {
      let plotData = null;
      let formula = '';
      if (result === 'integral') {
        const yValues = [await calculateIntegral(expression, lowerLimit, upperLimit)];
        plotData = { x: ['Integral'], y: yValues };
        formula = `Integral of ${expression} from ${lowerLimit} to ${upperLimit}`;
      } else if (result === 'riemann') {
        const yValues = [await calculateRiemannSum(expression, lowerLimit, upperLimit, partitions)];
        plotData = { x: ['Riemann Sum'], y: yValues };
        formula = `Riemann Sum of ${expression} from ${lowerLimit} to ${upperLimit} with ${partitions} partitions`;
      } else if (result === 'taylor') {
        const yValues = [await calculateTaylorSeries(expression, terms, point)];
        plotData = { x: ['Taylor Series'], y: yValues };
        formula = `Taylor Series of ${expression} at ${point} with ${terms} terms`;
      } else if (result === 'maclaurin') {
        const yValues = [await calculateMaclaurinSeries(expression, terms, point)];
        plotData = { x: ['Maclaurin Series'], y: yValues };
        formula = `Maclaurin Series of ${expression} at ${point} with ${terms} terms`;
      } else if (result === 'sums') {
        const yValues = [await calculateSeriesSum(expression, terms, point)];
        plotData = { x: ['Series Sum'], y: yValues };
        formula = `Series Sum of ${expression} at ${point} with ${terms} terms`;
      } else if (result === 'series') {
        const { x, y } = await calculateSeries(expression, terms, point);
        plotData = { x, y, type: 'scatter', mode: 'lines', marker: { color: 'blue' } };
        formula = `Series plot of ${expression} at ${point} with ${terms} terms`;
      }
      setPlot(plotData);
      if (formula !== '') {
        document.getElementById('formula-display').innerText = formula;
      }
    } catch (error) {
      console.error('Error visualizing:', error);
    }
  };

  return (
    <div className="App">
      <h1>Calculus Visualizer</h1>
      <div className="input-container">
        <label>Enter Expression:</label>
        <input
          type="text"
          value={expression}
          onChange={handleExpressionChange}
          placeholder="e.g., sin(x)"
        />
      </div>
      <div className="input-container">
        <label>Lower Limit:</label>
        <input
          type="number"
          value={lowerLimit}
          onChange={handleLowerLimitChange}
          step="any"
        />
      </div>
      <div className="input-container">
        <label>Upper Limit:</label>
        <input
          type="number"
          value={upperLimit}
          onChange={handleUpperLimitChange}
          step="any"
        />
      </div>
      <div className="input-container">
        <label>Partitions:</label>
        <input
          type="number"
          value={partitions}
          onChange={handlePartitionsChange}
          min="1"
        />
      </div>
      <div className="input-container">
        <label>Terms:</label>
        <input
          type="number"
          value={terms}
          onChange={handleTermsChange}
          min="1"
        />
      </div>
      <div className="input-container">
        <label>Point of Expansion:</label>
        <input
          type="number"
          value={point}
          onChange={handlePointChange}
          step="any"
        />
      </div>
      <div className="input-container">
        <select value={result} onChange={(e) => setResult(e.target.value)}>
          <option value="">Select Calculation</option>
          <option value="integral">Integral</option>
          <option value="riemann">Riemann Sum</option>
          <option value="taylor">Taylor Series</option>
          <option value="maclaurin">Maclaurin Series</option>
          <option value="sums">Series Sum</option>
          <option value="series">Series</option>
        </select>
      </div>
      <div className="input-container">
        <button onClick={visualize}>Visualize</button>
      </div>
      <div className="plot-container">
        {plot && (
          <Plot
            data={[plot]}
            layout={{ width: 800, height: 400, title: 'Calculus Visualization' }}
          />
        )}
      </div>
      <div className="formula-display" id="formula-display"></div>
    </div>
  );
}

export default App;