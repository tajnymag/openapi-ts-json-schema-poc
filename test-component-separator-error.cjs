const path = require('path');
const assert = require('assert');
const fs = require('fs');
const { openapiToTsJsonSchema, fastifyIntegrationPlugin } = require('openapi-ts-json-schema');

const FILENAME = 'component-separator-error.yaml';
const OUTPUT_PATH = path.resolve(__dirname, `generated-${path.basename(FILENAME, path.extname(FILENAME))}`);

async function processSpec(filename) {
	return openapiToTsJsonSchema({
		openApiSchema: path.resolve(__dirname, filename),
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

	// contains the expected import
	const fastifyIntegrationContens = fs.readFileSync(path.resolve(OUTPUT_PATH, 'fastify-integration.ts'), 'utf8');
	assert.ok(fastifyIntegrationContens.includes('import componentsSchemasHelloWorld from "./components/schemas/HelloWorld";'));
}

generate();
