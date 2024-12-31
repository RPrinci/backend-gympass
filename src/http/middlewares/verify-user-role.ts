import { FastifyReply, FastifyRequest } from "fastify";

export function verifyUserRole(roleToVeriry: 'ADMIN' | 'MEMBER') {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user
  
    if (role !== roleToVeriry) {
      return reply.status(401).send({ message: 'Unauthorized.' })
    }
  }
}