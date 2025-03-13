import { events } from "aws-amplify/api";
import type { Schema } from "../../data/resource";

export const handler: Schema["createProfile"]["functionHandler"] = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`); 

    const { name } = event.arguments
    return `Name: ${name}`
}