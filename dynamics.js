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

        Microsoft.CIFramework.addHandler("onclicktoact", handlerFunction);
    })
}).catch((err) => {
    console.log("Microsoft Dynamics Integration catch Failure",err);
    
})

handlerFunction = function(eventData) {
    console.log("Microsoft Dynamics Integration click to dial",eventData)
    return Promise.resolve();
}
    

 window.setClickToAct = () => {
    Microsoft.CIFramework.setClickToAct(value).then(
        (success) => {
            console.log("Microsoft Dynamics Integration Click to act success",success);
            
        }, 
        (err) => {
            console.log("Microsoft Dynamics Integration Click to act err",err);
        }
    );
}

function screenPop(){

}

window.searchAndDisplayContact = async (phoneNumber) => {
    try {
        console.log("Pho",phoneNumber);
        
        // Normalize the phone number by removing special characters
        const normalizedPhone = phoneNumber.replace(/\D/g, '');

        // Build the query to search by phone number
        const query = `?$select=fullname,telephone1,mobilephone&$filter=contains(telephone1,'${normalizedPhone}') or contains(mobilephone,'${normalizedPhone}')`;

        // Search for the contact using CIFramework
        const result = await window.Microsoft.CIFramework.searchAndOpenRecords("contact", query, false);
        const contacts = JSON.parse(result);
        console.log("integration dynamics",contacts);
        
        if (contacts && contacts.length > 0) {
            // If contacts found, open the first matching record
            await Microsoft.CIFramework.openForm({
                entityName: "contact",
                entityId: contacts[0].contactid
            });

            return {
                success: true,
                contacts: contacts.map(contact => ({
                    fullname: contact.fullname,
                    telephone1: contact.telephone1,
                    mobilephone: contact.mobilephone
                }))
            };
        } else {
            // No contacts found
            console.log(`No contacts found for phone number: ${phoneNumber}`);
            return {
                success: false,
                message: `No contacts found for phone number: ${phoneNumber}`
            };
        }
    } catch (error) {
        console.error('Error searching for contact:', error);
        return {
            success: false,
            message: error.message || 'Error searching for contact'
        };
    }
};

window.createContact = (data) => {
    console.log(data);
    
    Microsoft.CIFramework.createRecord("contact",data).then(
        function success (result) {
          res=JSON.parse(result);
              console.log("Microsoft Dynamics Integration Contact created with ID: " + res.id);
              //perform operations on record creation
          },
          function (error) {
              console.log("Microsoft Dynamics Integration create contact error",error);
              //handle error conditions
          }
      ); 
}
