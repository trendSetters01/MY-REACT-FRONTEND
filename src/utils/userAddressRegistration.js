import { setUserAddress } from "../state/index.js";

import fs from "fs/promises";
import path from "path";

export async function userAddressRegistration(userId, address) {
    setUserAddress(userId, address);
  
    // // Specify the directory and file paths
    const dirPath = path.resolve("algorand", "phantomAssets", "addresses");
    const filePath = path.join(dirPath, "phantomRegisteredUserAddresses.txt");
  
    try {
      // Check if the directory exists; if not, it will throw an error
      await fs.access(dirPath);
  
      // Read the current contents of the file
      const data = await fs.readFile(filePath, "utf8");
  
      // Split the contents by new line and remove any carriage return characters
      const addresses = 
      data
        .split("\n")
        .map((address) => address.trim().replace("\r", ""));
  
      // Check if the address already exists in the array
      if (!addresses.includes(address.trim())) {
        // Address doesn't exist, so append it to the file
        await fs.appendFile(filePath, `\n${address}`);
        console.log("The address was appended to the file!");
      } else {
        console.log("setaddress: The address already exists in the file. No action taken.");
      }
    } catch (error) {
      console.error("Error handling the address registration:", error);
    }
  }