const AnonymousAuth = require("./src/anonymous.auth");

(async () => {

    const identity = await AnonymousAuth.getAnonymousIdentity();
    console.log(identity);

})();
