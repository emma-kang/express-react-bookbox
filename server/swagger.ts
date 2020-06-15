import { getBooks } from "./openAPI/books.swagger";

export const swaggerDocument = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'APIs Document',
        description: 'BookBox API Document',
        termsOfService: '',
        contact: {
            name: 'Emma Kang',
            email: 'emma140626@gmail.com'
        },
        license: {
            name: 'MIT',
            url: 'https://opensource.org/licenses/MIT'
        }
    },
    servers: [
        {
            url: 'http://localhost:8080',
            description: 'Local server'
        },
        {
            url: 'https://express-react-bookbox.herokuapp.com/{basePath}',
            description: 'The production API server',
            basePath: {
                default: '/'
            }
        }
    ],
    components: {
        schemas: {},
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    },
    tags: [
        {
            name: 'Books'
        }
    ],
    paths: {
        "/books": {
            "get": getBooks
        }
    }
}