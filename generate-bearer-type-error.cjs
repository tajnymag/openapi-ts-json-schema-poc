const path = require('path');
const { openapiToTsJsonSchema, fastifyIntegrationPlugin } = require('openapi-ts-json-schema');

async function processSpec(filename) {
	return openapiToTsJsonSchema({
		openApiSchema: path.resolve(__dirname, filename),
		definitionPathsToGenerateFrom: ['paths', 'components.schemas'],
		refHandling: 'keep',
		outputPath: path.resolve(__dirname, `generated-${path.basename(filename, path.extname(filename))}`),
		plugins: [
			fastifyIntegrationPlugin({
				sharedSchemasFilter: ({ schemaId }) => schemaId.startsWith('/components/schemas'),
			}),
		],
	});
}

async function generate() {
	await processSpec('bearer-type-error.yaml');
}

generate();
