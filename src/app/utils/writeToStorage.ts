const writeToStorage = (config: ConfigProps) => {
  parent.postMessage(
    { pluginMessage: { type: "write-to-storaage", data: config } },
    "*"
  );
};

export default writeToStorage;
