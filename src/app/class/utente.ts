export class utente {
  id?: number;
  firstName!: string;
  lastName!: string;
  birthDate!: string;
  email!: string;
  password!: string;

  constructor(
    name: string,
    last_name: string,
    date: string,
    email: string,
    password: string
  ) {
    this.firstName = name;

    this.lastName = last_name;

    this.email = email;
    this.birthDate = date;
    this.password = password;
    // this.dipendente = dipendente
  }

  getId() {}
  static factory() {
    let u = new utente('name', 'last_name', 'email', 'date', 'password');
    return u;
  }
  controlloDipendente(): boolean {
    return false;
  }
}
