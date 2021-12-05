const downloadJSON = (content, fileName) => {
  var a = document.createElement("a");
  var file = new Blob([JSON.stringify(content, null, 2)], {
    type: "application/json"
  });
  a.href = URL.createObjectURL(file);
  a.download = `${fileName}.json`;
  a.click();
  console.log("Downloaded JSON: ", content);
};

export default downloadJSON;
