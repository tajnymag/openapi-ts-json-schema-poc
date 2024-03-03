const path = require('path');
const assert = require('assert');

const { openapiToTsJsonSchema, fastifyIntegrationPlugin } = require('openapi-ts-json-schema');

const FILENAME = 'bearer-type-error.yaml';
const OUTPUT_PATH = path.resolve(__dirname, `generated-${path.basename(FILENAME, path.extname(FILENAME))}`);

async function processSpec(filename) {
	return openapiToTsJsonSchema({
		openApiSchema: path.resolve(__dirname, FILENAME),
		definitionPathsToGenerateFrom: ['paths', 'components.schemas'],
		refHandling: 'keep',
		outputPath: OUTPUT_PATH,
		plugins: [
			fastifyIntegrationPlugin({
				sharedSchemasFilter: ({ schemaId }) => schemaId.startsWith('/components/schemas'),
			}),
		],
	});
}

async function generate() {
	// does not throw
	await assert.doesNotReject(processSpec(FILENAME));
}

generate();
