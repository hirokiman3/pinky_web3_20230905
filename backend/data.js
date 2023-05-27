import bcrypt from "bcryptjs"

const data = {
  users: [
    {
      name: "Arsalan Ali",
      username: "aliarsalandev",
      email: "itsaliarsalan@gmail.com",
      password: bcrypt.hashSync("1234", 8),
      secret: "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",
      org_id: "org-rAHjkgyanTgKHlDkwoE7RgZm",
    },
  ],
}

export default data
