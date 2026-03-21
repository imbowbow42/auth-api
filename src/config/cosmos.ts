import { CosmosClient } from "@azure/cosmos";


//create client using endpoint + key from env
export const cosmosClient = new CosmosClient({
    endpoint: process.env.COSMOS_ENDPOINT!,
    key: process.env.COSMOS_KEY!
})

// get database and container reference
export const database = cosmosClient.database(process.env.COSMOS_DATABASE!)
export const container = database.container(process.env.COSMOS_CONTAINER!)
