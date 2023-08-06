const fs = require('fs');
const path = require('path');
const axios = require('axios');
const json2ts = require('json2ts');

async function fetchData(url, method, data = null) {
    try {
        const response = await axios({ method, url, data });
        return response.data;
    } catch (error) {
        console.error(`Error fetching data from ${url}: ${error.message}`);
        return null;
    }
}

async function fetchAllData(requests) {
    const promises = requests.map(({ url, method, data }) =>
        fetchData(url, method, data)
    );
    try {
        const allData = await Promise.all(promises);
        return allData;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return [];
    }
}

function convertToPascalCase(inputString) {
    return inputString.replace(/(^|-)([a-z])/g, (_, __, letter) => letter.toUpperCase());
}

async function generateAndSaveTypes(data, typeName, filePath) {
    const RootObjectName = `I${convertToPascalCase(typeName)}`;
    const types = json2ts.convert(data, typeName).replace("RootObject", RootObjectName);
    saveTypesToFile(types, filePath);
}

function saveTypesToFile(types, filePath) {
    const normalizedPath = path.normalize(filePath);
    const directoryPath = path.dirname(normalizedPath);

    // Create directories recursively if they don't exist
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }

    // Create a .ts file for types
    fs.writeFileSync(normalizedPath, types, 'utf8');
    console.log(`Generated types saved to ${normalizedPath}`);
}

fs.readFile('data.json', 'utf8', async (error, postman) => {
    if (error) {
        console.error(`Error reading JSON file: ${error}`);
        return;
    }

    try {
        const requests = JSON.parse(postman).item.flatMap((pm) => {
            if (pm.request.url.raw) {
                return {
                    name: pm.name,
                    url: pm.request.url.raw,
                    method: pm.request.method,
                    data: pm?.request?.body?.raw ? JSON.parse(pm.request.body.raw) : undefined
                };
            }
            return [];
        });

        const responseData = await fetchAllData(requests);

        responseData.forEach(async (result, index) => {
            const fileName = (requests[index].name).replace(/\s+/g, '-');
            const requestTypeName = `${fileName}Request`;
            const responseTypeName = `${fileName}Response`;
            const requestFilePath = `types/request/${fileName}.ts`;
            const responseFilePath = `types/response/${fileName}.ts`;

            await generateAndSaveTypes(JSON.stringify(requests[index]), requestTypeName, requestFilePath);
            await generateAndSaveTypes(JSON.stringify(result), responseTypeName, responseFilePath);
        });
    } catch (parseError) {
        console.error(`Error parsing JSON data: ${parseError}`);
    }
});
