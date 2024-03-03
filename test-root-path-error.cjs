const path = require('path');
const assert = require('assert');
const { openapiToTsJsonSchema } = require('openapi-ts-json-schema');

const FILENAME = 'root-path-error.yaml';
const OUTPUT_PATH = path.resolve(__dirname, `generated-${path.basename(FILENAME, path.extname(FILENAME))}`);

async function processSpec(filename) {
	return openapiToTsJsonSchema({
		openApiSchema: path.resolve(__dirname, filename),
		definitionPathsToGenerateFrom: ['paths', 'components.schemas'],
		refHandling: 'keep',
		outputPath: OUTPUT_PATH
	});
}

async function generate() {
	// does not throw
	await assert.doesNotReject(processSpec(FILENAME));
}

generate();
