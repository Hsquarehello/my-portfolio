import mongoose from 'mongoose';

// Environment variable ရှိမရှိ စစ်ဆေးခြင်း
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

/**
 * Serverless Environment တွင် Database Connection ကို Cache လုပ်ရန်
 * Global variable ထဲတွင် Mongoose connection ကို ခေတ္တသိမ်းဆည်းထားပါမည်။
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // Global scope ထဲတွင် mongoose object ရှိမရှိ TypeScript အတွက် ကြေညာပေးခြင်း
  var mongoose: MongooseCache | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // Connection ရှိပြီးသားဆိုလျှင် ထို Connection ကို ပြန်သုံးမည်
  if (cached?.conn) {
    return cached.conn;
  }

  // Connection မရှိသေးပါက Connection အသစ်ဖွင့်ရန် Promise တည်ဆောက်မည်
  if (!cached?.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached!.promise = mongoose.connect(MONGODB_URI!, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    // Promise ပြီးဆုံးသည်အထိ စောင့်ဆိုင်းပြီး Connection ကို သိမ်းဆည်းမည်
    cached!.conn = await cached!.promise;
  } catch (e) {
    cached!.promise = null;
    throw e;
  }

  return cached!.conn;
}

export default dbConnect;