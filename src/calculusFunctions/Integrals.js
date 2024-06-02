import { create, all } from 'mathjs';

const config = {};
const math = create(all, config);

export const calculateIntegral = (expression, lowerLimit, upperLimit) => {
	try {
		const parsedExpression = math.parse(expression);
		const compiledExpression = parsedExpression.compile();
		const lowerValue = compiledExpression.evaluate({ x: lowerLimit });
		const upperValue = compiledExpression.evaluate({ x: upperLimit });
		const integral = (upperValue + lowerValue) * (upperLimit - lowerLimit) / 2;
		return integral;
	} catch (error) {
		console.error('Error calculating integral:', error.message);
		return null;
	}
};
