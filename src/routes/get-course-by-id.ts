import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '../database/client.ts'
import { courses } from '../database/schema.ts'
import { eq } from 'drizzle-orm'

export const getCoursesByIdRoute: FastifyPluginAsyncZod = async (server) => {
    server.get("/courses/:id", {
        schema: {
            params: z.object({
                id: z.uuid(),
            }),
            tags: ['courses'],
            summary: 'Get courses by ID',
            response: {
                200: z.object({
                    course: z.object({
                        id: z.uuid(),
                        title: z.string(),
                        description: z.string().nullable()
                    })
                }),
                404: z.null().describe('Course not found'),
            }
        },
    }, async (request, reply) => {

        const course_id = request.params.id

        const result = await db
            .select()
            .from(courses)
            .where(eq(courses.id, course_id))

        if (result.length > 0) {
            return { course: result[0] }
        }

        return reply.status(404).send()
    })
}