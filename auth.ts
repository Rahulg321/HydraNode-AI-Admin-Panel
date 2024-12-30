import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const allowedEmails = ["rg5353070@gmail.com", "jit2600@gmail.com","anujmodi1@gmail.com"]; // Replace with your allowed email addresses

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    signIn({ user }) {
      console.log("user", user);
      if (allowedEmails.includes(user.email!)) {
          console.log("email does include")
        return true; // Allow sign in
      } else {
        console.log("does not includes")
        return false; // Deny sign in
      }
    },
  },
});
