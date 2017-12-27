// A simple data API that will be used to get the data for our
// components. On a real website, a more robust data fetching
// solution would be more appropriate.
// const Config = require("./config");
import Config from "./config";
import qs from "qs";
const PlayerAPI = {
    get: async ({path, body = {},options={}}) => {
        try {
            const encodedQuery = qs.stringify(body);
            let qsString = qs.stringify(body);
            let response = await fetch(`${Config.SERVER_URL}${path}?${qsString}`);
            let result = await response.json();
            return result;
        }
        catch (error) {
            // alert(error);
            throw error;
        }
    }
}

export default PlayerAPI
