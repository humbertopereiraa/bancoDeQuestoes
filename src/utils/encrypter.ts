import bcrypt from "bcrypt"

const saltRounds = 10

export class Encrypter {
  encryptPassword(password: string): string {
    return bcrypt.hashSync(password, saltRounds)
  }

  async comparePassword(password: string, encryptedPassword: string): Promise<boolean> {
    const match = await bcrypt.compare(password, encryptedPassword)
    return match
  }
}
