// need to write after done creating all APIs
export const getBooks = {
    tags: ['Books'],
    description: "Returns all books from the system that the user has access to",
    operationId: 'getBooks',
    security: [
        {
            bearerAuth: []
        }
    ],
    responses: {
        "200" : {
            description: "A list of books",
            "content": {
                "application/json": {
                    schema: {
                        type: "array",
                        items: {

                        }
                    }
                }
            }
        }
    }
}
