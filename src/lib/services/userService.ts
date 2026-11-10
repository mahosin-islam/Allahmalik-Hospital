import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function hasAnyUsers(): Promise<boolean> {
  await dbConnect();
  const count = await User.countDocuments();
  return count > 0;
}
