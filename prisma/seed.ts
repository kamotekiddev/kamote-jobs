import { PrismaClient } from '@prisma/client';
import workplaceTypes from '../seed/workplace-type';
import employmentTypes from '../seed/employment-type';

const prisma = new PrismaClient();

async function main() {
    await prisma.workplaceType.createMany({
        data: workplaceTypes,
    });
    await prisma.employmentType.createMany({
        data: employmentTypes,
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
