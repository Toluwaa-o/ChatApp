import { PrismaClient } from "@prisma/client";

const prismaConnect = () => {
    const prisma = new PrismaClient()
    
    return prisma
};

export default prismaConnect;
