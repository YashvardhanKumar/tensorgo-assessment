import { IntercomClient } from "intercom-client";

const client = new IntercomClient({
    token: process.env.INTERCOM_ACCESS_TOKEN as string,
});

export default class AuthService {
    static async createUser(d: any) {
        const user = await client.contacts.create({
            custom_attributes: { photo: d.photos[0].value },
            email: d._json.email,
            name: d.displayName,
        });
        return user;
    }
    static async searchByEmail(email: string) {
        const user = await client.contacts.search({
            query: {
                field: "email",
                operator: "=",
                value: email,
            },
        });
        return user;
    }
    static async searchById(contact_id: string) {
        const user = await client.contacts.find({contact_id});
        return user;
    }
}