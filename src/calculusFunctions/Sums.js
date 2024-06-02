import { create, all } from 'mathjs';

const config = {};
const math = create(all, config);

export const calculateSeriesSum = (expression, terms, point) => {
	try {
		const parsedExpression = math.parse(expression);
		const compiledExpression = parsedExpression.compile();
		let seriesSum = 0;
		for (let i = 0; i < terms; i++) {
			const termValue = compiledExpression.evaluate({ n: i, x: point });
			seriesSum += termValue;
		}
		return seriesSum;
	} catch (error) {
		console.error('Error calculating series sum:', error.message);
		return null;
	}
};
