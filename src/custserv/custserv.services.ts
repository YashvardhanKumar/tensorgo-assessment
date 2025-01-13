import { IntercomClient } from "intercom-client";

const client = new IntercomClient({
  token: process.env.INTERCOM_ACCESS_TOKEN as string,
});

export default class CustServService {
  static async createService(id: string, comments: string, category: string) {
    
    await client.conversations.create({
      from: {
        type: "user",
        id,
      },
      
      body: JSON.stringify({ comments, category }),
    });
  }

  static async getConversationByContactId(userId: string) {
    const data = await client.conversations.search({
      query: {
        field: "contact_ids",
        operator: "=",
        value: userId,
      },
    });
    return data;
  }
  static async getConversationById(conversation_id: string) {
    const data = await client.conversations.find({ conversation_id });
    return data;
  }
}
