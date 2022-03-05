if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js").then(regist => {
    console.log("Service Worker Registered");

    regist.addEventListener("updatefound", () => {
      const newWorker = regist.installing;
      console.log("Service Worker update found!");

      newWorker.addEventListener("statechange", () => {
        console.log("Service Worker state changed:", newWorker.state);
      });
    });
  });

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    console.log("Controller changed");
  });
}

$(function () {
  let deferredPrompt;
  const addBtn = $("#myButton");
  addBtn.css("hidden", "true");

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    addBtn.css("hidden", "false");

    addBtn.click(function () {
      addBtn.css("hidden", "true");
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
        } else {
          console.log("User dismissed the A2HS prompt");
        }
        deferredPrompt = null;
      });
    });
  });
});