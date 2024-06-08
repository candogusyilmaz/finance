module.exports = {
  api: {
    output: {
      mode: 'tags',
      biome: true,
      target: 'src/api',
      baseUrl: 'http://localhost:8080/',
      schemas: 'src/api/model',
      client: 'react-query'
    },
    input: {
      target: 'http://localhost:8080/v3/api-docs'
    }
  }
};
