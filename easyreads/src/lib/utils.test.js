const { myUtilityFunction } = require('./utils');

test('hello world!', () => {
	expect(myUtilityFunction()).toBe('expected output');
});