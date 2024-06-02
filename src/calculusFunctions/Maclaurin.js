import { create, all } from 'mathjs';

const config = {};
const math = create(all, config);

export const calculateMaclaurinSeries = (expression, order, point) => {
	try {
		let maclaurinSeries = '';
		for (let n = 0; n <= order; n++) {
			const derivative = math.derivative(expression, 'x', { order: n });
			const derivativeValue = derivative.evaluate({ x: point });
			const coefficient = derivativeValue / math.factorial(n);
			const term = `${coefficient} * x^${n}`;
			if (n === 0) {
				maclaurinSeries += term;
			} else {
				maclaurinSeries += ` + ${term}`;
			}
		}

		return maclaurinSeries;
	} catch (error) {
		console.error('Error calculating Maclaurin series:', error.message);
		return null;
	}
};
