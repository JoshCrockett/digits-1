import { PrismaClient, Role, Condition } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');
  const password = await hash('changeme', 10);
  config.defaultAccounts.forEach(async (account) => {
    const role = account.role as Role || Role.USER;
    console.log(`  Creating user: ${account.email} with role: ${role}`);
    await prisma.user.upsert({
      where: { email: account.email },
      update: {},
      create: {
        email: account.email,
        password,
        role,
      },
    });
    // console.log(`  Created user: ${user.email} with role: ${user.role}`);
  });

  const stuffPromises = config.defaultData.map((data) => {
    const condition = (data.condition as Condition) || Condition.good; // Ensure the condition is valid enum
    return prisma.stuff.upsert({
      where: { id: config.defaultData.indexOf(data) + 1 },
      update: {},
      create: {
        name: data.name,
       quantity: data.quantity,
        owner: data.owner,
        condition,
      },
    });
  });
});
await Promise.all(stuffPromises);

for (let index = 0; index < config.defaultContacts.length; index++) {
  const contact = config.defaultContacts[index];
  await prisma.contacts.upsert({
    where: { id: index + 1 },
    update: {},
    create: {
      firstName: contact.firstName,
      lastName: contact.lastName,
      address: contact.address,
      image: contact.image,
      description: contact.description,
      owner: contact.owner,
    },
  });
}


main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
  }
