async function route(fastify, options) {
    fastify.get("/", async (request, reply) => {
        return { hello: "world" };
    });
}

export default route;