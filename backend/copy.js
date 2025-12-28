import { MongoClient } from "mongodb";

// SOURCE (old DB)
const SOURCE_URI =
  "mongodb+srv://VSMBeFrank:VSMBeFrank@vsmbefrank.bkmxrss.mongodb.net/befrank?retryWrites=true&w=majority&appName=VSMBeFrank";

// DESTINATION (new DB)
const DEST_URI =
  "mongodb+srv://teambefrank:5WBpLViLXCHKbvMa@cluster0.cybajv6.mongodb.net/befrank?appName=Cluster0";

async function migrate() {
  const sourceClient = new MongoClient(SOURCE_URI);
  const destClient = new MongoClient(DEST_URI);

  try {
    console.log("🔌 Connecting to source DB...");
    await sourceClient.connect();

    console.log("🔌 Connecting to destination DB...");
    await destClient.connect();

    const sourceDb = sourceClient.db();
    const destDb = destClient.db();

    const collections = await sourceDb.listCollections().toArray();

    console.log(`📦 Found ${collections.length} collections`);

    for (const col of collections) {
      const collectionName = col.name;

      console.log(`➡️ Copying collection: ${collectionName}`);

      const sourceCollection = sourceDb.collection(collectionName);
      const destCollection = destDb.collection(collectionName);

      const documents = await sourceCollection.find({}).toArray();

      if (documents.length === 0) {
        console.log(`⚠️ Skipped empty collection: ${collectionName}`);
        continue;
      }

      await destCollection.insertMany(documents);

      console.log(
        `✅ Copied ${documents.length} documents to ${collectionName}`
      );
    }

    console.log("🎉 Migration completed successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
  } finally {
    await sourceClient.close();
    await destClient.close();
  }
}

migrate();
