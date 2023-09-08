async function route(fastify, options) {
    fastify.get("/", async (request, reply) => {
        return { hello: "world" };
    });

    fastify.get("/animals", async (request, reply) => {
        const result = await collection.find().toArray();
        if (result.length === 0) {
            throw new Error("No documents found");
        }
        return result;
    });

    fastify.get("/animals/:animal", async (request, reply) => {
        const result = await collection.findOne({ animal: request.params.animal });
        if (!result) {
            throw new Error("Invalid value");
        }
        return result;
    });

    const animalBodyJsonSchema = {
        type: "object",
        required: ["animal"],
        properties: {
            animal: { type: "string" },
        },
    };

    const schema = {
        body: animalBodyJsonSchema,
    };

    fastify.post("/animals", { schema }, async (request, reply) => {
        // we can use the `request.body` object to get the data sent by the client
        const result = await collection.insertOne({ animal: request.body.animal });
        return result;
    });
}

export default route;