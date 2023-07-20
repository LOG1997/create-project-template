// prisma/seed.ts

import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient();
async function main() {
    const post1 = await prisma.user.upsert({
        where: {
            id: 1
        },
        update: {},
        create: {
            id: 1,
            email: 'admin@localhost',
            username: 'admin',
            password: '$2b$1',
            nickname: 'admin',
            role: 'ADMIN',
            avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
            createdAt: new Date(),
            updatedAt: new Date(),

        }
    })
    const post2 = await prisma.user.upsert({
        where: {
            id: 2
        },
        update: {},
        create: {
            id: 2,
            email: 'root@localhost',
            username: 'root',
            password: '$2b$1',
            nickname: 'root',
            role: 'ADMIN',
            avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e',
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    })

    const art1 = await prisma.artical.upsert({
        where: {
            id: 1
        },
        update: {},
        create: {
            id: 1,
            title: '文章1',
            content: '文章1内容',
            authorId: 1,
            published: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

    })

    const art2 = await prisma.artical.upsert({
        where: {
            id: 3
        },
        update: {},
        create: {
            id: 2,
            title: '文章2',
            content: '文章2内容',
            authorId: 1,
            published: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

    })

    const art3 = await prisma.artical.upsert({
        where: {
            id: 3
        },
        update: {},
        create: {
            id: 3,
            title: '文章3',
            content: '文章3内容',
            authorId: 2,
            published: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

    })
}
// excute
main()
    .catch(e => {
        process.exit(1)
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })