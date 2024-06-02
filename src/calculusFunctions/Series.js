import { create, all } from 'mathjs';

const config = {};
const math = create(all, config);

export const calculateSeries = (expression, terms, point) => {
	try {
		const xValues = [];
		const yValues = [];
		const scope = { x: point };
		const parsedExpression = math.parse(expression);
		const compiledExpression = parsedExpression.compile();
		for (let i = 0; i < terms; i++) {
			const termValue = compiledExpression.evaluate(scope);
			xValues.push(scope.x);
			yValues.push(termValue);
			scope.x += 1;
		}
		return { x: xValues, y: yValues };
	} catch (error) {
		console.error('Error calculating series:', error.message);
		return null;
	}
};
