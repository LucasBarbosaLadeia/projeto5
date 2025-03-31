module.exports = {
  preset: "ts-jest/presets/default", // Garantindo que ts-jest está sendo usado corretamente
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "ts-jest", // Usar ts-jest para arquivos TypeScript
  },
  moduleFileExtensions: ["ts", "js", "json", "node"],
  globals: {
    "ts-jest": {
      isolatedModules: true, // Melhora a velocidade, mas pode causar problemas com tipos mais avançados
    },
  },
};
