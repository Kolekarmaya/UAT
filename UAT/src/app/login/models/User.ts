export class User {
  id: string;
  username: string;
  password: string;
  user_flag:any;

  static fromJson(data: Map<string, any>): User {
    const u: User = new User();
    u.id = data['id'];
    u.username = data['username'];
    u.password = data['password'];
    return u;
  }

  toJSON(): Map<string, any> {
    const data: Map<string, any> = new Map<string, any>();
    data['id'] = this.id;
    data['username'] = this.username;
    data['password'] = this.password;
    return data;
  }
}
