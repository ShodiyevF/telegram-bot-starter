import { migrate} from 'drizzle-orm/node-postgres/migrator'
import { db } from './pg';

async function migrator() {
    console.log('migration started...');
    await migrate(db, { migrationsFolder: 'drizzle'})
    console.log('migration ended...');
    process.exit(0);
}

migrator().catch(err => {
    console.log(err);
})