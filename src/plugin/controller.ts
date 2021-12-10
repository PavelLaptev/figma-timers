////////////////////////////////////////////////////////////////
///////////////////////// UI CONFIG ////////////////////////////
////////////////////////////////////////////////////////////////

// Show UI
let UISize = {
  width: 320,
  height: 700
};
figma.showUI(__html__, UISize);

// Clear the storage
// figma.clientStorage.setAsync("timer-config", void 0);

figma.clientStorage.getAsync("timer-config").then(data => {
  // console.log("from storage:", data);
  figma.ui.postMessage({
    type: "read-from-storage",
    data: data ? JSON.parse(data) : null
  });
});

// On message
figma.ui.onmessage = async msg => {
  // UPDATE ON BY ONE
  if (msg.type === "write-to-storaage") {
    // console.log("to storage:", msg.data);
    figma.clientStorage.setAsync("timer-config", JSON.stringify(msg.data));
  }

  if (msg.type === "resize") figma.ui.resize(UISize.width, msg.size);
};
