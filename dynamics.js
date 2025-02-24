function loadScript(url) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = url;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
}

loadScript("https://org43d0ff9b.crm8.dynamics.com/webresources/Widget/msdyn_ciLibrary.js").then((data) => {
    window.addEventListener("CIFInitDone", function () {
        Microsoft.CIFramework.setMode(1).then(
            (success) => {
                console.log("Microsoft Dynamics Integration success",success);
                
            },
            (error) => {
                console.log("Microsoft Dynamics Integration Failure",error);
                
            }
        );
    })
}).catch((err) => {
    console.log("Microsoft Dynamics Integration catch Failure",err);
    
})