import { create, all } from 'mathjs';

const config = {};
const math = create(all, config);

export const calculateTaylorSeries = (expression, order, point) => {
	try {
		let taylorSeries = '';
		for (let n = 0; n <= order; n++) {
			const derivative = math.derivative(expression, 'x', { order: n });
			const derivativeValue = derivative.evaluate({ x: point });
			const coefficient = derivativeValue / math.factorial(n);
			const term = `${coefficient} * (x - ${point})^${n}`;
			if (n === 0) {
				taylorSeries += term;
			} else {
				taylorSeries += ` + ${term}`;
			}
		}
		return taylorSeries;
	} catch (error) {
		console.error('Error calculating Taylor series:', error.message);
		return null;
	}
};
