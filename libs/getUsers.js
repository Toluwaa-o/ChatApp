import prismaConnect from '@/Utils/prismaconnect'

const prisma = prismaConnect()

export default async function GetUsers(contains) {
    const users = await prisma.users.findFirst({
        where: {
            username: {
                contains
            }
        },
        select: {
            firstName: true,
            lastName: true,
            username: true
        }
    })

    return users
}