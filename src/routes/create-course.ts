import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from '../database/client.ts'
import { courses } from '../database/schema.ts'
import { z } from 'zod'

export const createCoursesRoute: FastifyPluginAsyncZod = async (server) => {
    server.post("/courses", {
        schema: {
            tags: ['courses'],
            summary: 'Create a course',
            description: 'Essa rota recebe um título e cria um curso no banco de dados.',
            body: z.object({
                title: z.string().min(5, 'Título precisa ter no mínimo 5 caracteres'),
            }),
            response: {
                201: z.object({ course_id: z.uuid() }).describe('Curso criado com sucesso!')
            }
        },
    }, async (request, reply) => {

        const course_title = request.body.title

    const result = await db
        .insert(courses)
        .values({ title: course_title })
        .returning()

        return reply.status(201).send({ course_id: result[0].id })
    })

}