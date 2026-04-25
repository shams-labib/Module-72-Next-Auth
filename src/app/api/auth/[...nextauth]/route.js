import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const userList = [
  { name: "hablu", password: "1234" },
  { name: "dablu", password: "5678" },
  { name: "bablu", password: "8901" },
];

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // Sign in with {name} button
      name: "Click to go",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        secretCode: {
          label: "Secret Code",
          type: "number",
          placeholder: "Enter code",
        },
      },
      async authorize(credentials, req) {
        const { username, password, secretCode } = credentials;

        const user = userList.find((u) => u.name == username);
        if (!user) {
          return null;
        }

        const isPasswordOk = user.password == password;
        if (isPasswordOk) {
          return user;
        }

        // My own logic is loading

        return null;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
