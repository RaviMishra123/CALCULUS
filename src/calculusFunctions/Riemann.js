import { create, all } from 'mathjs';

const config = {};
const math = create(all, config);

export const calculateRiemannSum = (expression, lowerLimit, upperLimit, partitions) => {
	try {
		const dx = (upperLimit - lowerLimit) / partitions;
		let riemannSum = 0;
		for (let i = 0; i < partitions; i++) {
			const x = lowerLimit + (i + 0.5) * dx;
			const fx = math.evaluate(expression, { x });
			riemannSum += fx * dx;
		}

		return riemannSum;
	} catch (error) {
		console.error('Error calculating Riemann sum:', error.message);
		return null;
	}
};

